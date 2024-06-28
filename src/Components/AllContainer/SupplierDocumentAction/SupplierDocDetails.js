import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import DocumentServices from '../../../services/document.services';
import { UserContext } from '../../../store/UserProvider';
import styles from '../../../style.module.css';
import DisplayAlert from '../../../utils/DisplayAlert';
import { URL, openNewWindow } from '../../../utils/helper';
import classes from '../SupplierActions/Supplier.module.css';
import SupplierDocContainer from '../SupplierDocumentContainer/SupplierDocContainer';

const SupplierDocDetails = ({ id }) => {

 const[supplierDetails,setSupplierDetails]=useState([]);
const {choice,showAlert,setShowAlert}=useContext(UserContext);
 const [timer,setTimer] = useState(true);
const  [docsupplier,setDocSupplier] = useState([]);
 const location = useLocation();
 const navigate=useNavigate()

const {getDocumentById,getAllDocuments,deleteDocument}=new DocumentServices();

console.log("idssss",id)
  const getSupplierApi = async (id) => {
    const partInfo = await getDocumentById(id);
    console.log("PARTINFO",partInfo);
    console.log('part info data', { partInfo });
    const newParts = (partInfo?.data?.supplier_contract || [])
      .map((elem) => {
        return { ...elem, createdDate: partInfo?.data?.createdDate };
      })
      .sort((a, b) => b.id - a.id)?.[0];

    

    let obj = partInfo?.data?.supplier_contract;


   let mainOBJ =  obj.map((elem)=>{
      return {...elem}
    }).sort((a,b)=>b.id-a.id)?.[0];

    setDocSupplier([mainOBJ]);

    console.log('OBJ',mainOBJ);

    console.log('NEWPARTS',newParts);
    const newPartsData = { ...partInfo, supplier_contract: [newParts || {}] };
    console.log("SupplierDetails",newPartsData);
    setSupplierDetails(newPartsData || {});
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
      const supplierInfo = await deleteDocument(id);
      navigate('/part-table')
  };
}

useEffect(()=>{
  DeleteFun(id)
},[choice])

console.log('DATAIS',supplierDetails);

return (
  timer ? (
    <div className={styles.spinnerContainer}>
      <HashLoader color='#0E6EFD' />{' '}
    </div>
  ) : <SupplierDocContainer id={id} iteration_info={supplierDetails?.data?.supplier_contract[0]?.iteration_info} >

    <div className={classes.editIcons}>
    <img
        src='https://cdn-icons-png.freepik.com/512/3425/3425921.png'
        width={20}
        height={20}
        alt=''
        onClick={(e)=> {
          openNewWindow(e, `${URL}/supplier-document-edit/${id}`);
          setTimeout(() => {
            navigate(location?.pathname);
          }, 1000);
        }}
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
           
            {/* <div className={classes.part_container}> */}
              <div className={classes.master_part}>
                <div className={classes.masterpart_header}>
                  <p>System:-</p>
                </div>
                {/* <div className={classes.systemInfo}> */}
                  <p  >
                    <strong>Document Name:</strong>{' '}
                    {supplierDetails?.data?.document_name}
                  </p>

                  <p >
                    <strong>Document Number:</strong>{' '}
                    {supplierDetails?.data?.document_number}
                  </p>

                  <p >
                    <strong>Document Type:</strong>{' '}
                    {supplierDetails?.data?.documenttype}
                  </p>
                  <p >
                    <strong>Description:</strong>{' '}
                    {supplierDetails?.data?.description}
                  </p>
                {/* </div> */}
              </div>
            {/* </div> */}

        
      </div>
      <div className={classes.bottomDetails}>
      {docsupplier.map((childParts, i) => {
              return (
        
          <div className={classes.child_part}>
            <div className={classes.childpart_header}>
              <p>Business:-</p>
            </div>
            <p>
              <strong>Scope of Work:</strong> {childParts?.work_scope}
            </p>
            <p>
              <strong>Effective Date:</strong> {childParts?.effective_date}
            </p>
            <p>
              <strong>Expiration Date:</strong> {childParts?.expiration_date}
            </p>
          </div>
      )})}
      
      </div>
    </div>
    {showAlert && <DisplayAlert />}
  </SupplierDocContainer>
)
}

export default SupplierDocDetails;