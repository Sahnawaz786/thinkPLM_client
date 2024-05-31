import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../style.module.css";
import { URL, openNewWindow } from "../../../utils/helper";
const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:8181/getAllRegisterUserWithThink",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      console.log(response, "responses");
    } catch (error) {
      setError(error);
    }
  };
  console.log({ users });
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSignupClick = (e) => {
    openNewWindow(e, `${URL}/sign-up`);
      setTimeout(() => {
        navigate('/user-management');
      }, 1000)
  }

  return (
    <div className={styles.fontStyles}>
      <div className={styles.rightBar}>
        <div className={styles.rightBarLogo}>
          <div title="Parts">
            <img
              src="/images/plus-icon.avif"
              width={35}
              height={35}
              alt="part"
              id={styles.hoverButton}
              className={styles.deleteIcon ? styles.activeBtn : ""}
              onClick={() => {
                // handlePartClick();
              }}
            />
          </div>

          <div title="Document">
            <img
              src="/images/minus2-logo.avif"
              width={35}
              height={35}
              alt=""
              className={styles.deleteIcon ? styles.activeBtn : ""}
              onClick={() => {
                // navigate('/document-table');
              }}
            />
          </div>

          <div title="Create User">
            <img
              src="images/human-logo.jpeg"
              width={30}
              height={30}
              alt=""
              className={styles.deleteIcon}
              onClick={(e) => handleSignupClick(e)}
            />
          </div>
          <div title="Delete">
            <img
              src="https://cdn-icons-png.freepik.com/512/9740/9740598.png"
              width={30}
              height={30}
              alt=""
              className={styles.deleteIcon}
              onClick={() => {
                // setShowAlert(true);
              }}
            />
          </div>

          <div title="Edit">
            <img
              src="https://cdn-icons-png.freepik.com/512/3425/3425921.png"
              width={30}
              height={30}
              alt=""
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
            <th>User Name</th>
            <th>Last Name</th>
            <th>Email</th>
            {/* <th>Postal Address</th> */}
            <th>Telephone Number</th>
            <th>Alternate Phone Number</th>
            <th>Supplier Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((elem, i) => {
            return (
              <>
              <tr key={elem.id}>
                <td>
                  <input
                    className={styles.icon_pointer}
                    // checked={elem.id === selectedId}
                    // onChange={() => handleCheckboxChange(elem.id)}
                    // onClick={() => setId(elem.id)}
                    type='checkbox'
                  />
                </td>

                <td>
                  <img
                    src='/images/supplier.png'
                    alt='part'
                    className={styles.display_supplier_icon}
                  />
                  {elem?.fullName || 'N/A'}
                </td>
                <td>{elem?.username || 'N/A'}</td>

                <td>
                 {elem?.lastName || 'N/A'}
                </td>
                <td> {elem?.email || 'N/A'}</td>

                {/* <td>{elem?.postalAddress || 'N/A'}</td> */}
                <td>{elem?.telephoneNumber || 'N/A'}</td>

                <td>{elem?.alternatePhoneNumber || 'N/A'}</td>

                <td> {elem?.supplierName || 'N/A'}</td> 
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

                {/* </tr> */}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
