import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import { PartsContext } from '../../../store/PartsProvider';
import DocumentServices from '../../../services/document.services';
import styles from '../../../style.module.css';
import PartContainer from '../PartContainer/PartContainer';
import tableStyle from '../../../style.module.css';
import SupplierDocContainer from '../SupplierDocumentContainer/SupplierDocContainer';

const DocumentHistory = ({ id }) => {
  const [histories, setPartHistories] = useState([]);
  const [timer, setTimer] = useState(true);
  const { getDocumentById } = new DocumentServices();

  const { setPartsHistory } = useContext(PartsContext);

  const navigate = useNavigate();
  console.log({ 'ParanstestIDDD': id });

  const getPartApi = async (id) => {
    console.log({ 'testIDDD': id });

    const partInfo = await getDocumentById(id);
    console.log({ partInfo })

    const newPartInfo = (partInfo?.data[0]?.supplier_contract || []).map(elem => {
      return { ...elem, document_name: partInfo?.data[0].document_name, document_number: partInfo?.data[0]?.document_number, createdDate: partInfo.data[0].createdDate,modifiedDate:partInfo.data[0].modifiedDate }
    }).sort((a, b) => b.iteration_info - a.iteration_info);
    console.log({ partInfo, newPartInfo });
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

  console.log("HISTORY",histories);

  const InformationHistoryFun = (childId) => {
    navigate(`/document-historyInfo/${id}/${childId}`);
  };

  return (
    timer ? <div className={styles.spinnerContainer}>
      {' '}
      <HashLoader color='#0E6EFD' />{' '}
    </div> :
      <SupplierDocContainer id={id}>
        <div style={{ marginTop: "30px" }}>
         

          <div className="container mt-5" style={{ maxWidth: "100%" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Document Name</th>
                  <th scope="col">Document Number</th>
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
                      <td>{part.document_name}</td>
                      <td>{part.document_number}</td>
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
      </SupplierDocContainer>
  );
};

export default DocumentHistory;
