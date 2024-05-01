import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import spinnerStyle from "../../../style.module.css";
import { categoryContext } from "../../../store/CategoryProvider";
import DocumentServices from '../../../services/document.services';
import styles from '../../Form/Parts/PartAttribut.module.css';
import HashLoader from 'react-spinners/HashLoader';
import { Button } from 'react-bootstrap';
import classes from "../../Form/AllForm.module.css";

const SupplierDocEdit = ({ id }) => {

    const { getDocumentById } = new DocumentServices();

    const categoryItemsCtx = useContext(categoryContext);

    const [timer, setTimer] = useState(false);


    const navigate = useNavigate();


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
                        pricingandPaymentTerms: "",
                        termandTermination: "",
                        goveringLawandJurisdication: "",
                        signatures: "",
                        itemizedCharges: null,
                        paymentInstructions: null,
                        insuranceCoverage: null,
                        authorizedSignature: null,
                        complianceStandard: null,
                        certifyingAuthority: null,
                        complianceStatement: null
                    }
                ]
            }
        ]
    });

    const getPartApiEdit = async (id) => {
        try {
            const mypartData = await getDocumentById(id);
            const newParts = (mypartData?.data[0]?.supplier_contract || []).sort((a, b) => b.id - a.id)?.[0];
            const newPartsData = {...mypartData, supplier_contract: [{...newParts} || {}]}
            setUserData(newPartsData);
            console.log("DATAISTHE",userData,mypartData)

          } catch (error) {
            console.log(error);
          }
    };


    useEffect(() => {
        getPartApiEdit(id);
    }, [id]);



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
        const date=new Date().toJSON().slice(0, 10);
        console.log(date);
        setUserData((prevData) => {
          const updatedParts = [...prevData.supplier_contract];
          updatedParts[index] = { ...updatedParts[index], [name]: value ,modifiedDate:date};
          return { ...prevData, supplier_contract: updatedParts };
        });
        console.log("DATAISTHE",userData)
      };

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("USER---DATA", { userData: { ...userData.data, supplier_contract: [{ ...userData?.supplier_contract[0] }] } })
        // return;
        try {
            // `http://localhost:8181/SupplierMasterObject`

            const res = await fetch(`http://localhost:8181/SupplierMasterContractObject`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userData?.data[0]} )
            });

            // console.log({res});
            if (res.ok) {
                navigate("/update");
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                                                value={userData?.data[0]?.document_name || ''}
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
                                                value={userData?.data[0]?.document_number || ''}
                                                type='text'
                                                readOnly
                                            />
                                        </div>

                                        <div className={styles.formInput}>
                                            <strong>Description(Non-Editable)</strong>
                                            <textarea
                                                type='text'
                                                name='description'
                                                value={userData?.data[0]?.description || ''}
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
                                                        onChange={(event) => postUserData(event)}
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

export default SupplierDocEdit;