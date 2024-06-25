import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import SupplierServices from "../services/supplier.services";
import styles from "../style.module.css";
import { openNewWindow, URL } from "../utils/helper";

const LeftBar = () => {
  const { getSupplier } = new SupplierServices();
  const { pathname } = useLocation();

  const [data, setData] = useState([]);

  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const [display, setDisplay] = useState(true);

  const handlToggle = (control) => {
    setDisplay(control);
  };

  const handleNavToggle = (elem) => {
    setData((data) =>
      data?.map((item) =>
        item === elem
          ? { ...item, isVisible: !item.isVisible }
          : { ...item, isVisible: "" }
      )
    );
  };

  const handleAPI = async () => {
    const data = await getSupplier();
    const newData = data?.data?.map((elem) => ({ ...elem, isVisible: false }));
    setData(newData.reverse());
    console.log("suppliers", data);
  };

  useEffect(() => {
    handleAPI();
  }, []);

  return (
    <div className={styles.leftbar}>
      {display ? (
        <>
          <div
            className={styles.mainLeftbarContainer}
            // style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className={styles.logoText}>
              <img
                src="/images/supplier.png"
                alt="logo"
                className={styles.imageIcon}
              />
              <span>SUPPLIER</span>
            </div>

            <span onClick={() => handlToggle(false)}>
              <ImCross />
            </span>
          </div>

          <div className={styles.leftbarParent}>
            <div className={styles.logoText} style={{ marginBottom: "10px" }}>
              <img
                src="/images/supplier.png"
                alt="logo"
                className={styles.imageIcon}
              />
              {/* <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={'/create-supplier'}
              >
                Create Supplier ➕
              </Link> */}
              <span
                style={{ cursor: "pointer" }}
                onClick={(e) => openNewWindow(e, `${URL}/create-supplier`)}
              >
                Create Supplier ➕
              </span>
            </div>

            {data?.map((elem, index) => {
              return (
                <div key={index}>
                  <div className={styles.leftbarChild}>
                    <div className={styles.logoText}>
                      <img
                        src="/images/supplier.png"
                        alt="logo"
                        className={styles.imageIcon}
                      />

                      <span
                        title={elem.category}
                        onClick={() => handleNavToggle(elem)}
                      >
                        {elem?.name}
                      </span>
                    </div>
                    {elem?.isVisible ? (
                      <div className={styles.leftbarOptions}>
                        <Link to={`/supplier-details/${elem?.id}`}>
                          Details
                        </Link>
                        <Link to="/contract-details">Part Management</Link>
                        <Link to="/contract-details">Document Management</Link>

                        <Link to={`/user-management`}>User Management</Link>
                        <Link to={"/onboard-status"}>Onboarding status</Link>
                        <Link to="/contract-details">
                          View Contract details
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <span onClick={() => handlToggle(true)}>
          <FaArrowRight />
        </span>
      )}
    </div>
  );
};

export default LeftBar;
