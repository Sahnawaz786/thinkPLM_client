import React, { useContext, useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { UserContext } from '../../../store/UserProvider';
import DisplayAlert from '../../../utils/DisplayAlert';
import styles from '../../../style.module.css';
import classes from '../SupplierActions/Supplier.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ComplianceCertificate from '../SupplierDocumentContainer/ComplianceCertificate';
import InvoiceDocContainer from '../SupplierDocumentContainer/InvoiceDocContainer';
import InvoiceServices from '../../../services/invoice.services';
import { URL, openNewWindow } from '../../../utils/helper';

const { getInvoiceDocumentById,getAllInvoiceDocuments,deleteInvoiceDocumentById } = new InvoiceServices();

const InvoiceDocDetails = ({ id }) => {

  const [supplierDetails, setSupplierDetails] = useState([]);
  const { choice, showAlert, setShowAlert } = useContext(UserContext);
  const [timer, setTimer] = useState(true);
  const [docsupplier, setDocSupplier] = useState([]);
  const location = useLocation();
  const navigate = useNavigate()


  const getSupplierApi = async (id) => {
    const partInfo = await getInvoiceDocumentById(id);
    console.log("PARTINFO", partInfo);
    console.log('part info data', { partInfo });
    const newParts = (partInfo?.data?.invoice_Doc || [])
      .map((elem) => {
        return { ...elem, createdDate: partInfo?.data?.createdDate };
      })
      .sort((a, b) => b.id - a.id)?.[0];



    let obj = partInfo?.data?.invoice_Doc;


    let mainOBJ = obj.map((elem) => {
      return { ...elem }
    }).sort((a, b) => b.id - a.id)?.[0];

    setDocSupplier([mainOBJ]);

    console.log('OBJ', mainOBJ);

    console.log('NEWPARTS', newParts);
    const newPartsData = { ...partInfo, invoice_Doc: [newParts || {}] };
    console.log("SupplierDetails", newPartsData);
    setSupplierDetails(newPartsData || {});
  };

  useEffect(() => {
    getSupplierApi(id);
    setTimer(true);
    let timeOut = setTimeout(() => {
      setTimer(false);
    }, 1000);
    return (() => timeOut)
  }, [id]);

  const DeleteFun = async (id) => {
    if (choice) {
      console.log("choice is:", choice)
      const supplierInfo = await deleteInvoiceDocumentById(id);
      navigate('/part-table')
    };
  }

  useEffect(() => {
    DeleteFun(id)
  }, [choice])

  console.log('DATAIS', supplierDetails);

  return (
    timer ? (
      <div className={styles.spinnerContainer}>
        <HashLoader color='#0E6EFD' />{' '}
      </div>
    ) : <InvoiceDocContainer id={id} document_type={supplierDetails?.data?.documenttype} iteration_info={supplierDetails?.data?.invoice_Doc[0]?.iteration_info}>

      <div className={classes.editIcons}>
        <img
          src='https://cdn-icons-png.freepik.com/512/3425/3425921.png'
          width={30}
          height={30}
          alt=''
          onClick={(e) => {
            openNewWindow(e, `${URL}/invoice-document-edit/${id}`);
            setTimeout(() => {
              navigate(location?.pathname);
            }, 1000);
            // navigate(`/invoice-document-edit/${id}`)
          }}

        />
        <img
          src='https://cdn-icons-png.freepik.com/512/9740/9740598.png'
          width={30}
          height={30}
          alt=''
          className={styles.deleteIcon}
          onClick={(e) => setShowAlert(true)}
        />

      </div>

      <div className={classes.detailContainer}>
        <div className={classes.part_details_paragrah}>

          {/* <div className={classes.part_container}> */}
          <div className={classes.master_part}>
            <div className={classes.masterpart_header}>
              <p>System:-</p>
            </div>
            {/* <div className={classes.systemInfo}> */}
            <p  >
              <strong>Document Name:</strong>{' '}
              {supplierDetails?.data?.invoice_name}
            </p>

            <p >
              <strong>Document Number:</strong>{' '}
              {supplierDetails?.data?.invoice_number}
            </p>

            <p >
              <strong>Document Type:</strong>{' '}
              {supplierDetails?.data?.documenttype}
            </p>
            <p >
              <strong>Description:</strong>{' '}
              {supplierDetails?.data?.invoice_description}
            </p>
            {/* </div> */}
          </div>
          {/* </div> */}


        </div>
        <div className={classes.bottomDetails}>
          {docsupplier.map((childParts, i) => {
            return (

              <div className={classes.child_part}>
                <div className={classes.childpart_header}>
                  <p>Business:-</p>
                </div>
                <p>
                  <strong>Effective Date:</strong> {childParts?.amount_due}
                </p>
                <p>
                  <strong>Invoice Date:</strong> {childParts?.invoice_date}
                </p>
                <p>
                  <strong>Due Date:</strong> {childParts?.due_date}
                </p>
              </div>
            )
          })}

        </div>
      </div>
      {showAlert && <DisplayAlert />}
    </InvoiceDocContainer>
  )
}

export default InvoiceDocDetails;