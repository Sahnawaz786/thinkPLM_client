import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { categoryContext } from '../../../store/CategoryProvider';
import spinnerStyle from '../../../style.module.css';
import classes from '../../AllContainer/PartsAction/PartDetails.module.css';
import styles from '../Parts/PartAttribut.module.css';
import message from '../../../utils/message';

const SupplierContract = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

  const [timer, setTimer] = useState(false);
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
    description: '',
    createdDate: currentDate,
    modifiedDate: currentDate,
    supplier_contract: [
      {

        supplier_name: '',
        effective_date: '',
        expiration_date: '',
        work_scope: '',
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
        supplier_contract: prevState.supplier_contract.map(contract => ({
          ...contract,
          // [title]: reader.result
        }))
      }));
      setAttachments([...attachments,{fileName:file.name,fileType:file.type,content:reader.result,attachmentType:title}]);
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
      const updatedSupplierContract = [...prevData.supplier_contract];
      console.log('Updated:', updatedSupplierContract)
      updatedSupplierContract[index] = { ...updatedSupplierContract[index], [name]: value };
      console.log('SecondUpdated:', { ...prevData, supplier_contract: updatedSupplierContract });
      return { ...prevData, supplier_contract: updatedSupplierContract };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true)
    let {
      document_number,
      document_name,
      description,
      createdDate,
      modifiedDate,
      supplier_contract: [
        {

          supplier_name,
          effective_date,
          expiration_date,
          work_scope,
          iteration_info,
          islatest_Iteration,
          attachment
        }
      ]
    } = userData;

    attachment = attachments;


    try {

      const res = await fetch(`http://localhost:8181/SupplierMasterContractObject `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document_number,
          document_name,
          description,
          createdDate,
          modifiedDate,
          supplier_contract: [
            {

              supplier_name,
              effective_date,
              expiration_date,
              work_scope,
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
          description: '',
          createdDate: '',
          modifiedDate: '',
          supplier_contract: [
            {

              supplier_name: '',
              effective_date: '',
              expiration_date: '',
              work_scope: '',
              iteration_info: 1,
              islatest_Iteration: 1,
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
      else{
        const data=await res.json();
        console.log("...........",data.message)
        message('error',data.message)
       }
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsButtonDisabled(false)
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
                        name='description'
                        value={userData.description}
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
                    {userData.supplier_contract.map((contract, index) => (
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

                        <div
                          className={styles.formInput}
                        >
                          <strong>Scope of Work:</strong>
                          <input
                            className={styles.partName}
                            name='work_scope'
                            onChange={(e) => postUserData(e, index)}
                            value={contract.work_scope}
                            type='text'
                          />
                        </div>

                        <div className={styles.formInput}>
                          <strong htmlFor='document'>Upload Contract Document:</strong>
                          <input type='file' className={styles.partName} id='document' name="contractDocument" onChange={handleFileUpload} />
                        </div>

                        <div className={styles.formInput}>
                          <strong htmlFor='document'>Terms and Terminations:</strong>
                          <input type='file' className={styles.partName} id='document' name="termandTermination" onChange={handleFileUpload} />
                        </div>

                        <div className={styles.formInput}>
                          <strong>Effective Date:</strong>
                          <input
                            type='date'
                            name='effective_date'
                            value={contract.effective_date}
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
                          <strong htmlFor='document'>Governing Law and Jurisdiction:</strong>
                          <input type='file' className={styles.partName} id='document' name="goveringLawandJurisdication" onChange={handleFileUpload} />
                        </div>



                        <div className={styles.formInput}>
                          <strong htmlFor='document'>Signature:</strong>
                          <input type='file' className={styles.partName} id='document' name="signatures" onChange={handleFileUpload} />
                        </div>

                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button variant='primary' onClick={(e) => submitHandler(e)} disabled={isButtonDisabled}>
                  Submit
                </Button>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SupplierContract;
