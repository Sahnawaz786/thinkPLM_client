import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from '../PartsAction/PartDetails.module.css';
import DocumentServices from '../../../services/document.services';
import styles from '../../../style.module.css';
import HashLoader from 'react-spinners/HashLoader';
import InvoiceDocContainer from '../SupplierDocumentContainer/InvoiceDocContainer';
import InvoiceServices from '../../../services/invoice.services';

const { getInvoiceDocumentHistoryById } = new InvoiceServices();

const InvoiceDocumentHistoryInfo = ({ pid, id }) => {

  console.log('THEID', pid, id);

  const [partInformation, setPartInformation] = useState([]);
  const [timer, setTimer] = useState(true)
  const navigate = useNavigate();

  const getPartApi = async (id) => {

    const { data } = await getInvoiceDocumentHistoryById(pid);

    console.log("PARTHISTORYID", data)

    data.invoice_Doc = data?.invoice_Doc?.filter((elem) => elem.id == id)

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
      <InvoiceDocContainer id={pid} iteration_info={partInformation?.invoice_Doc[0]?.iteration_info} >
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
                        <strong>Description:</strong> {partInformation?.invoice_description}
                      </p>

                      <p>
                        <strong>Document Name:</strong> {partInformation?.invoice_name}
                      </p>
                      <p>
                        <strong>Document Number.:</strong> {partInformation?.invoice_number}
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
                      {partInformation?.invoice_Doc[0]?.supplier_name}
                    </p>


                    <p>
                      <strong>Effective Date:</strong>{' '}
                      {partInformation?.invoice_Doc[0]?.amount_due}
                    </p>
                    <p>
                      <strong>Invoice Date:</strong>{' '}
                      {partInformation?.invoice_Doc[0]?.invoice_date}
                    </p>
                    <p>
                      <strong>Due Date:</strong>{' '}
                      {partInformation?.invoice_Doc[0]?.due_date}
                    </p>
                  </div>
                </>
          
          </div>



        </div>
      </InvoiceDocContainer>

  );
};

export default InvoiceDocumentHistoryInfo;
