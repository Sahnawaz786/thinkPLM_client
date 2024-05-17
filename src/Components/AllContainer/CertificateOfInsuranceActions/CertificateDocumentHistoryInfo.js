import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from '../PartsAction/PartDetails.module.css';
import DocumentServices from '../../../services/document.services';
import styles from '../../../style.module.css';
import HashLoader from 'react-spinners/HashLoader';
import SupplierDocContainer from '../SupplierDocumentContainer/SupplierDocContainer';
import CertificateDocContainer from '../SupplierDocumentContainer/CertificateDocContainer';
import CertificateServices from '../../../services/certificate.services';

const { getCertificateDocumentHistoryById } = new CertificateServices();

const CertificateDocumentHistoryInfo = ({ pid, id }) => {

  console.log('THEID', pid, id);

  const [partInformation, setPartInformation] = useState([]);
  const [timer, setTimer] = useState(true)
  const navigate = useNavigate();

  const getPartApi = async (id) => {

    const { data } = await getCertificateDocumentHistoryById(pid);

    console.log("PARTHISTORYID", data)

    data.docs = data?.docs?.filter((elem) => elem.id == id)

    setPartInformation(data)
  };

  useEffect(() => {
    getPartApi(id);
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setTimer(false)
    }, 1000)
  })

  console.log("PARTINFO", partInformation);


  return (
    timer ? <div className={styles.spinnerContainer}>
      {' '}
      <HashLoader color='#0E6EFD' />{' '}
    </div> :
      <CertificateDocContainer id={pid} iteration_info={partInformation?.docs[0]?.iteration_info} >
        <div className={classes.detailContainer}>

          <div className={classes.profile_section}>
            <div className={classes.part_details_paragrah}>
              <div className={classes.image_part}>
                <div className={classes.image}>
                  <img
                    src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg"
                    alt="part"
                  />
                </div>


                <>
                  <div className={classes.part_container}>
                    <div className={classes.master_part}>
                      <div className={classes.masterpart_header}>
                        <p>System:-</p>
                      </div>
                      <p>
                        <strong>Created Date:</strong> {partInformation?.createdDate}
                      </p>
                      <p>
                        <strong>Modified Date:</strong> {partInformation?.modifiedDate}
                      </p>

                      <p>
                        <strong>Description:</strong> {partInformation?.description}
                      </p>

                      <p>
                        <strong>Document Name:</strong> {partInformation?.document_name}
                      </p>
                      <p>
                        <strong>Document Number.:</strong> {partInformation?.document_number}
                      </p>
                    </div>

                  </div>

                </>
              </div>

            </div>

          </div>

          <div className={classes.bottomDetails}>

            <>
              <div className={classes.child_part}>
                <div className={classes.childpart_header}>
                  <p>Business:-</p>
                </div>
                <p>
                  <strong>Supplier Name:</strong>{' '}
                  {partInformation?.docs[0]?.supplier_name}
                </p>


                <p>
                  <strong>Insurance Company:</strong> {partInformation?.docs[0]?.insurance_company}
                </p>
                <p>
                  <strong>Insurance Party:</strong> {partInformation?.docs[0]?.insured_party}
                </p>
                <p>
                  <strong>Policy Number:</strong> {partInformation?.docs[0]?.policy_number}
                </p>

                <p>
                  <strong>Effective Date:</strong> {partInformation?.docs[0]?.effective_date}
                </p>

                <p>
                  <strong>Expiration Date:</strong> {partInformation?.docs[0]?.expiration_date}
                </p>
              </div>
            </>

          </div>



        </div>
      </CertificateDocContainer>

  );
};

export default CertificateDocumentHistoryInfo;
