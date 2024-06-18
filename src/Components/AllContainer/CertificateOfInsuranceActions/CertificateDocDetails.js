import React, { useContext, useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import SupplierServices from '../../../services/supplier.services';
import { UserContext } from '../../../store/UserProvider';
import DisplayAlert from '../../../utils/DisplayAlert';
import CertificateServices from '../../../services/certificate.services';
import SupplierDocContainer from '../SupplierDocumentContainer/SupplierDocContainer';
import styles from '../../../style.module.css';
import classes from '../SupplierActions/Supplier.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import CertificateDocContainer from '../SupplierDocumentContainer/CertificateDocContainer';
import { URL, openNewWindow } from '../../../utils/helper';


const CertificateDocDetails = ({ id }) => {

 const[supplierDetails,setSupplierDetails]=useState([]);
const {choice,showAlert,setShowAlert}=useContext(UserContext);
 const [timer,setTimer] = useState(true);
const  [docsupplier,setDocSupplier] = useState([]);

 const navigate=useNavigate()
 const location = useLocation();

const {getCertificateDocumentById,deleteCertificateDocumentById}=new CertificateServices();

  const getSupplierApi = async (id) => {
    const partInfo = await getCertificateDocumentById(id);
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
      const supplierInfo = await deleteCertificateDocumentById(id);
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
  ) : <CertificateDocContainer id={id} document_type={supplierDetails?.data?.documenttype} iteration_info={supplierDetails?.data?.docs[0]?.iteration_info}>

    <div className={classes.editIcons}>
    <img
        src='https://cdn-icons-png.freepik.com/512/3425/3425921.png'
        width={30}
        height={30}
        alt=''
        onClick={(e) => {
          openNewWindow(e, `${URL}/certificate-document-edit/${id}`);
          setTimeout(() => {
            navigate(location?.pathname);
          }, 1000);
        }
        }

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
              <strong>Insurance Company:</strong> {childParts?.insurance_company}
            </p>
            <p>
              <strong>Insurance Party:</strong> {childParts?.insured_party}
            </p>
            <p>
              <strong>Policy Number:</strong> {childParts?.policy_number}
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
  </CertificateDocContainer>
)
}

export default CertificateDocDetails;