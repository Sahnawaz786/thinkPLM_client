import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { UserContext } from "../../../store/UserProvider";
import styles from "../../../style.module.css";
import DisplayAlert from "../../../utils/DisplayAlert";

import UserServices from "../../../services/user.services";
import classes from "../SupplierActions/Supplier.module.css";
import UserContainer from "./UserContainer";

const UserDetails = ({ id }) => {
  const [supplierDetails, setSupplierDetails] = useState([]);
  const { choice, showAlert, setShowAlert } = useContext(UserContext);
  const [timer, setTimer] = useState(true);
  const navigate = useNavigate();

  const { getUSerById } = new UserServices();

  const getSupplierApi = async (id) => {
    const supplierInfo = await getUSerById(id);
    const supData = (supplierInfo?.data.supplier || [])
      .map((elem) => {
        return { ...elem, createdDate: supplierInfo?.data?.createdDate };
      })
      .sort((a, b) => b.id - a.id)?.[0];
    const newSuppliersData = { ...supplierInfo, supplier: [supData || {}] };
    setSupplierDetails([newSuppliersData || {}]);
  };

  useEffect(() => {
    getSupplierApi(id);
    setTimer(true);
    let timeOut = setTimeout(() => {
      setTimer(false);
    }, 1000);
    return () => timeOut;
  }, [id]);

  console.log("******", supplierDetails);
  return timer ? (
    <div className={styles.spinnerContainer}>
      <HashLoader color="#0E6EFD" />{" "}
    </div>
  ) : (
    <UserContainer id={id}>
      {/* <div className={classes.editIcons}>
        <img
          src="https://cdn-icons-png.freepik.com/512/3425/3425921.png"
          width={30}
          height={30}
          alt=""
          // onClick={(e)=> handleEditSupplier(e) }
          className={styles.icon_pointer}
        />
        <img
          src="https://cdn-icons-png.freepik.com/512/9740/9740598.png"
          width={30}
          height={30}
          alt=""
          className={styles.deleteIcon}
          // onClick={(e)=>setShowAlert(true)}
        />
      </div> */}

      <div className={classes.detailContainer}>
        <div className={classes.part_details_paragrah}>
          {supplierDetails.map((supplierMaster, i) => {
            return (
              <>
                {/* <div className={classes.part_container}> */}
                <div className={classes.master_part} key={i}>
                  <div className={classes.masterpart_header}>
                    <p>System:-</p>
                  </div>
                  {/* <div className={classes.systemInfo}> */}
                  <p>
                    <strong>Full Name:</strong> {supplierMaster?.data?.fullName}
                  </p>

                  <p>
                    <strong>last Name:</strong> {supplierMaster?.data?.lastName}
                  </p>

                  <p>
                    <strong>Email:</strong> {supplierMaster?.data?.email}
                  </p>

                  {/* <p >
                    <strong>Postal Address:</strong>{' '}
                    {supplierMaster?.data?.postalAddress}
                  </p>
                  
                  <p >
                    <strong>Telephone Number:</strong>{' '}
                    {supplierMaster?.data?.telephoneNumber}
                  </p>
                  <p >
                    <strong>User Name:</strong>{' '}
                    {supplierMaster?.data?.username}
                  </p> */}
                  {/* </div> */}
                </div>
                {/* </div> */}
              </>
            );
          })}
        </div>
        <div className={classes.bottomDetails}>
          {supplierDetails?.map((childSupplier, i) => {
            console.log("child", childSupplier);
            return (
              <>
                <div className={classes.child_part} key={i}>
                  <div className={classes.childpart_header}>
                    <p>Business:-</p>
                  </div>
                  <p>
                    <strong>Email:</strong> {childSupplier?.data?.email}
                  </p>
                  <p>
                    <strong>Postal Address::</strong>{" "}
                    {childSupplier?.data?.postalAddress}
                  </p>
                  <p>
                    <strong>Telephone Number:</strong>{" "}
                    {childSupplier?.data?.telephoneNumber}
                  </p>
                  <p>
                    <strong>User Name:</strong> {childSupplier?.data?.username}
                  </p>
                </div>
              </>
            );
          })}
          <></>
        </div>
      </div>
      {showAlert && <DisplayAlert />}
    </UserContainer>
  );
};

export default UserDetails;
