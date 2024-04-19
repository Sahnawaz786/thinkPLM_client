import React from 'react';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import styles from '../style.module.css';
import Navbar from './Navbar';

const Container = () => {
  return (
    <div className='mainContainer'>
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>
      <div className={styles.sidebarSection}>
  
          <LeftBar />
    
          <RightBar />
      </div>
    </div>
  );
};

export default Container;
