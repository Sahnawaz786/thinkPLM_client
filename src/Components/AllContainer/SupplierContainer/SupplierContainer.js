import HomeIcon from '@mui/icons-material/Home';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SupplierServices from '../../../services/supplier.services';
import styles from '../../../style.module.css';
import styleBtn from '../PartContainer/PartContainer.module.css';
import classes from './SupplierContainer.module.css';


const SupplierContainer = ({ children, id,iteration_info }) => {

  const [supplierInformation, setSupplierInformation] = useState([]);
  const [activeBtn,setActiveBtn] = useState('');
  const {pathname} = useLocation();

  const navigate = useNavigate();
  const {getSupplierById}=new SupplierServices()


  const getSupplierApi = async (id) => {

    const partInfo = await getSupplierById(id);
    console.log("supplier container data:", { partInfo })
    const newParts = (partInfo?.data || [])
    setSupplierInformation([newParts]);

  }
  useEffect(() => {
    getSupplierApi(id);
  }, [id])

  useEffect(()=>{
    let url = pathname.split('/')[1];
    setActiveBtn(url);
  })

  console.log(supplierInformation,'/////////////////////')
  // console.log(id)


  const detailsHandler = () => {
    navigate('/supplier-details/'+ id)
  }

  const referenceObjectHandler=()=>{
    navigate('/reference-object/'+id)
  }
  const historyHandler=()=>{
    navigate('/supplier-history/'+id)
  }

  return (
    <>
      <div className={classes.profile_section}>
     
            <div className={classes.container} >
            <p className={classes.container_paragraph}> 
            <div className={styles.logoText} >
              <img
                src='/images/supplier.png'
                alt='logo'
                className={styles.imageIcon}
              />
             {(supplierInformation || [])?.map((sup, index) => {
          return (
            <div className={classes.container} >
              <p className={classes.container_paragraph}> Supplier-{sup?.category},{sup?.name},{iteration_info || sup?.supplier[0]?.iteration_info}</p>
            </div>
          )
        })}
              </div>
              </p>
            </div>
       
        <div>

          <div className={classes.tab_nav}>

            <div className={classes.tab_buttons}>
              <button className={activeBtn === 'supplier-details' || activeBtn==='supplier-historyInfo'? classes.activeBtn:''}  onClick={() => detailsHandler()} >Details</button>
              <button className={activeBtn === 'supplier-history' ? styleBtn.activeBtn : ''} onClick={() => historyHandler()} >History</button>
              <button className={activeBtn === 'reference-object' ? styleBtn.activeBtn : ''} onClick={() => referenceObjectHandler()} >Attachments</button>

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

export default SupplierContainer;