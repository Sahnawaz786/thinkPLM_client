import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PartServices from "../../../services/parts.services";
import PartContainer from "../PartContainer";
import classes from '../PartsAction/PartDetails.module.css';
import styles  from '../../../style.module.css';
import HashLoader from 'react-spinners/HashLoader';

const PartHistoryInfo = ({ pid, id }) => {
  const [partInformation, setPartInformation] = useState([]);
  const [timer,setTimer] = useState(true)
  const { getPartHistoryById } = new PartServices();
  const navigate = useNavigate();

  const getPartApi = async (id) => {

    //    console.log("ID : ",{id})
    // const partInfo = await getPartHistoryById(id);
    // console.log("PARTINFO",{partInfo});
    // const newParts = (partInfo?.data.parts || []).map(elem => {
    //   return { ...elem, createdDate: partInfo?.data.createdDate}})
    // .sort((a, b) => b.id - a.id)?.[0];
    // const newPartsData = {...partInfo, parts: [newParts || {}]}
    // setPartInformation([]);

    const { data } = await getPartHistoryById(pid);

    console.log("PARTHISTORYID", [data])

    data.parts = data.parts.filter((elem) => elem.id == id)

    setPartInformation([data])

    // console.log("IDDDDDD",{id})
    // const newParts = (partsHistory?.parts || []).filter(elem => elem.id===id);
    // console.log("NEWPRATSS",newParts)
    // const newPartsData = {...partsHistory, parts: [newParts || {}]}
    // setPartInformation([newPartsData]);


  };

  useEffect(() => {
    getPartApi(id);
  }, [id]);

  useEffect(()=>{
    setTimeout(()=>{
       setTimer(false)
    },1000)
  })

  console.log("PARTINFO", partInformation);


  return (
    timer ? <div className={styles.spinnerContainer}>
    {' '}
    <HashLoader color='#0E6EFD' />{' '}
  </div> :
      <PartContainer id={pid}>
        <div className={classes.detailContainer}>

        <div className={classes.profile_section}>
          <div className={classes.part_details_paragrah}>
            <p className={classes.part_details_heading}>Part History:-</p>
            <div className={classes.image_part}>
              <div className={classes.image}>
                <img
                  src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg"
                  alt="part"
                />
              </div>

              {partInformation.map((part, i) => {
                console.log(part);
                return (
                  <>
                    <div key={i} className={classes.part_container}>
                      <div className={classes.master_part}>
                        <div className={classes.masterpart_header}>
                          <p>System:-</p>
                        </div>
                        <p>
                          <strong>Created Date:</strong> {part?.createdDate}
                        </p>
                        <p>
                          <strong>Modified Date:</strong> {part?.modifiedDate}
                        </p>

                        <p>
                          <strong>Description:</strong> {part?.description}
                        </p>

                        <p>
                          <strong>Part Name:</strong> {part?.part_name}
                        </p>
                        <p>
                          <strong>Part No.:</strong> {part?.part_number}
                        </p>
                      </div>
                      
                    </div>

                  </>
                );
              })}
            </div>

          </div>

        </div>

        <div className={classes.bottomDetails}>
        {partInformation[0]?.parts?.map((childParts, i) => {
                      return (
                        <>
                          <div key={i} className={classes.child_part}>
                            <div className={classes.childpart_header}>
                              <p>Business:-</p>
                            </div>
                            <p>
                              <strong>Supplier Name:</strong>{' '}
                              {childParts.supplier_name}
                            </p>
                            <p>
                              <strong>Material:</strong> {childParts.material}
                            </p>
                            <p>
                              <strong>MPN No.:</strong> {childParts.mpn_number}
                            </p>
                            <p>
                              <strong>Weight:</strong> {childParts.weight}
                            </p>
                            <p>
                              <strong>Dimension:</strong> {childParts.dimension}
                            </p>
                            <p>
                              <strong>Cost:</strong> {childParts.cost}
                            </p>
                            <p>
                              <strong>Lead Date:</strong> {childParts.lead_date}
                            </p>
                            <p>
                              <strong>Quality Matrices:</strong>{' '}
                              {childParts.quality_matrices}
                            </p>
                            <p>
                              <strong>Compliance Information:</strong>{' '}
                              {childParts.compliance_information}
                            </p>
                          </div>
                        </>
                      );
                    })}
        </div>

         

        </div>
      </PartContainer>
    
  );
};

export default PartHistoryInfo;
