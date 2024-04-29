import React, { useEffect, useState } from "react";
import BomServices from "../../../services/bom.services";
import classes from "./AddExistingPart.module.css";

const AddExistingPart = () => {
  const [partNumber, setPartNumber] = useState('');
 const [searchPartDetails,setSearchPartDetails]=useState([]);
 const {searchBomPart}=new BomServices();


  const searchPart=async ()=>{

    const searchPartInfo = await searchBomPart(partNumber);
    console.log("checking:",searchPartInfo)
    const searchData = (searchPartInfo?.data || [])
    console.log('search info data', searchData);
    setSearchPartDetails(searchData)
  }

  useEffect(()=>{
   searchPart()
  },[])

  console.log("searching........",searchPartDetails)

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     handleSearch();
  //   }

  return (
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
          <input 
           value={partNumber}
           onChange={(e) => setPartNumber(e.target.value)}
          //  onKeyPress={handleKeyPress}
          placeholder="search here..."></input>
          <button onClick={searchPart}>search</button>
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
                {searchPartDetails.map((partdata,i)=>{
                  return( 
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
        <button className={classes.buttons}>Ok</button>
      </div>
    </div>
  );
};

export default AddExistingPart;
