import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { categoryContext } from '../../store/CategoryProvider';
import { URL, openNewWindow } from '../../utils/helper';
import spinnerStyle from './../../style.module.css';
import classes from './SupplierPage.module.css';

const SupplierPage = () => {

  const categoryItemsCtx = useContext(categoryContext);
  console.log(categoryItemsCtx)
  const navigate = useNavigate();
  const [timer, setTimer] = useState(true);


  const [selected, setSelected] = useState('');
  const handleChange = (e) => {
    if (e.detail === 0) {
      setSelected(e.target.value)
      const name = e.target.value;
      switch (name) {
        case 'tier1':
          openNewWindow(e, `${URL}/supplier-tier1`);
          setTimeout(() => {
            navigate('/');
          }, 1000)
          break;

        case 'tier2':
          openNewWindow(e, `${URL}/supplier-tier2`);
          setTimeout(() => {
            navigate('/');
          }, 1000)
          break;

        case 'manufacturer':
          openNewWindow(e, `${URL}/supplier-manufacturer`);
          setTimeout(() => {
            navigate('/');
          }, 1000)
          break;
        
        case 'vendor':
          openNewWindow(e, `${URL}/supplier-vendor`);
          setTimeout(() => {
            navigate('/');
          }, 1000)
          break;
          
        default:
          break;
      }
    }

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


  useEffect(() => {
    setTimer(true);
    const timeout = setTimeout(() => {
      setTimer(false);
    }, 1000)
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
            <div className={classes.supplier_label_2}>
              <select
                style={{ width: "9.5rem", borderRadius: "3px", borderStyle: "none", background: "rgba(183, 184, 192, 0.955)", outline: 'none', padding: "3px 4px 4px 3px", fontSize: "small", cursor: "pointer" }}
                onClick={handleChange}>
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
              timer ? <div className={spinnerStyle.spinnerContainer}>
                {' '}
                <HashLoader color='#0E6EFD' />{' '}
              </div>
                : <>
                  {/* {selected === "manufacturer" ? <ManufacturerForm /> : ""}
                {selected === "vendor" ? <VendorForm /> : ""}
                {selected === "tier1" ? <Tier1 /> : ""}
                {selected === "tier2" ? <Tier2 /> : ""} */}
                </>
            }


          </div>
        </div>
      </div>

    </>
  )
}

export default SupplierPage