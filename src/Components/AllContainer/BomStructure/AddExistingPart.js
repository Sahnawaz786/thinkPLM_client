import React, { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import BomServices from "../../../services/bom.services";
import { PartsContext } from '../../../store/PartsProvider';
import classes from "./AddExistingPart.module.css";
import message from '../../../utils/message';
import { closeWindow } from '../../../utils/helper';
import HashLoader from 'react-spinners/HashLoader';

const { searchBomPart, addBomPart } = new BomServices();
const AddExistingPart = () => {
  const [partNumber, setPartNumber] = useState('');
  const [searchPartDetails, setSearchPartDetails] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(false);
  const location = useLocation();
  const { bomIds } = useContext(PartsContext);

  const searchPart = async () => {

    const searchPartInfo = await searchBomPart(partNumber);
    console.log("checking:", searchPartInfo)
    const searchData = (searchPartInfo?.data || [])
    console.log('search info data', searchData);
    setSearchPartDetails(searchData)
  }

  useEffect(() => {
    searchPart()
  }, [])
  // id
  console.log("searching........", searchPartDetails)

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     handleSearch();
  //   }

  const handleAddExistingPartsClick = async () => {
    setIsButtonDisabled(true)
    setTimer(true);
    console.log({ searchPartDetails, location: location?.pathname?.split('/').slice(-1).join() });
    const parentId = Number(location?.pathname?.split('/').slice(-1).join());
    const childId = Number(searchPartDetails?.[0]?.id);
    console.log({childId, parentId: bomIds?.childId || parentId});
    const bomIdsLocalStorage = JSON.parse(localStorage.getItem('bomIds'));
    const payload = {
      ida3a5: bomIdsLocalStorage?.childId || bomIds?.childId || parentId, // ====> partsId   (parent)   302
      ida3b5: childId, //  ====> partsMasterId (child)  152
    }
    if ((bomIdsLocalStorage?.childId || bomIds?.childId ) && parentId) {
      await addBomPart(payload);
    } else {
      message('error', 'BOM Parent or Child ID is missing');
    }

     message('success', 'BOM Inserted, please refresh the page to get the latest data')
        setTimeout(() => {
          setTimer(false);
          closeWindow();
     }, 5000);
  };

  return (timer ?  <div className={classes.spinnerContainer}>
    <HashLoader color='#0E6EFD' />
  </div>
 :
    <div className={classes.main_container}>
      <div className={classes.body_container}>
        <div className={classes.first_content_container}>
          <div className={classes.search_paragraph}>
            <p>Search On:</p>
          </div>
          <div className={classes.search_options}>
            <label>All Applicable Types</label>
            <select>
              <option></option>
              <option>2</option>
            </select>
          </div>
        </div>
        <div className={classes.second_content_container}>

          <p>Number:</p>
          <div>
          <input
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            //  onKeyPress={handleKeyPress}
            placeholder="search here..."></input>
          <button onClick={searchPart}>search</button>
          </div>
        </div>

        <div className={classes.lowerBody_container}>
          <div className="overflow-x-auto">
            <table className="table">

              <thead>
                <tr >
                  <th>Number</th>
                  <th>Name</th>
                  <th>End Item</th>
                </tr>
              </thead>
              <tbody>
                {searchPartDetails.map((partdata, i) => {
                  return (
                    <tr className="bg-base-200" key={i}>
                      <td>{partdata?.part_number}</td>
                      <td>{partdata?.part_name}</td>
                      <td>car</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={handleAddExistingPartsClick} className={classes.buttons} disabled={isButtonDisabled}>Ok</button>
      </div>
    </div>
  );
};

export default AddExistingPart;
