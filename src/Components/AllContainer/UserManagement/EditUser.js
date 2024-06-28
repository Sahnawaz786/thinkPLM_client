import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import authenticationServices from '../../../services/authentication.services';
import styles from "../../Form/Authentication/Auth.module.css";

const EditUser=({id})=> {
 
    const {getUserByID,deleteUser}=new authenticationServices();
    const navigate=useNavigate();
    const [timer, setTimer] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
   
    const location = useLocation();

    const editId = location?.pathname?.split('/').slice(-1).join();
    const [formData, setFormData] = useState({
      fullName: "",
      username: "",
      lastName: "",
      password: "",
      email: "",
      postalAddress: "",
      telephoneNumber: "",
      alternatePhoneNumber: "",
      supplierName: "",
      enabled: true,
    });
  
    const fetchUsers = async () => {
        const userData= await getUserByID(editId);
        setFormData(userData?.data || [])
      };
      console.log({ formData });

      
  const postUser = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

      const updateUser=async()=> {
        setIsButtonDisabled(true)
        const token=localStorage.getItem("accessToken");
        try {
            const response = await axios.put("http://localhost:8181/updateRegisterUserWithThink", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
              setFormData({
                fullName: "",
                username: "",
                lastName: "",
                password: "",
                email: "",
                postalAddress: "",
                telephoneNumber: "",
                alternatePhoneNumber: "",
                supplierName: "",
                enabled: false,
              });
              navigate('/user-management')
              
            }
            return response.data;
           
        } catch (error) {
            console.error('Error updating user', error);
            throw error;
        }
        finally{
          setIsButtonDisabled(false)
        }
    }
      useEffect(() => {
        fetchUsers();
      }, []);



    return timer ? (
    <div className={styles.spinnerContainer}>
      <HashLoader color="#0E6EFD" />{" "}
    </div>
  ) : (
    <div className={styles.signupContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.childpart_header}>
          <p>Edit User:-</p>
        </div>

        <div className={styles.signupFields}>
          <div className={styles.fields}>
            <span>Full Name :</span>
            <input
              type="text"
              name="fullName"
              value={formData?.fullName}
              onChange={(e) => postUser(e)}
            />
          </div>
          <div className={styles.fields}>
            <span>User Name :</span>
            <input
              type="text"
              name="username"
              value={formData?.username}
              onChange={(e) => postUser(e)}
            />
          </div>

          <div className={styles.fields}>
            <span>Last Name :</span>
            <input
              type="text"
              name="lastName"
              value={formData?.lastName}
              onChange={(e) => postUser(e)}
            />
          </div>
          
          <div className={styles.fields}>
            <span>Email :</span>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={(e) => postUser(e)}
            />
          </div>
          <div className={styles.fields}>
            <span>Supplier Name :</span>
            <input
              type="text"
              name="supplierName"
              value={formData?.supplierName}
              onChange={(e) => postUser(e)}
            />
          </div>
          <div className={styles.fields}>
            <span>Postal Address :</span>
            <textarea
              name="postalAddress"
              value={formData?.postalAddress}
              onChange={(e) => postUser(e)}
            ></textarea>
          </div>
          <div className={styles.fields}>
            <span>Telephone Number :</span>
            <input
              type="number"
              name="telephoneNumber"
              value={formData?.telephoneNumber}
              onChange={(e) => postUser(e)}
            />
          </div>
          <div className={styles.fields}>
            <span>Alternate Phone Number :</span>
            <input
              type="number"
              name="alternatePhoneNumber"
              value={formData?.alternatePhoneNumber}
              onChange={(e) => postUser(e)}
            />
          </div>
         
         

        
        </div>
        <div className={styles.submitBtn}>
          <Button onClick={()=>{updateUser()}} disabled={isButtonDisabled}>Submit</Button>
        </div>
      </div>
    </div>
  );
     
}  

export default EditUser;
