import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authenticationServices from '../services/authentication.services';
import styles from '../style.module.css';


const Navbar = () => {

const {getUser}=new authenticationServices();
 const navigate=useNavigate();
 const [users,setUsers]=useState();

 const fetchUsers = async () => {
  const userData= await getUser();
  setUsers(userData?.data || [])
};
    console.log({ users });
    useEffect(() => {
      fetchUsers();
    
    }, []);

    
    const linkHandler =()=>{
      navigate('/')
      window.location.reload();
   }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/')
    window.location.reload(); 
  };
  return (
    <div className={styles.navbar}>
      <div>
        <p ><Link className={styles.home}  onClick={linkHandler}>ThinkPLM</Link></p>
      </div>
      <div>
        {users?.slice(0, 1)?.map((user)=>{
          return (
            <>
                <p className={styles.text}>login by : {user?.username}</p>
            </>
          )
        })}
       
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
