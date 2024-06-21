import axios from "axios";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { categoryContext } from "../../../store/CategoryProvider";
import { closeWindow } from "../../../utils/helper";
import message from "../../../utils/message";
import styles from "./Auth.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const categoryItemsCtx = useContext(categoryContext);
  const [selected, setSelected] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    lastName: "",
    password: "",
    email: "",
    postalAddress: "",
    telephoneNumber: "",
    alternatePhoneNumber: "",
    supplierName: "",
    enabled: true,
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

  const postUser = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log("selected:", selected);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true)
    setTimer(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8181/registerUserWithThink",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log({ test: response });
      if (response.status === 200) {
        setFormData({
          fullName: "",
          username: "",
          lastName: "",
          password: "",
          email: "",
          postalAddress: "",
          telephoneNumber: "",
          alternatePhoneNumber: "",
          supplierName: "",
          enabled: true,
        });
        setTimer(true);
        message(
          "success",
          "User Created, please refresh the page to get the latest User"
        );
        setTimeout(() => {
          setTimer(false);
          closeWindow();
        }, 3000);
      }
    } catch (error) {
      console.error({ error });
      message(
        "error",
        error?.response?.data?.message?.slice(0, 60) || "Something went wrong"
      );
      setTimer(false);
    }
    finally{
      setIsButtonDisabled(false)
    }
  };
  return timer ? (
    <div className={styles.spinnerContainer}>
      <HashLoader color="#0E6EFD" />{" "}
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
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => postUser(e)}
            />
          </div>
          <div className={styles.fields}>
            <span>User Name :</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => postUser(e)}
            />
          </div>

          <div className={styles.fields}>
            <span>Last Name :</span>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => postUser(e)}
            />
          </div>
          <div className={styles.fields}>
            <span>Password :</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => postUser(e)}
            />
          </div>
          <div className={styles.fields}>
            <span>Email :</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => postUser(e)}
            />
          </div>
          <div className={styles.fields}>
            <span>Postal Address :</span>
            <textarea
              name="postalAddress"
              value={formData.postalAddress}
              onChange={(e) => postUser(e)}
            ></textarea>
          </div>
          <div className={styles.fields}>
            <span>Telephone Number :</span>
            <input
              type="number"
              name="telephoneNumber"
              value={formData.telephoneNumber}
              onChange={(e) => postUser(e)}
            />
          </div>
          <div className={styles.fields}>
            <span>Alternate Phone Number :</span>
            <input
              type="number"
              name="alternatePhoneNumber"
              value={formData.alternatePhoneNumber}
              onChange={(e) => postUser(e)}
            />
          </div>
          <div className={styles.fields}>
            <span>Supplier Category:</span>
            <select
              name="supplier_category"
              value={selected}
              onChange={(e) => handleChange(e)}
            >
              <option className={styles.partName}> Supplier Category </option>
              {categoryItemsCtx.category.map((item, ind) => {
                return <option key={ind}>{item.value}</option>;
              })}
            </select>
          </div>
          <div className={styles.fields}>
            <span>Supplier Name:</span>
            <select
              className={styles.selectFormInput}
              name="supplierName"
              value={formData.supplierName}
              onChange={(e) => postUser(e)}
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
          <div className={styles.submitBtn} >
          {/* <Button onClick={() => navigate(-1)} >Go Back</Button> */}
          <Button onClick={handleSubmit} disabled={isButtonDisabled} >Submit</Button>
          </div>

          {/* <div className={styles.fields}>
          <span>Preferred Language :</span>
          <select className={styles.optionsBtn} name='' onChange={(e) => postUser(e)}>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
            <option value='de'>German</option>
            <option value='it'>Italian</option>
          </select>
        </div> */}
        </div>
        
      </div>
    </div>
  );
};

export default SignUp;
