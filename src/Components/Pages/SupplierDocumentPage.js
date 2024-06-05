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
import { URL, openNewWindow } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

const SupplierDocumentPage = () => {

  let categoryItemsCtx = useContext(categoryContext);
  console.log(categoryItemsCtx)
  const navigate = useNavigate();

  const [selected, setSelected] = useState('');
  const handleChange = (e) => {
    if (e.detail === 0) {
      setSelected(e.target.value)
      const name = e.target.value;
      switch (name) {
        case 'supplier contract':
          openNewWindow(e, `${URL}/supplier-contract`);
          setTimeout(() => {
            navigate('/document-table');
          }, 1000)
          break;

        case 'invoice':
          openNewWindow(e, `${URL}/supplier-invoice`);
          setTimeout(() => {
            navigate('/document-table');
          }, 1000)
          break;

        case 'certificate of insurance':
          openNewWindow(e, `${URL}/supplier-certificate-of-insurance`);
          setTimeout(() => {
            navigate('/document-table');
          }, 1000)
          break;

        case 'compliance certificate':
          openNewWindow(e, `${URL}/supplier-compliance-certificate`);
          setTimeout(() => {
            navigate('/document-table');
          }, 1000)
          break;
        default:
          break;
      }
    }

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
                style={{ width: "9.5rem", borderRadius: "3px", borderStyle: "none", background: "rgba(183, 184, 192, 0.955)", outline: 'none', padding: "3px 4px 4px 3px", fontSize: "small", cursor: "pointer" }}
                onClick={(e) => handleChange(e)}>
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
              {/* {selected === "supplier contract" ? <SupplierContract /> : ""}
              {selected === "invoice" ? <Invoice/>: ""}
              {selected === "certificate of insurance" ? <CertificateOFInsurance/> : ""}
              {selected === "compliance certificate" ? <ComplianceCertificate/> : ""} */}

            </>



          </div>
        </div>
      </div>

    </>
  )
}

export default SupplierDocumentPage;