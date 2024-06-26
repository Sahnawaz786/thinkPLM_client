import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authenticationServices from "../../../services/authentication.services";
import UserServices from "../../../services/user.services";
import { UserContext } from "../../../store/UserProvider";
import styles from "../../../style.module.css";
import DisplayAlert from "../../../utils/DisplayAlert";
import { URL, openNewWindow } from "../../../utils/helper";

const { getUserByMultipleIds,getUSerById,getAllUser } = new UserServices();

const UserManagement = () => {
  const navigate = useNavigate();
  const { choice, showAlert, setShowAlert } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [id, setId] = useState();
  const { getUser, deleteUser } = new authenticationServices();

  let ids = localStorage?.getItem("IDS")?.split(",");
  let urls="";
  console.log("IDS HELLO", ids);
  ids?.forEach((elem)=>{
    urls+=`id=${elem}&`
  })

  console.log('URLS',urls);

  const fetchUsers = async () => {
    if(urls!==""){
      const userData = await getUSerById(urls?.slice(0,urls.length-1));
      setUsers(userData?.data || []);
    }else{
      const userData = await getAllUser();
       setUsers(userData?.data || []);
    }
  };


  
  console.log({ users });
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedId(id);
  };

  const handleSignupClick = (e) => {
    openNewWindow(e, `${URL}/sign-up`);
    setTimeout(() => {
      navigate("/user-management");
    }, 1000);
  };

  const handlePartEditBtn = async () => {
    navigate(`/edit-user/${id}`);
  };

  const handleDeleteBtn = async () => {
    if (choice) {
      console.log("choice is:", choice);
      await deleteUser(id);
      window.location.reload();
    }
  };
  useEffect(() => {
    handleDeleteBtn();
  }, [choice]);
  return (
    <div className={styles.fontStyles}>
      <div className={styles.rightBar}>
        <div className={styles.rightBarLogo}>
          <div title="Add User">
            <img
              src="/images/plus-icon.avif"
              width={20}
              height={20}
              alt="part"
              id={styles.hoverButton}
              className={styles.deleteIcon ? styles.activeBtn : ""}
              onClick={(e) => {
                openNewWindow(e, `${URL}/add-users`);
              }}
            />
          </div>

          <div title="Document">
            <img
              src="/images/minus2-logo.avif"
              width={20}
              height={20}
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
              alt=""
              className={styles.deleteIcon}
              onClick={(e) => handleSignupClick(e)}
            />
          </div>
          <div title="Delete">
            <img
              src="https://cdn-icons-png.freepik.com/512/9740/9740598.png"
              alt=""
              className={styles.deleteIcon}
              onClick={() => {
                setShowAlert(true);
              }}
            />
          </div>

          <div title="Edit">
            <img
              src="https://cdn-icons-png.freepik.com/512/3425/3425921.png"
              alt=""
              className={styles.deleteIcon}
              onClick={(e) => {
                openNewWindow(e, `${URL}/edit-user/${id}`);
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
                      className={styles.icon_pointer && styles.checkbox}
                      checked={elem.id === selectedId}
                      onChange={() => handleCheckboxChange(elem.id)}
                      onClick={() => setId(elem.id)}
                      type="checkbox"
                    />
                  </td>

                  <td>
                    <img
                      src="images/human-logo.jpeg"
                      alt="part"
                      className={styles.display_supplier_icon}
                    />
                    {elem?.fullName || "N/A"}
                  </td>
                  <td>{elem?.username || "N/A"}</td>

                  <td>{elem?.lastName || "N/A"}</td>
                  <td> {elem?.email || "N/A"}</td>

                  {/* <td>{elem?.postalAddress || 'N/A'}</td> */}
                  <td>{elem?.telephoneNumber || "N/A"}</td>

                  <td>{elem?.alternatePhoneNumber || "N/A"}</td>

                  <td> {elem?.supplierName || "N/A"}</td>
                  <td>
                    <img
                      className={styles.icon_pointer}
                      src="https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid"
                      width={15}
                      height={15}
                      onClick={() => {
                        navigate(`/user-details/${elem.id}`);
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
      {showAlert && <DisplayAlert />}
    </div>
  );
};

export default UserManagement;
