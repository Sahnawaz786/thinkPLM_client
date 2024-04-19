import React from 'react';
import styles from '../style.module.css';


const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div>
        <p className={styles.text}>ThinkPLM</p>
      </div>
      <div>
        <p className={styles.text}>login by : Talib Ali</p>
      </div>
    </div>
  );
};

export default Navbar;
