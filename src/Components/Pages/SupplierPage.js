import { useContext, useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { categoryContext } from '../../store/CategoryProvider';
import ManufacturerForm from '../Form/Supplier/ManufacturerForm';
import Tier1 from '../Form/Supplier/Tier1';
import Tier2 from '../Form/Supplier/Tier2';
import VendorForm from '../Form/Supplier/VendorForm';
import classes from './SupplierPage.module.css';

const SupplierPage = () => {

  const categoryItemsCtx = useContext(categoryContext);
  console.log(categoryItemsCtx)

  const [selected, setSelected] = useState('');
  const handleChange = (e) => {
    console.log(e.target.value)
    setSelected(e.target.value)
  }

  if (selected === 'manufacturer') {
    localStorage.setItem('manufacturer', selected)
  }
  else {
    localStorage.removeItem('manufacturer')
  }

  if (selected === 'vendor') {
    localStorage.setItem('vendor', selected)
  }
  else {
    localStorage.removeItem('vendor')
  }

  if (selected === 'tier1') {
    localStorage.setItem('tier1', selected)
  }
  else {
    localStorage.removeItem('tier1')
  }

  if (selected === 'tier2') {
    localStorage.setItem('tier2', selected)
  }
  else {
    localStorage.removeItem('tier2')
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
       
      <h3 className={classes.supplierHeading}>Create Supplier</h3>
      </div>

      <div className={classes.labelContainer}>
      <div className={classes.supplier_label}>
              <select
                style={{ height: "25px", width: "10.5rem", borderRadius: "5px", borderStyle: "none" }}
                value={selected} onChange={(e) => handleChange(e)}>
                <option>Create Supplier</option>
                {categoryItemsCtx.category.map((item, ind) => {
                  return (
                    <option key={ind}>{item.value}</option>)
                })}

              </select>
            </div>
      </div>
        </div>
     

        <div className={classes.supplierContainer} >


          <div className={classes.supplier_page}>
           
          </div>
          <div className={classes.components}>

            {
              timer ? <ClipLoader /> : <>
                {selected === "manufacturer" ? <ManufacturerForm /> : ""}
                {selected === "vendor" ? <VendorForm /> : ""}
                {selected === "tier1" ? <Tier1 /> : ""}
                {selected === "tier2" ? <Tier2 /> : ""}
              </>
            }


          </div>
        </div>
      </div>

    </>
  )
}

export default SupplierPage