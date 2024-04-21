import InfoIcon from "@mui/icons-material/Info";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PartServices from "../../../services/parts.services";
import PartContainer from '../PartContainer';
import { PartsContext } from '../../../store/PartsProvider';
import styles from '../../../style.module.css';
import HashLoader from 'react-spinners/HashLoader';

const PartHistory = ({ id }) => {
  const [histories, setPartHistories] = useState([]);
  const [timer, setTimer] = useState(true);
  const { getPartHistoryById } = new PartServices();

  const { setPartsHistory } = useContext(PartsContext);

  const navigate = useNavigate();
  console.log({ 'ParanstestIDDD': id });

  const getPartApi = async (id) => {
    console.log({ 'testIDDD': id });

    const partInfo = await getPartHistoryById(id);
    console.log({ partInfo })

    const newPartInfo = (partInfo?.data.parts || []).map(elem => {
      return { ...elem, part_name: partInfo?.data.part_name, part_number: partInfo?.data?.part_number, createdDate: partInfo.data.createdDate }
    }).sort((a, b) => b.iteration_info - a.iteration_info);
    console.log({ partInfo, newPartInfo });
    // const newPartsData = {...partInfo, parts: newPartInfo}
    // console.log({newPartsData})
    setPartHistories(newPartInfo || []);
    setPartsHistory(partInfo.data || {});

  };
  useEffect(() => {
    getPartApi(id);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 1000)
  })

  console.log(histories);

  const InformationHistoryFun = (childId) => {
    navigate(`/part-historyInfo/${id}/${childId}`);
  };

  return (
    timer ? <div className={styles.spinnerContainer}>
      {' '}
      <HashLoader color='#0E6EFD' />{' '}
    </div> :
      <PartContainer id={id}>
        <div style={{ marginTop: "30px" }}>
          <h4 style={{ fontSize: "20px", textDecoration: "underline" }}>
            Part History:-
          </h4>

          <div className="container mt-5" style={{ maxWidth: "100%" }}>
            <table
              className="table table-sm table-striped table-hover table-bordered "
              style={{ fontSize: "12px" }}
            >
              <thead className="table-dark">
                <tr>
                  <th scope="col">Serial no.</th>
                  <th scope="col">Part Name</th>
                  <th scope="col">Part Number</th>
                  <th scope="col">Iteration Info</th>
                  <th scope="col">State</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">Modified Date</th>
                  <th scope="col">Info</th>
                </tr>
              </thead>

              <tbody>
                {(histories || [])?.map((part, index) => {
                  return (

                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{part.part_name}</td>
                      <td>{part.part_number}</td>
                      <td>{part.iteration_info}</td>
                      <td>Open</td>
                      <td>Smith</td>
                      <td>{part.createdDate}</td>
                      <td>{part.modifiedDate}</td>
                      <td><button
                        onClick={() => {
                          InformationHistoryFun(part.id);
                        }}
                        style={{
                          border:'none'
                        }}
                      >
                        <img
                          src='https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid'
                          width={20}
                          height={20}
                        />
                      </button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </PartContainer>
  );
};

export default PartHistory;
