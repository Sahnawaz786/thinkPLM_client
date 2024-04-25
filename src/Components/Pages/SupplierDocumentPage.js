import { useContext, useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { categoryContext } from '../../store/CategoryProvider';
import CustomParts from '../Form/Parts/CustomParts';
import StandardParts from '../Form/Parts/StandardParts';
import classes from './SupplierPage.module.css';
import HashLoader from 'react-spinners/HashLoader';
import spinnerStyle from '../../style.module.css'
import SupplierContract from '../Form/SupplierDocument/SupplierContract';
import Invoice from '../Form/SupplierDocument/Invoice';
import CertificateOFInsurance from '../Form/SupplierDocument/CertificateOFInsurance';
import ComplianceCertificate from '../Form/SupplierDocument/ComplianceCertificate';

const SupplierDocumentPage = () => {

  const categoryItemsCtx=useContext(categoryContext);
  console.log(categoryItemsCtx)
  

  const [selected, setSelected]=useState('');
  const handleChange=(e)=>{
    console.log(e.target.value)
    setSelected(e.target.value)
  }

  if (selected === 'supplier contract') {
    localStorage.setItem('supplier contract', selected)
  }
  else {
    localStorage.removeItem('supplier contract')
  }

  if (selected === 'invoice') {
    localStorage.setItem('invoice', selected)
  }
  else {
    localStorage.removeItem('invoice')
  }

  if (selected === 'certificate of insurance') {
    localStorage.setItem('certificate of insurance', selected)
  }
  else {
    localStorage.removeItem('certificate of insurance')
  }

  if (selected === 'compliance certificate') {
    localStorage.setItem('compliance certificate', selected)
  }
  else {
    localStorage.removeItem('compliance certificate')
  }
  
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    setTimer(true);
    const timeout = setTimeout(() => {
      setTimer(false);
    }, 500)
    return (() => clearTimeout(timeout));

  }, [selected])
  return (
    <>
    <div className={classes.container}>
      <div className={classes.headerContainer}>
      <div>
     
    <h3 className={classes.supplierHeading}>Create Document</h3>
    </div>

    <div className={classes.labelContainer}>
    <div className={classes.supplier_label}>
            <select
              style={{ height: "25px", width: "10.5rem", borderRadius: "5px", borderStyle: "none" }}
              value={selected} onChange={(e) => handleChange(e)}>
              <option>Create Document </option>
              {categoryItemsCtx.supplierDocument.map((item, ind) => {
                return (
                  <option key={ind}>{item.value}</option>)
              })}

            </select>
          </div>
    </div>
      </div>
   

      <div className={classes.supplierContainer} >

        <div className={classes.components}>

          <>
              {selected === "supplier contract" ? <SupplierContract /> : ""}
              {selected === "invoice" ? <Invoice/>: ""}
              {selected === "certificate of insurance" ? <CertificateOFInsurance/> : ""}
              {selected === "compliance certificate" ? <ComplianceCertificate/> : ""}
              
            </>
          


        </div>
      </div>
    </div>

  </>
  )
}

export default SupplierDocumentPage;