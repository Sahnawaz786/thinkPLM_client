import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import spinnerStyle from '../../../style.module.css';
import message from '../../../utils/message';
import classes from '../../AllContainer/PartsAction/PartDetails.module.css';
import styles from './../Parts/PartAttribut.module.css';
import { closeWindow } from '../../../utils/helper';

const Tier2 = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(
    new Date().toJSON().slice(0, 10)
  );
  let supplier_type = localStorage.getItem('manufacturer');
  const [timer, setTimer] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [userData, setUserData] = useState({
    category: supplier_type,
    name: '',
    description:'',
    createdDate:currentDate,
    modifiedDate:currentDate,
    supplier:[{
      email: '',
      contact: '',
      pt: '',
      createdDate:currentDate,
      modifiedDate:currentDate,
      iteration_info: 1,
      islatest_Iteration: 1,
      country: '',
      state: '',
      district: '',
      location: '',
      start_date: '',
      end_date: '',
      document: [{}],
    }]
    
  });

  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("filesssss",file)
    const reader = new FileReader();
   
    reader.onloadend = () => {

      setUserData(prevState => ({
        ...prevState,
        supplier: prevState.supplier.map(suppliers => ({
          ...suppliers,document:[{fileName:file.name,fileType:file.type,document:reader.result}]
         
        }))
      }));
      }

    // Read the file as a Data URL (Base64)
    if (file) {
      reader.readAsDataURL(file);
    }
  
  };
  const postUser = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUserData({ ...userData, [name]: value });
    console.log(userData);
  };

  let name, value;
  const postUserData = (event,index) => {
    const { name, value } = event.target;
    setUserData((prevData) => {
      const updatedSupplier = [...prevData.supplier];
      updatedSupplier[index] = { ...updatedSupplier[index], [name]: value };
      return { ...prevData, supplier: updatedSupplier };
    });
  };

  const submitHandler = async (event) => {

    event.preventDefault();
    setIsButtonDisabled(true);
    const {
      category,
      name,
      description,
      createdDate,
      modifiedDate,
      supplier:[{
        email,
        contact,
        pt,
        iteration_info,
        islatest_Iteration,
        country,
        state,
        district,
        location,
        start_date,
        end_date,
        document,
      }]
    } = userData;

    try {
      // `http://localhost:8181/addsuppliers`
      //https://kkh-mech-default-rtdb.firebaseio.com/manufacturer.json
      const res = await fetch(`http://localhost:8181/KKHSupplierMasterObject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          name,
          description,
          createdDate,
          modifiedDate,
          supplier:[{
            email,
            contact,
            pt,
            createdDate,
            modifiedDate,
            iteration_info,
            islatest_Iteration,
            country,
            state,
            district,
            location,
            start_date,
            end_date,
            document,
          }]
        }),
      });
      if (res.ok) {
        setUserData({
          category:'',
          name: '',
          description:'',
          createdDate:'',
          modifiedDate:'',
          supplier:[{
            email: '',
            contact: '',
            pt: '',
            country: '',
            state: '',
            district: '',
            location: '',
            start_date: '',
            end_date: '',
            document:[],
          }]
        });
        setTimer(true);
        message('success', 'Tier2 Supplier Created, please refresh the page to get the latest data')
        setTimeout(() => {
          setTimer(false);
          closeWindow();
        }, 5000);
      }
      else{
        const data=await res.json();
        console.log("...........",data.message)
        message('error',data.message)
       }
      
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsButtonDisabled(false)
    }
  };
   console.log("userData",userData)
  return (
    timer ?  <div className={spinnerStyle.spinnerContainer}>
    {' '}
    <HashLoader color='#0E6EFD' />{' '}
  </div>
 :
    <div>
     
      <div className={styles.parentContainer}>
        <div className={styles.childContainer}>
          <div className={styles.systemAttribute}>
            <div className={classes.part_container}>
              <div className={styles.master_part}>
                <div className={styles.masterpart_header}>
                  <p>System Attribute:-</p>
                </div>
                <div className={styles.formContainer}>

                <div className={styles.formInput}>
                    <strong>Supplier Category:</strong>
                    <input
                      type='text'
                      name='category'
                      className={styles.partName}
                      value={userData.category}
                      onChange={(e) => postUser(e)}
                    />
                  </div>

                  <div className={styles.formInput}>
                    <strong>Tier2 Name:</strong>
                    <input
                      type='text'
                      name='name'
                      value={userData.name}
                      onChange={(e) => postUser(e)}
                      className={styles.partName}
                    />
                  </div>

                  <div className={styles.formInput}>
                    <strong>Description:</strong>
                    <input
                      type='text'
                      name='description'
                      value={userData.description}
                      onChange={(e) => postUser(e)}
                      className={styles.partName}
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className={styles.bussinessAttribute}>
            <div className={classes.part_container}>
              <div className={styles.master_part}>
                <div className={styles.masterpart_header}>
                  <p>Bussiness Attribute:-</p>
                </div>

                <div className={styles.formContainer}>
                  {userData.supplier.map((supplierData,index)=>(
                    <>
                     <div className={styles.formInput}>
                    <strong htmlFor='text'>Product Type</strong>
                    <input
                      type='text'
                      id='pt'
                      className={styles.partName}
                      name='pt'
                      value={supplierData.pt}
                      onChange={(event) => postUserData(event, index)}
                    />
                  </div>

                  <div className={styles.formInput}>
                    <strong htmlFor='text'>Email ID:</strong>
                    <input
                      type='text'
                      id='email'
                      name='email'
                      className={styles.partName}
                      value={supplierData.email}
                      onChange={(event) => postUserData(event, index)}
                    />
                  </div>

                  <div className={styles.formInput}>
              <strong htmlFor='text'>Contact No:</strong>
              <input type='number' id='contact' name="contact" value={supplierData.contact} onChange={(event) => postUserData(event, index)} />
            </div>

            <div className={styles.formInput}>
              <strong>Country:</strong>
              <select
                className={styles.partName}
                name="country" value={supplierData.country} onChange={(event) => postUserData(event, index)}>
                <option value="">Select Country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Åland Islands">Åland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">Cote D'ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">French Southern Territories</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                <option value="Moldova, Republic of">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">Virgin Islands, British</option>
                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>


            <div className={styles.formInput}>
              <strong>State:</strong>
              <select
                className={styles.partName}
                name="state" value={supplierData.state} onChange={(event) => postUserData(event, index)}>
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chattisgarh">Chhattisgarh</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu & Kashmir">Jammu and Kashmir</option>
                <option value="Goa">Goa</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnatka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="Uttar pradesh">Uttar Pradesh</option>
                <option value="West bengal">West Bengal</option>
                <option value="Andaman and Nicobar">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
              </select>
            </div>

            <div className={styles.formInput}>
              <strong htmlFor='text'>District:</strong>
              <input type='text' className={styles.partName} id='district' name="district" value={supplierData.district} onChange={(event) => postUserData(event, index)} />
            </div>

            <div className={styles.formInput}>
              <strong htmlFor='text'>Location/Address:</strong>
              <input type='text' className={styles.partName} id='location' name="location" value={supplierData.location} onChange={(event) => postUserData(event, index)} />
            </div>

            <div className={styles.formInput}>
              <strong htmlFor='text'>Contract Start Date:</strong>
              <input type='date' className={styles.partName} id='sdate' name="start_date" value={supplierData.start_date} onChange={(event) => postUserData(event, index)} />
            </div>
            <div className={styles.formInput}>
              <strong htmlFor='text'>Contract End Date:</strong>
              <input type='date' className={styles.partName} id='location' name="end_date" value={supplierData.end_date} onChange={(event) => postUserData(event, index)} />
            </div>
            <div className={styles.formInput}>
              <strong htmlFor='document'>Upload Contract Document:</strong>
              <input type='file' className={styles.partName}  id='document' name="document" onChange={handleFileUpload} />
            </div>


                    </>
                  ))}
               
               </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
              <Button variant='primary' onClick={(e) => submitHandler(e)} disabled={isButtonDisabled}>
                Submit
              </Button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tier2;
