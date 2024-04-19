import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../../Form/AllForm.module.css";
import { categoryContext } from "../../../store/CategoryProvider";
import PartServices from '../../../services/parts.services';

// import {message} from "antd";

const EditPart = ({id}) => {

  const {getPartById} = new PartServices();

  const categoryItemsCtx = useContext(categoryContext);


  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    part_number: "",
    part_name: "",
    description: "",
    // createdDate: currentDate,
    // modifiedDate: currentDate,
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
    const date=new Date().toJSON().slice(0, 10);
    console.log(date)
    setUserData((prevData) => {
      const updatedParts = [...prevData.parts];
      updatedParts[index] = { ...updatedParts[index], [name]: value ,modifiedDate:date};
      return { ...prevData, parts: updatedParts };
    });
    console.log(userData)
  };

  const submitHandler = async (event) => {
    event.preventDefault();
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
        navigate("/update");
      }
    } catch (error) {
      console.log(error);
    }
   };

  return (
    <>
      <h3>Part Management</h3>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <div className={classes.container_align}>
          <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
              <h3>Custom Parts</h3>
              <div className={classes.content}>
                <div className={classes.input}>
                  <label htmlFor="text">Part Number(Non-Editable)</label>
                  <input
                    type="text"
                    name="part_number"
                    value={userData?.data?.part_number}
                    onChange={postUser}
                    readOnly
                  />
                </div>

                <div className={classes.input}>
                  <label htmlFor="text">Part Name(Non-Editable)</label>
                  <input
                    type="text"
                    name="part_name"
                    value={userData?.data?.part_name}
                    onChange={postUser}
                    readOnly
                  />
                </div>

                <div className={classes.input}>
                  <label htmlFor="text">Description(Non-Editable)</label>
                  <input
                    type="text"
                    name="description"
                    value={userData?.data?.description}
                    onChange={postUser}
                    readOnly
                  />
                </div>

                {userData.parts.map((childPart, index) => {
                  return (
                    <>
                      <div className={classes.input}>
                        <label>Supplier Name(Non-Editable)</label>
                        <input
                          type="text"
                          name="supplier_name"
                          value={childPart.supplier_name}
                          onChange={(event) => postUserData(event, index)}
                          readOnly
                        />
                      </div>

                      <div className={classes.input}>
                        <label htmlFor="text">Material</label>
                        <input
                          type="text"
                          name="material"
                          value={childPart.material}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>

                      <div className={classes.input}>
                        <label htmlFor="text">MPN Number</label>
                        <input
                          type="text"
                          name="mpn_number"
                          value={childPart.mpn_number}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>

                      <div className={classes.input}>
                        <label htmlFor="text">Weight</label>
                        <input
                          type="text"
                          name="weight"
                          value={childPart.weight}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>

                      <div className={classes.input}>
                        <label htmlFor="text">Dimensions</label>
                        <input
                          type="text"
                          name="dimension"
                          value={childPart.dimension}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>

                      <div className={classes.input}>
                        <label htmlFor="text">Cost</label>
                        <input
                          type="text"
                          name="cost"
                          value={childPart.cost}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>

                      <div className={classes.input}>
                        <label htmlFor="text">Lead date</label>
                        <input
                          type="date"
                          name="lead_date"
                          value={childPart.lead_date}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>
                      <div className={classes.input}>
                        <label htmlFor="text">Quality_matrices</label>
                        <input
                          type="text"
                          name="quality_matrices"
                          value={childPart.quality_matrices}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>
                      <div className={classes.input}>
                        <label htmlFor="text">Compliance Information</label>
                        <input
                          type="text"
                          name="compliance_information"
                          value={childPart.compliance_information}
                          onChange={(event) => postUserData(event, index)}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
              <div className={classes.button_container}>
                <button>Update details</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPart;