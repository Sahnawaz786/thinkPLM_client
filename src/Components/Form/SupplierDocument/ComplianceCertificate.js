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

const ComplianceCertificate = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState('');

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
  }, [selected]);

  
  const [userData, setUserData] = useState({
    part_number: '',
    part_name: '',
    description: '',
    createdDate: currentDate,
    modifiedDate: currentDate,
    parts: [
      {
        supplier_category: '',
        supplier_name: '',
        material: '',
        mpn_number: '',
        weight: '',
        dimension: '',
        cost: '',
        lead_date: '',
        quality_matrices: '',
        compliance_information: '',
        createdDate: currentDate,
        modifiedDate: currentDate,
        iteration_info: 1,
        islatest_Iteration: 1,
      },
    ],
  });

  let name, value;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // After the file is loaded, store the result (Base64 string) in the state
      setUserData({ ...userData, document: reader.result });
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
  };

  const postUserData = (event, index) => {
    const { name, value } = event.target;
    setUserData((prevData) => {
      const updatedParts = [...prevData.parts];
      updatedParts[index] = { ...updatedParts[index], [name]: value };
      return { ...prevData, parts: updatedParts };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const {
      part_number,
      part_name,
      description,
      createdDate,
      modifiedDate,
      parts: [
        {
          supplier_category,
          supplier_name,
          material,
          mpn_number,
          weight,
          dimension,
          cost,
          lead_date,
          quality_matrices,
          compliance_information,
          iteration_info,
          islatest_Iteration,
        },
      ],
    } = userData;
    try {
      // `http://localhost:8181/SupplierMasterObject`

      const res = await fetch(`http://localhost:8181/SupplierMasterObject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          part_number,
          part_name,
          description,
          createdDate,
          modifiedDate,
          parts: [
            {
              supplier_category,
              supplier_name,
              material,
              mpn_number,
              weight,
              dimension,
              cost,
              lead_date,
              quality_matrices,
              compliance_information,
              createdDate,
              modifiedDate,
              iteration_info,
              islatest_Iteration,
            },
          ],
        }),
      });
      if (res.ok) {
        setUserData({
          part_number: '',
          part_name: '',
          description: '',
          createdDate: '',
          modifiedDate: '',
          parts: [
            {
              supplier_category: '',
              supplier_name: '',
              material: '',
              mpn_number: '',
              weight: '',
              dimension: '',
              cost: '',
              lead_date: '',
              quality_matrices: '',
              compliance_information: '',
            },
          ],
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

  return (
    timer ?  <div className={spinnerStyle.spinnerContainer}>
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
                      name='part_name'
                      value={userData.part_name}
                      onChange={(e) => postUser(e)}
                      className={styles.partName}
                    />
                  </div>

                  <div className={styles.formInput}>
                    <strong>Document Number:</strong>
                    <input
                      type='text'
                      name='part_name'
                      value={userData.part_name}
                      onChange={(e) => postUser(e)}
                      className={styles.partNumber}
                    />
                  </div>

                  <div
                    className={styles.formInput}
                  >
                    <strong>Description:</strong>
                    <textarea
                      className={styles.partName}
                      name='part_number'
                      onChange={(e) => postUser(e)}
                      value={userData.part_number}
                      type='text'
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
                  {userData.parts.map((part, index) => (
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
                          value={part.supplier_name}
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
                        <strong>Certification Date:</strong>
                        <input
                          type='date'
                          name='lead_date'
                          value={part.lead_date}
                          className={styles.partName}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>


                      <div className={styles.formInput}>
                        <strong>Expiration Date:</strong>
                        <input
                          type='date'
                          name='lead_date'
                          value={part.lead_date}
                          className={styles.partName}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>
                  


                      <div className={styles.formInput}>
              <strong htmlFor='document'>Compliance Standard:</strong>
              <input type='file' className={styles.partName}  id='document' name="document" onChange={handleFileUpload} />
            </div>


            <div className={styles.formInput}>
              <strong htmlFor='document'>Certifying Authority:</strong>
              <input type='file' className={styles.partName}  id='document' name="document" onChange={handleFileUpload} />
            </div>

            <div className={styles.formInput}>
              <strong htmlFor='document'>Compliance Statement:</strong>
              <input type='file' className={styles.partName}  id='document' name="document" onChange={handleFileUpload} />
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

export default ComplianceCertificate;
