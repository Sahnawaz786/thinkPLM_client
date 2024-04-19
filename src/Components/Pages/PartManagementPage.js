import { useContext, useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { categoryContext } from '../../store/CategoryProvider';
import CustomParts from '../Form/Parts/CustomParts';
import StandardParts from '../Form/Parts/StandardParts';
import classes from './SupplierPage.module.css';

const PartManagementPage = () => {

  const categoryItemsCtx=useContext(categoryContext);
  console.log(categoryItemsCtx)

  useEffect(()=>{

    const updateUser=()=>{
      categoryItemsCtx.getSupplierManufacturerFunc();
      categoryItemsCtx.getSupplierVendorFunc();
      categoryItemsCtx.getSupplierTier1Func();
      categoryItemsCtx.getSupplierTier2Func();
    }
      
        updateUser();
      },[])
  

  const [selected, setSelected]=useState('');
  const handleChange=(e)=>{
    console.log(e.target.value)
    setSelected(e.target.value)
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
     
    <h3 className={classes.supplierHeading}>Create Parts</h3>
    </div>

    <div className={classes.labelContainer}>
    <div className={classes.supplier_label}>
            <select
              style={{ height: "25px", width: "10.5rem", borderRadius: "5px", borderStyle: "none" }}
              value={selected} onChange={(e) => handleChange(e)}>
              <option>Create part</option>
              {categoryItemsCtx.partCategories.map((item, ind) => {
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
              {selected === "standard parts" ? <StandardParts /> : ""}
              {selected === "custom parts" ? <CustomParts /> : ""}
              
            </>
          }


        </div>
      </div>
    </div>

  </>
  )
}

export default PartManagementPage;