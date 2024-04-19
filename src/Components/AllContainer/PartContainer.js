import SettingsIcon from '@mui/icons-material/Settings';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PartServices from '../../services/parts.services';
import classes from './PartContainer.module.css';


const PartContainer = ({ children, id }) => {

  const [partInformation, setPartInformation] = useState([]);
  console.log("part-container id", { id })

  const navigate = useNavigate();
  const { getPartById } = new PartServices();


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

  const historyHandler = () => {
   
    navigate('/part-history/' + id)

  }

  const structureHandler = () => {
    
    navigate('/bom-structure/' + id)
   
  }

  const detailsHandler = () => {
    
    navigate('/part-details/' + id)
   
  }


  return (
    <>
      <div className={classes.profile_section}>
        {(partInformation || [])?.map((part, index) => {
          return (
            <div className={classes.container} >
              <p className={classes.container_paragraph}> <SettingsIcon />Part-{part.data.part_number},{part.data.part_name},{part.data.parts[0].iteration_info}</p>
            </div>
          )
        })}
        <div>

          <div className={classes.tab_nav}>

            <div className={classes.tab_buttons}>
              <button onClick={() => detailsHandler()} >Details</button>
              <button onClick={() => structureHandler()} >Structure</button>
              <button onClick={() => historyHandler()} >History</button>
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