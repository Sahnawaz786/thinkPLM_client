import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserServices from '../../../services/user.services';
import styles from '../../../style.module.css';
import classes from '../SupplierContainer/SupplierContainer.module.css';


const {getUSerById}=new UserServices()

const UserContainer = ({ children, id }) => {

  const [supplierInformation, setSupplierInformation] = useState([]);
  const [activeBtn,setActiveBtn] = useState('');
  const {pathname} = useLocation();

  const navigate = useNavigate();
  


  const getSupplierApi = async (id) => {

    const partInfo = await getUSerById(id);
    console.log("supplier container data:", { partInfo })
    const newParts = (partInfo?.data || [])
    setSupplierInformation([newParts]);
    console.log("UsserINfo",supplierInformation)

  }
  useEffect(() => {
    getSupplierApi(id);
  },[id])

  console.log("SUPPLIERINFO",supplierInformation[0])

  return (
    <>
      <div className={classes.profile_section}>
     
            <div className={classes.container} >
            <p className={classes.container_paragraph}> 
            <div className={styles.logoText} >
              <img
                src='/images/human-logo.jpeg'
                alt='logo'
                className={styles.imageIcon}
              />
             {(supplierInformation || [])?.map((sup, index) => {
              console.log('SUP',sup)
          return (
            <div className={classes.container} >
              <p className={classes.container_paragraph}> User : {sup.id} ,{sup.fullName} {sup.email}</p>
            </div>
          )
        })}
              </div>
              </p>
            </div>
       
        <div>
          {children}
        </div>
      </div>


    </>
  )
}

export default UserContainer;