import React, { useContext, useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import SupplierServices from '../../../services/supplier.services';
import ComplianceServices from '../../../services/compliance.services';
import { UserContext } from '../../../store/UserProvider';
import DisplayAlert from '../../../utils/DisplayAlert';
import SupplierDocContainer from '../SupplierDocumentContainer/SupplierDocContainer';
import styles from '../../../style.module.css';
import classes from '../SupplierActions/Supplier.module.css';
import { useNavigate } from 'react-router-dom';
import ComplianceCertificate from '../SupplierDocumentContainer/ComplianceCertificate';

const { deleteComplianceDocumentById } =new ComplianceServices();

const ComplianceDocDetails = ({ id }) => {

 const[supplierDetails,setSupplierDetails]=useState([]);
const {choice,showAlert,setShowAlert}=useContext(UserContext);
 const [timer,setTimer] = useState(true);
const  [docsupplier,setDocSupplier] = useState([]);

 const navigate=useNavigate()

const {getComplianceDocumentById,getAllDocuments,deleteDocument}=new ComplianceServices();

  const getSupplierApi = async (id) => {
    const partInfo = await getComplianceDocumentById(id);
    console.log("PARTINFO",partInfo);
    console.log('part info data', { partInfo });
    const newParts = (partInfo?.data?.docs || [])
      .map((elem) => {
        return { ...elem, createdDate: partInfo?.data?.createdDate };
      })
      .sort((a, b) => b.id - a.id)?.[0];

    

    let obj = partInfo?.data?.docs;


   let mainOBJ =  obj.map((elem)=>{
      return {...elem}
    }).sort((a,b)=>b.id-a.id)?.[0];

    setDocSupplier([mainOBJ]);

    console.log('OBJ',mainOBJ);

    console.log('NEWPARTS',newParts);
    const newPartsData = { ...partInfo, docs: [newParts || {}] };
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
      const supplierInfo = await deleteComplianceDocumentById(id);
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
  ) : <ComplianceCertificate id={id} document_type={supplierDetails?.data?.documenttype} iteration_info={supplierDetails?.data?.docs[0]?.iteration_info}>

    <div className={classes.editIcons}>
    <img
        src='https://cdn-icons-png.freepik.com/512/3425/3425921.png'
        width={30}
        height={30}
        alt=''
        onClick={()=>navigate(`/compliance-document-edit/${id}`)}

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
                    {supplierDetails?.data?.document_description}
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
              <strong>Certification Number:</strong> {childParts?.certification_number}
            </p>
            <p>
              <strong>Certification Date:</strong> {childParts?.certification_date}
            </p>
            <p>
              <strong>Expiration Date:</strong> {childParts?.expiration_date}
            </p>
          </div>
      )})}
      
      </div>
    </div>
    {showAlert && <DisplayAlert />}
  </ComplianceCertificate>
)
}

export default ComplianceDocDetails;