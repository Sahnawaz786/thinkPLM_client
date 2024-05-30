import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../style.module.css';


const Navbar = () => {
 const navigate=useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
    window.location.reload();
   

  };
  return (
    <div className={styles.navbar}>
      <div>
        <p ><Link className={styles.home} to='/'>ThinkPLM</Link></p>
      </div>
      <div>
        <p className={styles.text}>login by : Talib Ali</p>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
