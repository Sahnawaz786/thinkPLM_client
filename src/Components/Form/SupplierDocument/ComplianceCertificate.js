import React from 'react';
import styles from '../Parts/PartAttribut.module.css';
import classes from '../../AllContainer/PartsAction/PartDetails.module.css';
import { Button } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { categoryContext } from '../../../store/CategoryProvider';
import { useNavigate } from 'react-router-dom';
import spinnerStyle from '../../../style.module.css'
import HashLoader from 'react-spinners/HashLoader';
import SupplierDocumentPage from '../../Pages/SupplierDocumentPage';

const ComplianceCertifcate = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState('');
  const [attachments, setAttachments] = useState([]);


  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

  const [timer, setTimer] = useState(true);
  const [currentDate, setCurrentDate] = useState(
    new Date().toJSON().slice(0, 10)
  );
  const categoryItemsCtx = useContext(categoryContext);

  useEffect(() => {
    setTimer(true);
    const timeout = setTimeout(() => {
      setTimer(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);


  const [userData, setUserData] = useState({
    document_number: '',
    document_name: '',
    document_description: '',
    createdDate: currentDate,
    modifiedDate: currentDate,
    docs: [
      {
        supplier_name: 'test',
        attachmentId: 153,
        supplier_category: 'vendor',
        certification_number: '',
        certification_date: '',
        expiration_date: '',
        iteration_info: 1,
        islatest_Iteration: 1,
        attachment: [
          {
            fileName: '',
            fileType: '',
            content: '',
            attachment_type: ''
          }
        ]
      }
    ]
  });

  let name, value;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('FILE', file);
    const reader = new FileReader();
    const title = event.target.name;

    //

    reader.onloadend = () => {
      // After the file is loaded, store the result (Base64 string) in the state
      setUserData(prevState => ({
        ...prevState,
        docs: prevState.docs.map(contract => ({
          ...contract,
          // [title]: reader.result
        }))
      }));
      setAttachments([...attachments, { fileName: file.name, fileType: file.type, content: reader.result, attachmentType: title }]);
    };

    // Read the file as a Data URL (Base64)
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const postUser = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUserData({ ...userData, [name]: value });
    console.log(userData);
  };

  const postUserData = (event, index) => {
    const { name, value } = event.target;
    setUserData((prevData) => {
      const updatedSupplierContract = [...prevData.docs];
      console.log('Updated:', updatedSupplierContract)
      updatedSupplierContract[index] = { ...updatedSupplierContract[index], [name]: value };
      console.log('SecondUpdated:', { ...prevData, docs: updatedSupplierContract });
      return { ...prevData, docs: updatedSupplierContract };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let {
      document_number,
      document_name,
      document_description,
      createdDate,
      modifiedDate,
      docs: [
        {
          supplier_name,
          attachmentId,
          supplier_category,
          certification_number,
          certification_date,
          expiration_date,
          iteration_info,
          islatest_Iteration,
          attachment
        }
      ]
    } = userData;

    attachment = attachments;


    try {

      const res = await fetch(`http://localhost:8181/ComplainceCertificateMasterObject `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document_number,
          document_name,
          document_description,
          createdDate,
          modifiedDate,
          docs: [
            {
              supplier_name,
              attachmentId,
              supplier_category,
              certification_number,
              certification_date,
              expiration_date,
              iteration_info,
              islatest_Iteration,
              attachment
            }
          ]
        }),
      });
      if (res.ok) {
        setUserData({
          document_number: '',
          document_name: '',
          document_description: '',
          createdDate: '',
          modifiedDate: '',
          docs: [
            {
              supplier_name: '',
              attachmentId: '',
              supplier_category: '',
              certification_number: '',
              certification_date: '',
              expiration_date: '',
              iteration_info: '',
              islatest_Iteration: '',
              attachment: []
            }
          ]
        });

        setTimer(true);
        setTimeout(() => {
          setTimer(false);
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const testing = (e) => {
    e.preventDefault();
    console.log(userData);
  }

  return (
    timer ? <div className={spinnerStyle.spinnerContainer}>
      {' '}
      <HashLoader color='#0E6EFD' />{' '}
    </div>
      :
      <div>
        <div className={styles.parentContainer}>
          <div className={styles.childContainer}>
            <div className={styles.systemAttribute}>
              <div className={classes.part_container}>
                <div className={styles.master_part}>
                  <div className={styles.masterpart_header}>
                    <p>System Attribute:-</p>
                  </div>
                  <div className={styles.formContainer}>
                    <div className={styles.formInput}>
                      <strong>Document Name:</strong>
                      <input
                        type='text'
                        name='document_name'
                        value={userData.document_name}
                        onChange={(e) => postUser(e)}
                        className={styles.partName}
                      />
                    </div>

                    <div
                      className={styles.formInput}
                      style={{ marginTop: '10px' }}
                    >
                      <strong>Document Number:</strong>
                      <input
                        className={styles.partNumber}
                        name='document_number'
                        onChange={(e) => postUser(e)}
                        value={userData.document_number}
                        type='number'
                      />
                    </div>

                    <div className={styles.formInput}>
                      <strong>Description:</strong>
                      <textarea
                        type='text'
                        name='document_description'
                        value={userData.document_description}
                        onChange={(e) => postUser(e)}
                        className={styles.partName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bussinessAttribute}>
              <div className={classes.part_container}>
                <div className={styles.master_part}>
                  <div className={styles.masterpart_header}>
                    <p>Bussiness Attribute:-</p>
                  </div>

                  <div className={styles.formContainer}>
                    {userData?.docs?.map((contract, index) => (
                      <>
                        <div className={styles.formInput}>
                          <strong>Supplier Category :</strong>
                          <select
                            className={styles.selectFormInput}
                            name='supplier_category'
                            value={selected}
                            onChange={(e) => handleChange(e)}
                          >
                            <option className={styles.partName}>
                              {' '}
                              Select Supplier Category{' '}
                            </option>
                            {categoryItemsCtx.category.map((item, ind) => {
                              return (
                                <option className={styles.partName} key={ind}>
                                  {item.value}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className={styles.formInput}>
                          <strong>Supplier Name :</strong>
                          <select
                            className={styles.selectFormInput}
                            name='supplier_name'
                            value={contract.supplier_name}
                            onChange={(event) => postUserData(event, index)}
                          >
                            <option>Select Supplier Name</option>

                            {selected === 'manufacturer'
                              ? categoryItemsCtx.manufactureData.map(
                                (item, ind) => {
                                  return <option key={ind}>{item.name}</option>;
                                }
                              )
                              : ''}

                            {selected === 'vendor'
                              ? categoryItemsCtx.vendorData.map((item, ind) => {
                                return <option key={ind}>{item.name}</option>;
                              })
                              : ''}
                            {selected === 'tier1'
                              ? categoryItemsCtx.tier1Data.map((item, ind) => {
                                return <option key={ind}>{item.name}</option>;
                              })
                              : ''}
                            {selected === 'tier2'
                              ? categoryItemsCtx.tier2Data.map((item, ind) => {
                                return <option key={ind}>{item.name}</option>;
                              })
                              : ''}
                          </select>
                        </div>

                    <div className={styles.formInput}>
                      <strong>Certification Number:</strong>
                      <input
                        type='text'
                        name='certification_number'
                        value={contract?.certification_number}
                        onChange={(e) => postUserData(e,index)}
                        className={styles.partName}
                      />
                    </div>



                        <div className={styles.formInput}>
                          <strong htmlFor='document'>Compliance Standard:</strong>
                          <input type='file' className={styles.partName} id='document' name="complianceStandard" onChange={handleFileUpload} />
                        </div>

                        <div className={styles.formInput}>
                          <strong htmlFor='document'>Certifying Authority:</strong>
                          <input type='file' className={styles.partName} id='document' name="certifyingAuthority" onChange={handleFileUpload} />
                        </div>

                        <div className={styles.formInput}>
                          <strong>Certification Date:</strong>
                          <input
                            type='date'
                            name='certification_date'
                            value={contract.certification_date}
                            className={styles.partName}
                            onChange={(event) => postUserData(event, index)}
                          />
                        </div>

                        <div className={styles.formInput}>
                          <strong>Expiration Date:</strong>
                          <input
                            type='date'
                            name='expiration_date'
                            value={contract.expiration_date}
                            className={styles.partName}
                            onChange={(event) => postUserData(event, index)}
                          />
                        </div>

                        <div className={styles.formInput}>
                          <strong htmlFor='document'>Compliance Statement:</strong>
                          <input type='file' className={styles.partName} id='document' name="complianceStatement" onChange={handleFileUpload} />
                        </div>


                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button variant='primary' onClick={(e) => submitHandler(e)}>
                  Submit
                </Button>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ComplianceCertifcate;
