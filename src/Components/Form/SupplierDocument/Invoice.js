import React from 'react';
import styles from '../Parts/PartAttribut.module.css';
import classes from '../../AllContainer/PartsAction/PartDetails.module.css';
import { Button } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { categoryContext } from '../../../store/CategoryProvider';
import { useNavigate } from 'react-router-dom';
import spinnerStyle from '../../../style.module.css'
import HashLoader from 'react-spinners/HashLoader';

const SupplierContract = () => {
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

    invoice_number: "",
    invoice_name: "",
    invoice_description: "",
    createdDate: currentDate,
    modifiedDate: currentDate,
    invoice_Doc: [
      {

        invoice_name: "",
        supplier_name: "",
        invoice_date: "",
        due_date: "",
        amount_due: "",
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
  }
  );

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
        invoice_Doc: prevState.invoice_Doc.map(contract => ({
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
      const updatedSupplierContract = [...prevData.invoice_Doc];
      console.log('Updated:', updatedSupplierContract)
      updatedSupplierContract[index] = { ...updatedSupplierContract[index], [name]: value };
      console.log('SecondUpdated:', { ...prevData, invoice_Doc: updatedSupplierContract });
      return { ...prevData, invoice_Doc: updatedSupplierContract };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let {
      invoice_name,
      invoice_number,
      invoice_description,
      modifiedDate,
      createdDate,
      invoice_Doc: [
        {
          supplier_name,
          invoice_date,
          due_date,
          amount_due,
          iteration_info,
          islatest_Iteration,
          attachment
        }
      ]
    } = userData;

    attachment = attachments;


    try {

      const res = await fetch(`http://localhost:8181/InvoiceMasterObject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoice_name,
          invoice_number,
          invoice_description,
          modifiedDate,
          createdDate,
          invoice_Doc: [
            {
              invoice_name,
              supplier_name,
              invoice_date,
              due_date,
              amount_due,
              iteration_info,
              islatest_Iteration,
              attachment
            }
          ]
        }),
      });
      if (res.ok) {
        setUserData({
          invoice_name: '',
          invoice_number: "",
          invoice_description: "",
          modifiedDate: "",
          createdDate: "",
          invoice_Doc: [
            {
              invoice_name: "",
              supplier_name: "",
              invoice_date: "",
              due_date: "",
              amount_due: "",
              iteration_info: "",
              islatest_Iteration: "",
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
                        name='invoice_name'
                        value={userData.invoice_name}
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
                        name='invoice_number'
                        onChange={(e) => postUser(e)}
                        value={userData.invoice_number}
                        type='number'
                      />
                    </div>

                    <div className={styles.formInput}>
                      <strong>Description:</strong>
                      <textarea
                        type='text'
                        name='invoice_description'
                        value={userData.invoice_description}
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
                    {userData.invoice_Doc.map((contract, index) => (
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
                          <strong>Invoice Date:</strong>
                          <input
                            type='date'
                            name='invoice_date'
                            value={contract.invoice_date}
                            className={styles.partName}
                            onChange={(event) => postUserData(event, index)}
                          />
                        </div>

                        <div className={styles.formInput}>
                          <strong>Due Date:</strong>
                          <input
                            type='date'
                            name='due_date'
                            value={contract.due_date}
                            className={styles.partName}
                            onChange={(event) => postUserData(event, index)}
                          />
                        </div>

                        <div className={styles.formInput}>
                          <strong htmlFor='document'>Itemized Charges:</strong>
                          <input type='file' className={styles.partName} id='document' name="itemizedCharges" onChange={handleFileUpload} />
                        </div>

                        <div className={styles.formInput}>
                          <strong htmlFor='document'>Total Amount Due:</strong>
                          <input type='file' className={styles.partName} id='document' name="totalAmountDue" onChange={handleFileUpload} />
                        </div>

                        <div className={styles.formInput}>
                          <strong>Effective Date:</strong>
                          <input
                            type='date'
                            name='amount_due'
                            value={contract.amount_due}
                            className={styles.partName}
                            onChange={(event) => postUserData(event, index)}
                          />
                        </div>





                        <div className={styles.formInput}>
                          <strong htmlFor='document'>Payment Instruction:</strong>
                          <input type='file' className={styles.partName} id='document' name="paymentInstructions" onChange={handleFileUpload} />
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

export default SupplierContract;
