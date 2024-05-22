import React, { useContext, useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import PartServices from '../../../services/parts.services';
import { categoryContext } from "../../../store/CategoryProvider";
import spinnerStyle from "../../../style.module.css";
import message from "../../../utils/message";
import styles from '../../Form/Parts/PartAttribut.module.css';

const EditPart = ({id}) => {

  const {getPartById} = new PartServices();

  const categoryItemsCtx = useContext(categoryContext);

  const [timer,setTimer] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date().toJSON().slice(0, 10)
  );

  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    part_number: "",
    part_name: "",
    description: "",
    
    parts: [
      {
        supplier_category: "",
        supplier_name: "",
        material: "",
        mpn_number: "",
        weight: "",
        dimension: "",
        cost: "",
        lead_date: "",
        quality_matrices: "",
        compliance_information: "",
        modifiedDate:null,
        iteration_info: 1,
        islatest_Iteration: 1,
      },
    ],
  });

  const getPartApiEdit = async (id) => {
    try {
      const mypartData = await getPartById(id);
      const newParts = (mypartData?.data.parts || []).sort((a, b) => b.id - a.id)?.[0];
      const newPartsData = {...mypartData, parts: [{...newParts} || {}]}
      setUserData(newPartsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      getPartApiEdit(id);
  }, [id]);
  
  // console.log(id);
  // console.log(userData);

  // let name, value;
  const postUser = (event) => {
   const name = event.target.name;
   const value = event.target.value;
    setUserData(prevState => {
      return { ...prevState, [name]: value }
    })
  };

  const postUserData = (event, index) => {
    const { name, value } = event.target;
  
  
    setUserData((prevData) => {
      const updatedParts = [...prevData.parts];
      updatedParts[index] = { ...updatedParts[index], [name]: value ,modifiedDate:currentDate};
      return { ...prevData, parts: updatedParts };
    });
    console.log(userData)
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true)
    console.log("USER---DATA",{userData: {...userData.data, parts: [{ ...userData?.parts[0]}]}})
    // return;
    try {
      // `http://localhost:8181/SupplierMasterObject`

      const res = await fetch(`http://localhost:8181/SupplierMasterObject`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...userData?.data, parts: [{ ...userData?.parts[0] }]}),
      });

      // console.log({res});
      if (res.ok) {
        navigate("/");
      }
      else{
        const data=await res.json();
        console.log("...........",data.message)
        message('error',data.message)
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
                    <strong>Part Name(Non-Editable)</strong>
                    <input
                      type='text'
                      name='part_name'
                      value={userData?.data?.part_name}
                      onChange={(e) => postUser(e)}
                      className={styles.partName}
                      readOnly
                    />
                  </div>

                  <div
                    className={styles.formInput}
                    style={{ marginTop: '10px' }}
                  >
                    <strong>Part Number(Non-Editable)</strong>
                    <input
                      className={styles.partNumber}
                      name='part_number'
                      onChange={(e) => postUser(e)}
                      value={userData?.data?.part_number}
                      type='text'
                      readOnly
                    />
                  </div>

                  <div className={styles.formInput}>
                    <strong>Description(Non-Editable)</strong>
                    <textarea
                      type='text'
                      name='description'
                      value={userData?.data?.description}
                      onChange={(e) => postUser(e)}
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
                  {userData.parts.map((part, index) => (
                    <>
                      <div className={styles.formInput}>
                        <strong>Supplier Name(Non-Editable)</strong>
                        <input
                          type="text"
                          name="supplier_name"
                          value={part.supplier_name}
                          onChange={(event) => postUserData(event, index)}
                          readOnly
                        />
                      </div>

                      <div className={styles.formInput}>
                        <strong>Material:</strong>
                        <input
                          type='text'
                          name='material'
                          value={part.material}
                          className={styles.partName}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>

                      <div className={styles.formInput}>
                        <strong>MPN No:</strong>
                        <input
                          type='text'
                          name='mpn_number'
                          value={part.mpn_number}
                          className={styles.partNumber}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>
                      <div className={styles.formInput}>
                        <strong>Weight:</strong>
                        <input
                          type='text'
                          name='weight'
                          value={part.weight}
                          className={styles.partNumber}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>
                      <div className={styles.formInput}>
                        <strong>Dimension:</strong>
                        <input
                          type='text'
                          name='dimension'
                          value={part.dimension}
                          className={styles.partNumber}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>
                      <div className={styles.formInput}>
                        <strong>Cost:</strong>
                        <input
                          type='text'
                          name='cost'
                          value={part.cost}
                          className={styles.partNumber}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>
                      <div className={styles.formInput}>
                        <strong>Lead Date:</strong>
                        <input
                          type='date'
                          name='lead_date'
                          value={part.lead_date}
                          className={styles.partName}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>
                      <div className={styles.formInput}>
                        <strong>Quality Matrices:</strong>
                        <input
                          type='text'
                          name='quality_matrices'
                          value={part.quality_matrices}
                          className={styles.partNumber}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>
                      <div className={styles.formInput}>
                        <strong>Compliance Information:</strong>
                        <input
                          type='text'
                          name='compliance_information'
                          value={part.compliance_information}
                          className={styles.partName}
                          onChange={(event) => postUserData(event, index)}
                        />
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

export default EditPart;