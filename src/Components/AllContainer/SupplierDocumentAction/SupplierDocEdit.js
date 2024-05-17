import React, { useContext, useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import DocumentServices from '../../../services/document.services';
import { categoryContext } from "../../../store/CategoryProvider";
import spinnerStyle from "../../../style.module.css";
import FileInput from '../../../utils/FileInput';
import styles from '../../Form/Parts/PartAttribut.module.css';

const SupplierDocEdit = ({ id }) => {

    const { getDocumentById } = new DocumentServices();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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
        description: '',
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
                        fileName: null,
                        fileType: null,
                        content: null,
                        attachmentType: ''
                    }
                ]
            }
        ]
    });

    const getPartApiEdit = async (id) => {
        try {
            const mypartData = await getDocumentById(id);
            console.log({ mypartData });
            const newParts = (mypartData?.data?.supplier_contract || []).sort((a, b) => b.id - a.id)?.[0];
            const newPartsData = { ...mypartData?.data, supplier_contract: [{ ...newParts } || {}] }
            setUserData(newPartsData);
            setAttachments(newPartsData?.supplier_contract[0]?.attachment);
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
            //     supplier_contract: prevState.supplier_contract.map(contract => ({
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
            //         supplier_contract:[{...prevState.supplier_contract?.[0],attachment:modifiedAttachment}]
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
            const updatedParts = [...prevData.supplier_contract];
            console.log("UPDATE", updatedParts)
            updatedParts[index] = { ...updatedParts[index], [name]: value, modifiedDate: date };
            return { ...prevData, supplier_contract: updatedParts };
        });
        console.log("DATAISTHE", userData)
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsButtonDisabled(true)
        console.log("USER---DATA", { sajjad: { ...userData, supplier_contract: [{ ...userData?.supplier_contract[0], attachment: attachments }] } })

        try {
            // `http://localhost:8181/SupplierMasterObject`

            const res = await fetch(`http://localhost:8181/SupplierMasterContractObject`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    { ...userData, supplier_contract: [{ ...userData?.supplier_contract[0], attachment: attachments }] }
                )
            });

            // console.log({res});
            if (res.ok) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    let obj = {
        "termandTermination": attachments?.find((elem) => elem.attachmentType == "termandTermination"),
        "goveringLawandJurisdication": attachments?.find((elem) => elem.attachmentType == "goveringLawandJurisdication"),
        "signatures": attachments?.find((elem) => elem.attachmentType == "signatures"),
        "contractDocument": attachments?.find((elem) => elem.attachmentType == "contractDocument"),
    }

    // useEffect(()=>{
    //   setAttachments(userData?.supplier_contract[0]?.attachment);
    //   console.log('ATTACK',userData?.supplier_contract[0]);
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
                                                name='document_name'
                                                value={userData?.document_name || ''}
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
                                                name='document_number'
                                                // onChange={(e) => postUser(e)}
                                                value={userData?.document_number || ''}
                                                type='text'
                                                readOnly
                                            />
                                        </div>

                                        <div className={styles.formInput}>
                                            <strong>Description(Non-Editable)</strong>
                                            <textarea
                                                type='text'
                                                name='description'
                                                value={userData?.description || ''}
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
                                                    value={userData?.supplier_contract[0]?.supplier_name || ''}
                                                    onChange={(event) => postUserData(event, 0)}
                                                    readOnly
                                                />
                                            </div>

                                            <div className={styles.formInput}>
                                                <strong>Scope of Work:</strong>
                                                <input
                                                    type='text'
                                                    name='work_scope'
                                                    value={userData?.supplier_contract[0]?.work_scope || ''}
                                                    className={styles.partName}
                                                    onChange={(event) => postUserData(event, 0)}
                                                />
                                            </div>
                                            <div className={styles.formInput}>
                                                <strong htmlFor='document'>Upload Contract Details:</strong>

                                                <FileInput fileName={obj["contractDocument"]} setFileName={handleFileUpload} />

                                            </div>



                                            <div className={styles.formInput}>
                                                <strong htmlFor='document'>Terms and Terminations:</strong>
                                                <FileInput fileName={obj["termandTermination"]} setFileName={handleFileUpload} />

                                            </div>




                                            <div className={styles.formInput}>
                                                <strong>Effective Date:</strong>
                                                <input
                                                    type='date'
                                                    name='effective_date'
                                                    value={userData?.supplier_contract[0]?.effective_date || ''}
                                                    className={styles.partName}
                                                    onChange={(event) => postUserData(event, 0)}
                                                />
                                            </div>
                                            <div className={styles.formInput}>
                                                <strong>Expiration Date:</strong>
                                                <input
                                                    type='date'
                                                    name='expiration_date'
                                                    value={userData?.supplier_contract[0]?.expiration_date || ''}
                                                    className={styles.partName}
                                                    onChange={(event) => postUserData(event, 0)}
                                                />
                                            </div>
                                            <div className={styles.formInput}>
                                                <strong htmlFor='document'>Governing law and Jurisdiction:</strong>
                                                <FileInput fileName={obj["goveringLawandJurisdication"]} setFileName={handleFileUpload} />

                                            </div>
                                            <div className={styles.formInput}>
                                                <strong htmlFor='document'>Signature:</strong>
                                                <FileInput fileName={obj["signatures"]} setFileName={handleFileUpload} />

                                            </div>

                                        </>
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

export default SupplierDocEdit;