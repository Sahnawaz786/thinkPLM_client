import React, { useContext, useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import SupplierServices from '../../../services/supplier.services';
import { UserContext } from '../../../store/UserProvider';
import DisplayAlert from '../../../utils/DisplayAlert';
// import classes from '../PartsAction/PartDetails.module.css';
import { useNavigate } from 'react-router-dom';
import styles from '../../../style.module.css';
import { URL, openNewWindow } from '../../../utils/helper';
import SupplierContainer from '../SupplierContainer/SupplierContainer';
import classes from './Supplier.module.css';

const SupplierDetails = ({ id }) => {

 const[supplierDetails,setSupplierDetails]=useState([]);
const {choice,showAlert,setShowAlert}=useContext(UserContext);
 const [timer,setTimer] = useState(true);
 const navigate=useNavigate()

const {getSupplierById,deleteSupplier}=new SupplierServices();

  const getSupplierApi = async (id) => {
    const supplierInfo = await getSupplierById(id);
    const supData = (supplierInfo?.data?.supplier || [])
    .map((elem) => {
      return { ...elem, createdDate: supplierInfo?.data?.createdDate };
    })
    .sort((a, b) => b.id - a.id)?.[0];
    const newSuppliersData = { ...supplierInfo, supplier: [supData || {}] };
    setSupplierDetails([newSuppliersData || {}]);
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
      window.location.reload();
  };
}

const handleEditSupplier = (e) => {
  openNewWindow(e, `${URL}/edit-supplier/${id}`);
      setTimeout(() => {
        navigate(`/supplier-details/${id}`);
      }, 1000);
}

useEffect(()=>{
  DeleteFun(id)
},[choice])

console.log("******",supplierDetails)
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
        onClick={(e)=> handleEditSupplier(e) }
        className={styles.icon_pointer}


      />
      <img
        src='https://cdn-icons-png.freepik.com/512/9740/9740598.png'
        width={30}
        height={30}
        alt=''
        className={styles.deleteIcon}
        onClick={(e)=>setShowAlert(true)}
      />
      
    </div>

    <div className={classes.detailContainer}>
      <div className={classes.part_details_paragrah}>
          {supplierDetails.map((supplierMaster,i)=>{
        return (
          <>
          
            {/* <div className={classes.part_container}> */}
            <div className={classes.master_part} key={i}>
                <div className={classes.masterpart_header}>
                  <p>System:-</p>
                </div>
                {/* <div className={classes.systemInfo}> */}
                  <p  >
                    <strong>Supplier Category:</strong>{' '}
                    {supplierMaster?.data?.category}
                  </p>

                  <p >
                    <strong>Supplier Name:</strong>{' '}
                    {supplierMaster?.data?.name}
                  </p>

                  <p >
                    <strong>Description:</strong>{' '}
                    {supplierMaster?.data?.description}
                  </p>
                  
                  <p >
                    <strong>Created Date:</strong>{' '}
                    {supplierMaster?.data?.createdDate}
                  </p>
                  
                  <p >
                    <strong>Modified Date:</strong>{' '}
                    {supplierMaster?.data?.modifiedDate}
                  </p>
                {/* </div> */}
              </div>
            {/* </div> */}

          
          </>
        )
      })}
        
      </div>
      <div className={classes.bottomDetails}>
        {supplierDetails[0]?.supplier?.map((childSupplier,i)=>{
          return (<>
                <div className={classes.child_part} key={i}>
            <div className={classes.childpart_header}>
              <p>Business:-</p>
            </div>
            <p>
              <strong>Email:</strong> {childSupplier?.email}
            </p>
            <p>
              <strong>Contact:</strong> {childSupplier?.contact}
            </p>
            <p>
              <strong>Start Date:</strong> {childSupplier?.start_date}
            </p>
            <p>
              <strong>End Date:</strong> {childSupplier?.end_date}
            </p>
            <p>
              <strong>State:</strong> {childSupplier?.state}
            </p>
            <p>
              <strong>Product Type:</strong>{childSupplier?.pt}
            </p>
            <p>
              <strong>District:</strong>{childSupplier?.district}
            </p>
            <p>
              <strong>Country:</strong> {childSupplier?.country}
            </p>
            <p>
              <strong>Location:</strong>{' '}
              {childSupplier?.location}
            </p>
          </div>
          </>)
        })}
        <>
         
        </>
      </div>
    </div>
    {showAlert && <DisplayAlert />}
  </SupplierContainer>
)
}

export default SupplierDetails;