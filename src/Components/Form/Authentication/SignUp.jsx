import React from 'react';
import styles from './Auth.module.css';
import { Button } from 'react-bootstrap';

const SignUp = () => {
  return (
    <div className={styles.signupContainer}>
        <div className={styles.innerContainer}>
        <div className={styles.childpart_header}>
              <p>Create User:-</p>
            </div>

      <div className={styles.signupFields}>
        <div className={styles.fields}>
          <span>Full Name :</span>
          <input type='text' name='' id='' />
        </div>
        <div className={styles.fields}>
          <span>First Name :</span>
          <input type='text' name='' id='' />
        </div>
        <div className={styles.fields}>
          <span>Last Name :</span>
          <input type='text' name='' id='' />
        </div>
        <div className={styles.fields}>
          <span>Password :</span>
          <input type='text' name='' id='' />
        </div>
        <div className={styles.fields}>
          <span>Email :</span>
          <input type='email' name='' id='' />
        </div>
        <div className={styles.fields}>
          <span>Postal Address :</span>
          <textarea name='' id=''></textarea>
        </div>
        <div className={styles.fields}>
          <span>Telephone Number :</span>
          <input type='text' name='' id='' />
        </div>
        <div className={styles.fields}>
          <span>Alternate Phone Number :</span>
          <input type='text' name='' id='' />
        </div>
        <div className={styles.fields}>
          <span>Supplier Category:</span>
          <input type='text' name='' id='' />
        </div>
        <div className={styles.fields}>
          <span>Supplier Name:</span>
          <input type='text' name='' id='' />
        </div>
        <div className={styles.fields}>
          <span>Preferred Language :</span>
          <select className={styles.optionsBtn} id='language-select'>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
            <option value='de'>German</option>
            <option value='it'>Italian</option>
          </select>
        </div>
      </div>
      <div className={styles.submitBtn}>
      <Button >Submit</Button>

      </div>
      </div>
     


    </div>
  );
};

export default SignUp;
