import SettingsIcon from '@mui/icons-material/Settings';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PartServices from '../../services/parts.services';
import classes from './PartContainer.module.css';


const PartContainer = ({ children, id }) => {

  const [partInformation, setPartInformation] = useState([]);
  const [selectedButton, setSelectedButton] = useState('button1');
  console.log("part-container id", { id })

  const navigate = useNavigate();
  const { getPartById } = new PartServices();

  // const handleButtonClick = (buttonName) => {
  //   setSelectedButton(buttonName);
  // };

  const getPartApi = async (id) => {
    //http://localhost:8181/SupplierMasterObject


    const partInfo = await getPartById(id);
    console.log("part container data:", { partInfo })
    const newParts = (partInfo?.parts || []).map(elem => {
      return { ...elem, createdDate: partInfo?.createdDate }
    })
      .sort((a, b) => b.id - a.id)?.[0];
    const newPartsData = { ...partInfo, parts: [newParts || {}] }
    setPartInformation([newPartsData || {}]);

  }
  useEffect(() => {
    getPartApi(id);
  }, [])

  console.log(partInformation)
  // console.log(id)

  const historyHandler = (buttonName) => {
    console.log("buttname3:" + buttonName)
    setSelectedButton(buttonName)
    navigate('/part-history/' + id)

    console.log("this is three button")
    console.log(selectedButton)

  }

  const structureHandler = (buttonName) => {
    console.log("buttname2:" + buttonName)
    setSelectedButton(buttonName)
    navigate('/bom-structure/' + id)
    console.log("this is two button")
    console.log(selectedButton)
  }

  const detailsHandler = (buttonName) => {
    console.log("buttname1:" + buttonName)
    setSelectedButton(buttonName)
    navigate('/part-details/' + id)
    console.log("this is one button")
    console.log(selectedButton)

  }


  return (
    <>
      <div className={classes.profile_section}>
        {(partInformation || [])?.map((part, index) => {
          return (
            <div className={classes.container} style={{ fontWeight: "bold", fontSize: "20px", textDecoration: "underline", backgroundColor: "#d9d9d9", padding: "2px" }}>
              <p className={classes.container_paragraph}> <SettingsIcon />Part-{part.data.part_number},{part.data.part_name},{part.data.parts[0].iteration_info}</p>
            </div>
          )
        })}
        <div>

          <div className={classes.tab_nav}>

            <div className={classes.tab_buttons}>
              <button onClick={() => detailsHandler('button1')} className={selectedButton === 'button1' ? 'selected' : ''}>Details</button>
              <button onClick={() => structureHandler('button2')} className={selectedButton === 'button2' ? 'selected' : ''}>Structure</button>
              <button onClick={() => historyHandler('button3')} className={selectedButton === 'button3' ? 'selected' : ''}>History</button>
            </div>

            <div className={classes.linkarea}>
              <Link className={classes.link} to='/part-table' style={{ width: "50px", border: "2px solid black", padding: "5px", backgroundColor: "lightgrey", color: "darkblue", borderStyle: "none" }}>Go to Action Page</Link>
            </div>

          </div>

          {children}
        </div>
      </div>


    </>
  )
}

export default PartContainer