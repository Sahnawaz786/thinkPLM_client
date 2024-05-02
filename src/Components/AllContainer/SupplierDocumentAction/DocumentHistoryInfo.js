import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from '../PartsAction/PartDetails.module.css';
import DocumentServices from '../../../services/document.services';
import styles  from '../../../style.module.css';
import HashLoader from 'react-spinners/HashLoader';
import SupplierDocContainer from '../SupplierDocumentContainer/SupplierDocContainer';

const DocumentHistoryInfo = ({ pid, id }) => {

    console.log('THEID',pid,id);

  const [partInformation, setPartInformation] = useState([]);
  const [timer,setTimer] = useState(true)
  const { getDocumentById } = new DocumentServices();
  const navigate = useNavigate();

  const getPartApi = async (id) => {

    const {data} = await  getDocumentById(pid);

    console.log("PARTHISTORYID", data)

    data[0].supplier_contract = data[0]?.supplier_contract?.filter((elem) => elem.id == id)

    setPartInformation(data)
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
      <SupplierDocContainer id={pid}>
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

              {partInformation.map((part, i) => {
                console.log("PARTS",part);
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
                          <strong>Document Name:</strong> {part?.document_name}
                        </p>
                        <p>
                          <strong>Document Number.:</strong> {part?.document_number}
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
        {partInformation[0]?.supplier_contract?.map((childParts, i) => {
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
                              <strong>Work Scope:</strong>{' '}
                              {childParts.work_scope}
                            </p>
                            <p>
                              <strong>Effective Date:</strong>{' '}
                              {childParts.effective_date}
                            </p>
                            <p>
                              <strong>Expiration Date:</strong>{' '}
                              {childParts.expiration_date}
                            </p>
                          </div>
                        </>
                      );
                    })}
        </div>

         

        </div>
      </SupplierDocContainer>
    
  );
};

export default DocumentHistoryInfo;
