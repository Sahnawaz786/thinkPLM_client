import React from 'react';
import styles from '../../../style.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const UserManagement = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.fontStyles}>
      <div className={styles.rightBar}>
        <div className={styles.rightBarLogo}>
          <div title='Parts'>
          
                <img
                  src='/images/plus-icon.avif'
                  width={35}
                  height={35}
                  alt='part'
                  id={styles.hoverButton}
                  className={styles.deleteIcon ? styles.activeBtn : ''}
                  onClick={() => {
                    // handlePartClick();
                  }}
                />
             
          </div>

          <div title='Document'>
           
                <img
                  src='/images/minus2-logo.avif'
                  width={35}
                  height={35}
                  alt=''
                  className={styles.deleteIcon ? styles.activeBtn : ''}
                  onClick={() => {
                    // navigate('/document-table');
                  }}
                />
              
          </div>

          <div title='Create User'>
            <img
              src='images/human-logo.jpeg'
              width={30}
              height={30}
              alt=''
              className={styles.deleteIcon}
             onClick={()=>navigate('/sign-up')}
            />
            
          </div>
          <div title='Delete'>
            <img
              src='https://cdn-icons-png.freepik.com/512/9740/9740598.png'
              width={30}
              height={30}
              alt=''
              className={styles.deleteIcon}
              onClick={() => {
                // setShowAlert(true);
              }}
            />
          </div>

          <div title='Edit'>
            <img
              src='https://cdn-icons-png.freepik.com/512/3425/3425921.png'
              width={30}
              height={30}
              alt=''
              className={styles.deleteIcon}
              onClick={() => {
                // handlePartEditBtn();
              }}
            />
          </div>
        </div>
      </div>
      <table>
          <thead>
            <tr>
              <th></th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Postal Address</th>
              <th>Phone Number</th>
              <th>Alternate Number</th>
              <th>Supplier Category</th>
              <th>Supplier Name</th>
              <th>Language</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>
                  <input
                    className={styles.icon_pointer}
                    type='checkbox'
                  />
                </td>

                <td>
                  <img
                    src='/images/human-logo.jpeg'
                    alt='part'
                    className={styles.display_supplier_icon}
                  />
                  hello
                </td>

                <td>John</td>

                <td>
                   hello
                </td>
                <td> hello</td>

                <td className={styles.open}>Open </td>

                <td>A</td>

                <td> hello</td>

                <td> hello</td>


                <td>
                  <img
                    className={styles.icon_pointer}
                    src='https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid'
                    width={20}
                    height={20}
                    onClick={() => {
                    //   handlePartDetails(elem.id);
                    }}
                  />
                </td>
              </tr>
          </tbody>
        </table>
    </div>
  );
};

export default UserManagement;
