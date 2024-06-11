import React, { useContext, useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import InvoiceServices from '../../../services/invoice.services';
import { categoryContext } from "../../../store/CategoryProvider";
import spinnerStyle from "../../../style.module.css";
import FileInput from '../../../utils/FileInput';
import { closeWindow, isAuthenticated } from "../../../utils/helper";
import styles from '../../Form/Parts/PartAttribut.module.css';
import message from '../../../utils/message';

const InvoiceDocEdit = ({ id }) => {

    const { getInvoiceDocumentById } = new InvoiceServices();
    const location = useLocation();
    const editId = location?.pathname?.split('/').slice(-1).join();
    console.log({ location: location?.pathname?.split('/').slice(-1).join() })
    const categoryItemsCtx = useContext(categoryContext);

    const [timer, setTimer] = useState(false);
    const navigate = useNavigate();
    const [attachments, setAttachments] = useState([]);
    const [userData, setUserData] = useState({
        document_number: '',
        document_name: '',
        document_description: '',
        createdDate: '',
        modifiedDate: '',
        invoice_Doc: [
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

    const getPartApiEdit = async (id) => {
        try {
            const mypartData = await getInvoiceDocumentById(id);
            console.log({ mypartData });
            const newParts = (mypartData?.data?.invoice_Doc || []).sort((a, b) => b.id - a.id)?.[0];
            const newPartsData = { ...mypartData?.data, invoice_Doc: [{ ...newParts } || {}] }
            setUserData(newPartsData);
            setAttachments(newPartsData?.invoice_Doc[0]?.attachment);
        } catch (error) {
            console.log(error);
        }
    };

    console.log("USERDATA", { userData });
    console.log("ATTACHMENTS", { attachments });


    const handleFileUpload = (event, fileObj) => {
        const file = event.target.files[0];
        console.log('FILE', file);
        const reader = new FileReader();
        const title = event.target.name;

        console.log('Event', { title }, "fileObj", { fileObj });

        //



        reader.onloadend = () => {
            // After the file is loaded, store the result (Base64 string) in the state
            // setUserData(prevState => ({
            //     ...prevState,
            //     invoice_Doc: prevState.invoice_Doc.map(contract => ({
            //         ...contract,
            //     }))
            // }));
            const modifiedAttachment = attachments?.map((elem) => {
                if (elem?.id === fileObj?.id) {
                    return { ...elem, fileName: file.name, fileType: file.type, content: reader.result }
                }
                return elem;
            })
            console.log("MODIFIED", { modifiedAttachment });
            setAttachments(modifiedAttachment);
            //    setUserData((prevState)=>{
            //     return {
            //         ...prevState,
            //         invoice_Doc:[{...prevState.invoice_Doc?.[0],attachment:modifiedAttachment}]
            //     }
            //    })
        };


        console.log("USERDETAILS7", userData);

        // Read the file as a Data URL (Base64)
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (editId) {
            getPartApiEdit(editId);
            console.log({ test: "HELLO" })
        }
    }, [editId])
    console.log("DATAIS", userData)
    let name, value;
    const postUser = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData(prevState => {
            return { ...prevState, [name]: value }
        })
    };

    const postUserData = (event, index) => {
        const { name, value } = event.target;
        const date = new Date().toJSON().slice(0, 10);
        console.log(date);
        setUserData((prevData) => {
            console.log("PREVDATA", prevData);
            const updatedParts = [...prevData.invoice_Doc];
            console.log("UPDATE", updatedParts)
            updatedParts[index] = { ...updatedParts[index], [name]: value, modifiedDate: date };
            return { ...prevData, invoice_Doc: updatedParts };
        });
        console.log("DATAISTHE", userData)
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setTimer(true);
        try {
            // `http://localhost:8181/SupplierMasterObject`

            const res = await fetch(`http://localhost:8181/InvoiceMasterObject `, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuthenticated()}`
                },
                body: JSON.stringify(
                    { ...userData, invoice_Doc: [{ ...userData?.invoice_Doc[0], attachment: attachments }] }
                )
            });

            // console.log({res});
            if (res.ok) {
                message('success', 'Invoice Document Edited, please refresh the page to get the latest data')
                setTimeout(() => {
                  setTimer(false);
                  closeWindow();
             }, 5000);
            }
        } catch (error) {
            console.log(error);
            setTimer(false);
        }
    };

    let obj = {
        "itemizedCharges": attachments?.find((elem) => elem.attachmentType == "itemizedCharges"),
        "totalAmountDue": attachments?.find((elem) => elem.attachmentType == "totalAmountDue"),
        "paymentInstructions": attachments?.find((elem) => elem.attachmentType == "paymentInstructions"),
    }

    // useEffect(()=>{
    //   setAttachments(userData?.invoice_Doc[0]?.attachment);
    //   console.log('ATTACK',userData?.invoice_Doc[0]);
    // },[])

    console.log("OBJ", { obj });

    return (
        timer ? <div className={spinnerStyle.spinnerContainer}>
            {' '}
            <HashLoader color='#0E6EFD' />{' '}
        </div>
            :
            <div>
                {/* <h3>Part Management</h3> */}
                <div className={styles.parentContainer}>
                    <div className={styles.childContainer}>
                        <div className={styles.systemAttribute}>
                            <div className={styles.part_container}>
                                <div className={styles.master_part}>
                                    <div className={styles.masterpart_header}>
                                        <p>System Attribute:-</p>
                                    </div>
                                    <div className={styles.formContainer}>
                                        <div className={styles.formInput}>
                                            <strong>Document Name(Non-Editable)</strong>
                                            <input
                                                type='text'
                                                name='invoice_name'
                                                value={userData?.invoice_name || ''}
                                                // onChange={(e) => postUser(e)}
                                                className={styles.partName}
                                                readOnly
                                            />
                                        </div>

                                        <div
                                            className={styles.formInput}
                                            style={{ marginTop: '10px' }}
                                        >
                                            <strong>Document Number(Non-Editable)</strong>
                                            <input
                                                className={styles.partNumber}
                                                name='invoice_number'
                                                // onChange={(e) => postUser(e)}
                                                value={userData?.invoice_number || ''}
                                                type='text'
                                                readOnly
                                            />
                                        </div>

                                        <div className={styles.formInput}>
                                            <strong>Description(Non-Editable)</strong>
                                            <textarea
                                                type='text'
                                                name='invoice_description'
                                                value={userData?.invoice_description || ''}
                                                // onChange={(e) => postUser(e)}
                                                className={styles.partName}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bussinessAttribute}>
                            <div className={styles.part_container}>
                                <div className={styles.master_part}>
                                    <div className={styles.masterpart_header}>
                                        <p>Bussiness Attribute:-</p>
                                    </div>

                                    <div className={styles.formContainer}>
                                        <>
                                            <div className={styles.formInput}>
                                                <strong>Supplier Name(Non-Editable)</strong>
                                                <input
                                                    type="text"
                                                    name="supplier_name"
                                                    value={userData?.invoice_Doc[0]?.supplier_name || ''}
                                                    onChange={(event) => postUserData(event, 0)}
                                                    readOnly
                                                />
                                            </div>

                                           
                                            <div className={styles.formInput}>
                                                <strong htmlFor='document'>Payment Instruction:</strong>

                                                <FileInput fileName={obj["paymentInstructions"]} setFileName={handleFileUpload} />

                                            </div>



                                            <div className={styles.formInput}>
                                                <strong htmlFor='document'>Itemized Charges:</strong>
                                                <FileInput fileName={obj["itemizedCharges"]} setFileName={handleFileUpload} />

                                            </div>




                                            <div className={styles.formInput}>
                                                <strong>Invoice Date:</strong>
                                                <input
                                                    type='date'
                                                    name='invoice_date'
                                                    value={userData?.invoice_Doc[0]?.invoice_date || ''}
                                                    className={styles.partName}
                                                    onChange={(event) => postUserData(event, 0)}
                                                />
                                            </div>

                                            <div className={styles.formInput}>
                                                <strong>Due Date:</strong>
                                                <input
                                                    type='date'
                                                    name='due_date'
                                                    value={userData?.invoice_Doc[0]?.due_date || ''}
                                                    className={styles.partName}
                                                    onChange={(event) => postUserData(event, 0)}
                                                />
                                            </div>

                                            <div className={styles.formInput}>
                                                <strong>Effective Date:</strong>
                                                <input
                                                    type='date'
                                                    name='amount_due'
                                                    value={userData?.invoice_Doc[0]?.amount_due || ''}
                                                    className={styles.partName}
                                                    onChange={(event) => postUserData(event, 0)}
                                                />
                                            </div>
                                            <div className={styles.formInput}>
                                                <strong htmlFor='document'>Total Amount Due:</strong>
                                                <FileInput fileName={obj["totalAmountDue"]} setFileName={handleFileUpload} />

                                            </div>
                                           
                                        </>
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

export default InvoiceDocEdit;