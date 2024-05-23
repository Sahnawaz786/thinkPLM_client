import React from 'react';
import styles from './Auth.module.css'

const ControlPage = () => {
  return (
    <div className={styles.container}>
    <div className={styles.topBar}>
       <div className={styles.topBar1}>
       <h2> <span style={{color:'#8BD556',fontSize:'19px'}}>Think</span><span style={{color:'#C252BC',fontSize:'19px'}}>PLM</span></h2>
       <button>Logout</button>
       </div>
       <div className={styles.topBar2}>
         <h5>Supplier Management</h5>
       </div>
    </div>

    <div className={styles.controller}>
        <div className={styles.leftbar}>
              <span>Supplier Management</span>
              <span>User Management</span>
              <span>Purchase</span>
              <span>Sales</span>
              <span>Inventory</span>
        </div>

        <div className={styles.rightbar}>
              <span>Supplier Management is used to keep the track of Parts,Assembly,Documents and Supplier Information</span>
              <span>User Management is used to manage all the users in the system create user,modify users details etc</span>
              <span>Purchase is used to keep track of purchase details of any parts</span>
              <span>Sales is used to keep the track of all the sales of the parts</span>
              <span>Inventory is used to manage the stock of the parts and assembly</span>
        </div>
    </div>
   
  </div>
  )
}


export default ControlPage