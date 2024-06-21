import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import authenticationServices from "../../../services/authentication.services";
import UserServices from "../../../services/user.services";
import { categoryContext } from "../../../store/CategoryProvider";
import spinnerStyle from "../../../style.module.css";
import { closeWindow } from "../../../utils/helper";
import message from "../../../utils/message";
import styles from "./user.module.css";

const { getAllUser, getUSerById, getSelectiveUser, searchByuserName } =
  new UserServices();

const AddUser = () => {
  const categoryItemsCtx = useContext(categoryContext);
  const [selected, setSelected] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [id, setId] = useState();
  const [userData, setUserData] = useState();
  const [search, setSearch] = useState("");
  const [ids, setIds] = useState([]);
  const [timer, setTimer] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };
  const { getUser } = new authenticationServices();

  const handleCheckboxChange = (id) => {
    setSelectedId(id);
  };

  const fetchUsers = async () => {
    const userData = [];
    setUsers(userData?.data || []);
  };

  // const postUserData = (event, index) => {
  //   const { name, value } = event.target;
  //   setUserData((prevData) => {
  //     const updatedParts = [...prevData.parts];
  //     updatedParts[index] = { ...updatedParts[index], [name]: value };
  //     return { ...prevData, parts: updatedParts };
  //   });
  // };

  useEffect(() => {
    fetchUsers();
  }, [userData]);

  console.log("IDS", ids);

  return timer ? (
    <div className={spinnerStyle.spinnerContainer}>
      {" "}
      <HashLoader color="#0E6EFD" />{" "}
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* {userData.map((part, index) => ( */}
        <div>
          <div className={styles.selectSupplier}>
            <strong>Select Supplier Category :</strong>
            <select
              className={styles.selectFormInput}
              name="supplier_category"
              value={selected}
              onChange={(e) => handleChange(e)}
            >
              <option className={styles.partName}> Supplier Category </option>
              {categoryItemsCtx.category.map((item, ind) => {
                return (
                  <option className={styles.partName} key={ind}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={styles.selectSupplier}>
            <strong>Supplier Name :</strong>
            <select
              className={styles.selectFormInput}
              name="supplier_name"
              // value={part.supplier_name}
              onChange={async (e) => {
                console.log("event", e.target.value);
                const userData = await getSelectiveUser(e.target.value);
                setUsers(userData?.data || []);
              }}
            >
              <option>Select Supplier Name</option>

              {selected === "manufacturer"
                ? categoryItemsCtx.manufactureData.map((item, ind) => {
                    return <option key={ind}>{item.name}</option>;
                  })
                : ""}

              {selected === "vendor"
                ? categoryItemsCtx.vendorData.map((item, ind) => {
                    return <option key={ind}>{item.name}</option>;
                  })
                : ""}
              {selected === "tier1"
                ? categoryItemsCtx.tier1Data.map((item, ind) => {
                    return <option key={ind}>{item.name}</option>;
                  })
                : ""}
              {selected === "tier2"
                ? categoryItemsCtx.tier2Data.map((item, ind) => {
                    return <option key={ind}>{item.name}</option>;
                  })
                : ""}
            </select>
          </div>
        </div>
        {/* ))} */}
      </div>

      <div className={styles.selectSupplier}>
        <span>Search : </span>
        <div className={styles.searchContainer}>
          <input
            name="search"
            id="search"
            className={styles.search}
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={async (e) => {
              if (search === "") {
                const userData = await getAllUser();
                setUsers(userData?.data || []);
              } else {
                const userData = await searchByuserName(search);
                setUsers([userData?.data] || []);
              }
            }}
          >
            Search
          </Button>{" "}
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
            <th>Telephone Number</th>
            <th>Supplier Name</th>
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
                      onChange={() => handleCheckboxChange(elem.id)}
                      onClick={() => {
                        setIds([...ids, elem.id]);
                        setId(elem.id);
                      }}
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

                  <td> {elem?.supplierName || "N/A"}</td>
                </tr>

                {/* </tr> */}
              </>
            );
          })}
        </tbody>
      </table>

      <div className={styles.addBtn}>
        <Button
          variant="success"
          onClick={(e) => {
            localStorage.setItem("IDS", [ids]);
            message(
              "success",
              "Users Added Succesfully pls reolad the page to see the latest data"
            );
            setTimer(true);
            setTimeout(() => {
              closeWindow();
            }, 3000);
          }}
        >
          Add User
        </Button>{" "}
      </div>
    </div>
  );
};

export default AddUser;
