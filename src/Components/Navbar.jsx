import React from 'react';
import styles from '../style.module.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div>
        <p ><Link className={styles.home} to='/'>ThinkPLM</Link></p>
      </div>
      <div>
        <p className={styles.text}>login by : Talib Ali</p>
      </div>
    </div>
  );
};

export default Navbar;
