import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import ComplianceServices from '../../../services/compliance.services';
import DocumentServices from '../../../services/document.services';
import { DocsContext } from '../../../store/DocsProvider';
import { PartsContext } from '../../../store/PartsProvider';
import styles from '../../../style.module.css';
import SupplierDocContainer from '../SupplierDocumentContainer/SupplierDocContainer';

const DocumentHistory = ({ id }) => {
  console.log("DocumentTYpe", id);
  const { type } = useContext(DocsContext);
  const [histories, setPartHistories] = useState([]);
  const [timer, setTimer] = useState(true);
  const { getDocumentById, getDocumentHistoryById } = new DocumentServices();
  const { getComplianceDocumentHistoryById } = new ComplianceServices();

  const { setPartsHistory } = useContext(PartsContext);

  const navigate = useNavigate();
  console.log({ 'ParanstestIDDD': id });

  const getPartApi = async (id) => {
    console.log({ 'testIDDD': id });
    const partInfo = await getDocumentHistoryById(id);
    console.log("DATAIS", { partInfo })

    const newPartInfo = (partInfo?.data?.supplier_contract || []).map(elem => {
      return { ...elem, document_name: partInfo?.data.document_name, document_number: partInfo?.data?.document_number, createdDate: partInfo?.data?.createdDate, modifiedDate: partInfo?.data?.modifiedDate }
    }).sort((a, b) => b.iteration_info - a.iteration_info);
    console.log("HELLO:", { partInfo, newPartInfo });
    setPartHistories(newPartInfo || []);
    setPartsHistory(partInfo.data || {});//

  };

  useEffect(() => {
    getPartApi(id);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 1000)
  })

  console.log("HISTORY", histories);

  const InformationHistoryFun = (childId) => {
    navigate(`/document-historyInfo/${id}/${childId}`);
  };

  return (
    timer ? <div className={styles.spinnerContainer}>
      {' '}
      <HashLoader color='#0E6EFD' />{' '}
    </div> :
      <SupplierDocContainer id={id} iteration_info={histories[0]?.iteration_info}>
        <div style={{ marginTop: "15px" }}>

          <div className="container" style={{ maxWidth: "100%" }}>
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
                          border: 'none'
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
