import React, { useContext, useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import styles from '../../../style.module.css';
import DisplayAlert from '../../../utils/DisplayAlert';
import classes from './BomRightBar.module.css';
import { PartsContext } from '../../../store/PartsProvider';

const BomRightBar = () => {
  const { selectedData, initialBomData, setInitialBomData } = useContext(PartsContext);

 const [timer,setTimer] = useState(true);

  useEffect(() => {
    setTimer(true);
    let timeOut = setTimeout(() => {
      setTimer(false);
    }, 1000);
    return(()=>timeOut)
  },[]);


return (
    
  timer ? (
    <div className={styles.spinnerContainer}>
      <HashLoader color='#0E6EFD' />{' '}
    </div>
  ) :

//    <SupplierContainer id={id}>

<>
<div className={classes.rightBar_bomContainer}>
    <div className={classes.detailContainer}>
      <div className={classes.part_details_paragrah}>

          
              <div className={classes.master_part}>
                <div className={classes.masterpart_header}>
                  <p>Part Attributes:-</p>
                </div>
                  <p  >
                    <strong>Number:</strong>{' '}
                    {selectedData?.part_number}
                  </p>

                  <p >
                    <strong>Name:</strong>{' '}
                    {selectedData?.part_name}
                  </p>

                  <p >
                    <strong>Version:</strong>{' '}
                    {selectedData?.iteration_info}
                  </p>
                  <p >
                    <strong>State:</strong>{""}
                    Open
                  </p>
                  <p >
                    <strong>Status:</strong>{' '}
                    Checked In
                  </p>
                  <p >
                    <strong>Modified Date:</strong>{' '}
                    {selectedData?.modifiedDate}
                  </p>
      
              </div>
        

        
      </div>
      <div className={classes.bottomDetails}>
        <>
          <div className={classes.child_part}>
            <div className={classes.childpart_header}>
              <p>Usage Attributes</p>
            </div>
            <p>
              <strong>Quantity:</strong> {selectedData?.email}
            </p>
            <p>
              <strong>Unit:</strong> {selectedData?.contact}
            </p>
            <p>
              <strong>Trace Code:</strong> {selectedData?.start_date}
            </p>
            <p>
              <strong>Line Number:</strong> {selectedData?.end_date}
            </p>
            <p>
              <strong>Find Number:</strong> {selectedData?.state}
            </p>
            <p>
              <strong>Reference Designator:</strong>{selectedData?.district}
            </p>
           
          </div>
        </>
      </div>
    </div>
    {/* {showAlert && <DisplayAlert />} */}
    </div>
    </>

//   </SupplierContainer>
)

}

export default BomRightBar;