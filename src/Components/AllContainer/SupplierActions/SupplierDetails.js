import React, { useContext, useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import SupplierServices from '../../../services/supplier.services';
import { UserContext } from '../../../store/UserProvider';
import styles from '../../../style.module.css';
import DisplayAlert from '../../../utils/DisplayAlert';
import classes from '../PartsAction/PartDetails.module.css';
import SupplierContainer from '../SupplierContainer/SupplierContainer';
import styles from '../../../style.module.css';
import classes from './Supplier.module.css';
import HashLoader from 'react-spinners/HashLoader';
import { useNavigate } from 'react-router-dom';

const SupplierDetails = ({ id }) => {

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

  const DeleteFun = async(id) => {
   
    if (choice) {
      console.log("choice is:",choice)
      const supplierInfo = await deleteSupplier(id);
      navigate('/part-table')
  };
}

useEffect(()=>{
  DeleteFun(id)
},[choice])

return (
  timer ? (
    <div className={styles.spinnerContainer}>
      <HashLoader color='#0E6EFD' />{' '}
    </div>
  ) : <SupplierContainer id={id}>

    <div className={classes.editIcons}>
    <img
        src='https://cdn-icons-png.freepik.com/512/3425/3425921.png'
        width={30}
        height={30}
        alt=''
        onClick={()=>navigate(/edit-supplier/${id})}

      />
      <img
        src='https://cdn-icons-png.freepik.com/512/9740/9740598.png'
        width={30}
        height={30}
        alt=''
        className={styles.deleteIcon}
      />
      
    </div>

    <div className={classes.detailContainer}>
      <div className={classes.part_details_paragrah}>

            {/* <div className={classes.part_container}> */}
              <div className={classes.master_part}>
                <div className={classes.masterpart_header}>
                  <p>System:-</p>
                </div>
                {/* <div className={classes.systemInfo}> */}
                  <p  >
                    <strong>Supplier Category:</strong>{' '}
                    {supplierDetails.category}
                  </p>

                  <p >
                    <strong>Supplier Name:</strong>{' '}
                    {supplierDetails.name}
                  </p>

                  <p >
                    <strong>Product Id:</strong>{' '}
                    {supplierDetails.pt}
                  </p>
                {/* </div> */}
              </div>
            {/* </div> */}

        
      </div>
      <div className={classes.bottomDetails}>
        <>
          <div className={classes.child_part}>
            <div className={classes.childpart_header}>
              <p>Business:-</p>
            </div>
            <p>
              <strong>Email:</strong> {supplierDetails.email}
            </p>
            <p>
              <strong>Contact:</strong> {supplierDetails.contact}
            </p>
            <p>
              <strong>Start Date:</strong> {supplierDetails.start_date}
            </p>
            <p>
              <strong>End Date:</strong> {supplierDetails.end_date}
            </p>
            <p>
              <strong>State:</strong> {supplierDetails.state}
            </p>
            <p>
              <strong>District:</strong>{supplierDetails.district}
            </p>
            <p>
              <strong>Country:</strong> {supplierDetails.country}
            </p>
            <p>
              <strong>Location:</strong>{' '}
              {supplierDetails.location}
            </p>
          </div>
        </>
      </div>
    </div>
    {showAlert && <DisplayAlert />}
  </SupplierContainer>
)
}

export default SupplierDetails;