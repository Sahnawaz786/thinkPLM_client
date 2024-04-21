import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SupplierServices from '../../../services/supplier.services';
import styles from '../../../style.module.css';
import classes from './SupplierContainer.module.css';


const SupplierContainer = ({ children, id }) => {

  const [supplierInformation, setSupplierInformation] = useState([]);
  console.log("part-container id", { id })

  const navigate = useNavigate();
  const {getSupplierById}=new SupplierServices()


  const getSupplierApi = async (id) => {

    const partInfo = await getSupplierById(id);
    console.log("part container data:", { partInfo })
    const newParts = (partInfo?.data || [])
    setSupplierInformation(newParts);

  }
  useEffect(() => {
    getSupplierApi(id);
  }, [id])

  console.log(supplierInformation)
  // console.log(id)


  const detailsHandler = () => {
    navigate('/supplier-details/' + id)
  }

  const referenceObjectHandler=()=>{
    navigate('/reference-object/'+id)
  }


  return (
    <>
      <div className={classes.profile_section}>
     
            <div className={classes.container} >
            <p className={classes.container_paragraph}> 
            <div className={styles.logoText} style={{ marginBottom: '10px' }}>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbYXelNvTYzqH7ndMP0MZlMWQPiQJRhPFft33kyoiCGg&s'
                alt='logo'
                className={styles.imageIcon}
              />
              Supplier-{supplierInformation?.name},{supplierInformation?.category}
              </div>
              </p>
            </div>
       
        <div>

          <div className={classes.tab_nav}>

            <div className={classes.tab_buttons}>
              <button onClick={() => detailsHandler()} >Details</button>
              <button onClick={() => referenceObjectHandler()} >Reference Object</button>
            
            </div>

            <div className={classes.linkarea}>
              <Link className={classes.link} to='/part-table' style={{ width: "50px", border: "2px solid black", padding: "5px", backgroundColor: "lightgrey", color: "darkblue", borderStyle: "none" }}>Go to Action Page</Link>
            </div>

          </div>

          {children}
        </div>
      </div>


    </>
  )
}

export default SupplierContainer;