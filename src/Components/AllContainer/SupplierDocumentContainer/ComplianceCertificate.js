import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../../style.module.css';
import classes from './SupplierDoc.module.css';
import { useLocation } from 'react-router-dom';
import styleBtn from '../PartContainer/PartContainer.module.css';
import HomeIcon from '@mui/icons-material/Home';
import ComplianceServices from '../../../services/compliance.services';


const ComplianceCertificate = ({ children, id,iteration_info }) => {

  const [supplierInformation, setSupplierInformation] = useState([]);
  const [activeBtn,setActiveBtn] = useState('');
  const {pathname} = useLocation();

  const navigate = useNavigate();
  const {getComplianceDocumentById}=new ComplianceServices()


  const getSupplierApi = async (id) => {

    const partInfo = await getComplianceDocumentById(id);
    console.log("document container data:",  partInfo.data )
    const newParts = (partInfo?.data || {})
    setSupplierInformation(newParts);
    console.log({'info':supplierInformation});

  }
  useEffect(() => {
    getSupplierApi(id);
  }, [id])

  useEffect(()=>{
    let url = pathname.split('/')[1];
    setActiveBtn(url);
  })

  console.log(supplierInformation)
  console.log("ACTIVEBTN",activeBtn);


  const detailsHandler = () => {
    navigate('/compliance-documents-details/' + id)
  }

  const referenceObjectHandler=()=>{
    navigate('/compliance-document-history/'+id)
  }

  const handleAttachments=()=>{
    navigate('/compliance-attachment/'+id);
  }


  return (
    <>
      <div className={classes.profile_section}>
     
            <div className={classes.container} >
            <p className={classes.container_paragraph}> 
            <div className={styles.logoText} style={{ marginBottom: '10px' }}>
              <img
                src='/images/document.png'
                alt='logo'
                className={styles.imageIcon}
              />
              Document-{supplierInformation?.document_name},{iteration_info || id}
              </div>
              </p>
            </div>
       
        <div>

          <div className={classes.tab_nav}>

            <div className={classes.tab_buttons}>
              <button className={activeBtn == 'compliance-documents-details' || activeBtn=='compliance-document-historyInfo' ? styleBtn.activeBtn : ''}  onClick={() => detailsHandler()} >Details</button>
              <button className={activeBtn == 'compliance-document-history' ? styleBtn.activeBtn : ''} onClick={() => referenceObjectHandler()} >History</button>
              <button className={activeBtn == 'compliance-attachment' ? styleBtn.activeBtn : ''} onClick={() => handleAttachments()} >Attachments</button>
            
            </div>

            <div className={classes.linkarea}>
              <Link className={classes.link} to='/part-table' style={{ width: "50px", border: "2px solid black", padding: "5px", backgroundColor: "lightgrey", color: "darkblue", borderStyle: "none" }}> <HomeIcon/> </Link>
            </div>

          </div>

          {children}
        </div>
      </div>
    </>
  )
}

export default ComplianceCertificate;