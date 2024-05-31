import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from './Auth.module.css';
import message from '../../../utils/message';
import { closeWindow } from '../../../utils/helper';
import HashLoader from 'react-spinners/HashLoader';

const SignUp = () => {
  const [formData, setFormData] = useState({
    key1: '',
    key2: '',
  });
  const [timer, setTimer] = useState(false);

  const handleSignupClick = () => {
    setTimer(true);
    message(
      'success',
      'User Created, please refresh the page to get the latest User'
    );
    setTimeout(() => {
      setTimer(false);
      closeWindow();
    }, 5000);
  };

  return timer ? (
    <div className={styles.spinnerContainer}>
      <HashLoader color='#0E6EFD' />
    </div>
  ) : (
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
          <Button onClick={(e) => handleSignupClick(e)}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
