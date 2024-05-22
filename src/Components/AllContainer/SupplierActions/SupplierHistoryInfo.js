import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import SupplierServices from "../../../services/supplier.services";
import styles from '../../../style.module.css';
import SupplierContainer from "../SupplierContainer/SupplierContainer";
import classes from './Supplier.module.css';


const SupplierHistoryInfo = ({ pid, id }) => {
  const [supplierInformation, setSupplierInformation] = useState([]);
  const [timer,setTimer] = useState(true)
  const { getSupplierById} = new SupplierServices();
  const navigate = useNavigate();

  const getSupplierApi = async (id) => {
    
    const { data } = await getSupplierById(pid);

    console.log("PARTHISTORYID", [data])

    data.supplier = data.supplier.filter((elem) => elem.id == id)

    setSupplierInformation([data])

  };

  useEffect(()=>{
    getSupplierApi(id)
  },[id])

  useEffect(()=>{
    setTimeout(()=>{
       setTimer(false)
    },1000)
  })

    return (
      timer ? <div className={styles.spinnerContainer}>
      {' '}
      <HashLoader color='#0E6EFD' />{' '}
    </div> :
        <SupplierContainer id={pid} iteration_info={supplierInformation[0]?.supplier[0]?.iteration_info}>
          <div className={classes.detailContainer}>
  
          <div className={classes.profile_section}>
            <div className={classes.part_details_paragrah}>
             
                
  
                {supplierInformation.map((sup, i) => {
                  console.log(sup);
                  return (
                    <>
                      <div key={i} className={classes.part_container}>
                        <div className={classes.master_part}>
                          <div className={classes.masterpart_header}>
                            <p>System:-</p>
                          </div>
                          <p>
                            <strong>Supplier Name:</strong> {sup?.name}
                          </p>
                          <p>
                            <strong>Category:</strong> {sup?.category}
                          </p>
                          <p>
                            <strong>Created Date:</strong> {sup?.createdDate}
                          </p>
                          <p>
                            <strong>Modified Date:</strong> {sup?.modifiedDate}
                          </p>
  
                          <p>
                            <strong>Description:</strong> {sup?.description}
                          </p>
  
                          
                        </div>
                        
                      </div>
  
                    </>
                  );
                })}
           
  
            </div>
  
          </div>
  
          <div className={classes.bottomDetails}>
          {supplierInformation[0]?.supplier?.map((childSup, i) => {
                        return (
                          <>
                            <div key={i} className={classes.child_part}>
                              <div className={classes.childpart_header}>
                                <p>Business:-</p>
                              </div>
                              <p>
                                <strong>email:</strong>{' '}
                                {childSup.email}
                              </p>
                              <p>
                                <strong>Start Date:</strong> {childSup.start_date}
                              </p>
                              <p>
                                <strong>End Date:</strong> {childSup.end_date}
                              </p>
                              <p>
                                <strong>State:</strong> {childSup.state}
                              </p>
                              <p>
                                <strong>District:</strong> {childSup.district}
                              </p>
                              <p>
                                <strong>Country:</strong> {childSup.country}
                              </p>
                              <p>
                                <strong>Location:</strong> {childSup.location}
                              </p>
                             
                            </div>
                          </>
                        );
                      })}
          </div>
  
           
  
          </div>
        </SupplierContainer>
    )
  }
  
  export default SupplierHistoryInfo;