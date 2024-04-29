import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import SupplierServices from '../../../services/supplier.services';
import { UserContext } from '../../../store/UserProvider';
import styles from '../../../style.module.css';
import DisplayAlert from '../../../utils/DisplayAlert';
import classes from './BomRightBar.module.css';

const BomRightBar = ({ id }) => {

 const[supplierDetails,setSupplierDetails]=useState([]);
const {choice,showAlert,setShowAlert}=useContext(UserContext);
 const [timer,setTimer] = useState(true);
 const navigate=useNavigate()

const {getSupplierById,deleteSupplier}=new SupplierServices();

  const getSupplierApi = async (id) => {
    const supplierInfo = await getSupplierById(id);
    const supData = (supplierInfo?.data || [])
    console.log('supplier info data', supData);
    setSupplierDetails(supData)
  };

  useEffect(() => {
    getSupplierApi(id);
    setTimer(true);
    let timeOut = setTimeout(() => {
      setTimer(false);
    }, 1000);
    return(()=>timeOut)
  },[id]);


return (
    
  timer ? (
    <div className={styles.spinnerContainer}>
      <HashLoader color='#0E6EFD' />{' '}
    </div>
  ) :

//    <SupplierContainer id={id}>

<>
<div className={classes.rightBar_bomContainer}>
    <div className={classes.detailContainer}>
      <div className={classes.part_details_paragrah}>

          
              <div className={classes.master_part}>
                <div className={classes.masterpart_header}>
                  <p>Part Attributes:-</p>
                </div>
                  <p  >
                    <strong>Number:</strong>{' '}
                    {supplierDetails.category}
                  </p>

                  <p >
                    <strong>Name:</strong>{' '}
                    {supplierDetails.name}
                  </p>

                  <p >
                    <strong>Version:</strong>{' '}
                    {supplierDetails.pt}
                  </p>
                  <p >
                    <strong>State:</strong>{""}
                    Open
                  </p>
                  <p >
                    <strong>Status:</strong>{' '}
                    Checked In
                  </p>
                  <p >
                    <strong>Modified Date:</strong>{' '}
                    {supplierDetails.modifiedDate}
                  </p>
      
              </div>
        

        
      </div>
      <div className={classes.bottomDetails}>
        <>
          <div className={classes.child_part}>
            <div className={classes.childpart_header}>
              <p>Usage Attributes</p>
            </div>
            <p>
              <strong>Quantity:</strong> {supplierDetails.email}
            </p>
            <p>
              <strong>Unit:</strong> {supplierDetails.contact}
            </p>
            <p>
              <strong>Trace Code:</strong> {supplierDetails.start_date}
            </p>
            <p>
              <strong>Line Number:</strong> {supplierDetails.end_date}
            </p>
            <p>
              <strong>Find Number:</strong> {supplierDetails.state}
            </p>
            <p>
              <strong>Reference Designator:</strong>{supplierDetails.district}
            </p>
           
          </div>
        </>
      </div>
    </div>
    {showAlert && <DisplayAlert />}
    </div>
    </>

//   </SupplierContainer>
)

}

export default BomRightBar;