import React, { useState, useEffect, useContext } from 'react'
import SupplierDocContainer from '../SupplierDocumentContainer/SupplierDocContainer';
import DownloadIcon from '@mui/icons-material/Download';
import SupplierServices from '../../../services/supplier.services';
import DocumentServices from '../../../services/document.services';
import styles from '../../../style.module.css'
import InvoiceServices from '../../../services/invoice.services';
import InvoiceDocContainer from '../SupplierDocumentContainer/InvoiceDocContainer';

const { getDocumentById, getFileDownload } = new DocumentServices();

const Attachment = ({ id }) => {
  const [file, setFile] = useState([]);
  const [uid, setUid] = useState([])
  const [attachment, setAttachment] = useState([]);


  const getSupplier = async (id) => {
      const supplierInfo = await getDocumentById(id);
      console.log("new supplier info:", supplierInfo)
      setAttachment(supplierInfo?.data?.supplier_contract[0]?.attachment);
      console.log('ATTACHEMNTS', attachment);
    
  }

  const getFile = async (uid) => {
    const fileInfo = await getFileDownload(206);
    console.log("file download:", fileInfo)
    const newFile = (fileInfo?.data?.document || [])
    setFile(newFile);
  }


  useEffect(() => {
    getSupplier(id);
    getFile();
  }, [id, uid])
  console.log("uid is:", uid)
  console.log("file is:", file)

  const downloadFile = (url) => {
    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    // Specify filename using the 'download' attribute
    link.setAttribute("download", "");
    // Simulate click to trigger download
    document.body.appendChild(link);
    link.click();
    // Clean up
    document.body.removeChild(link);
  };

  console.log('ATTACHEMNTS', attachment);

  return (
    <SupplierDocContainer id={id} >
      <div>
        {/* <ul> */}
        {file && (
          <table>
            <thead>
              <tr>
                <th>
                  <span>{attachment[0]?.attachmentType}</span>
                  <span className={styles.fileType}>{attachment[0]?.fileType}</span>
                </th>
                <th>
                  <span>{attachment[1]?.attachmentType}</span>
                  <span className={styles.fileType}>{attachment[1]?.fileType}</span>
                </th>
                <th>
                  <span>{attachment[2]?.attachmentType}</span>
                  <span className={styles.fileType}>{attachment[2]?.fileType}</span>
                </th>
                <th>
                  <span>{attachment[3]?.attachmentType}</span>
                  <span className={styles.fileType}>{attachment[3]?.fileType}</span>
                </th>
               
              </tr>
            </thead>
            <tbody>


              <tr>
                <td>
                  <DownloadIcon onClick={() => downloadFile(attachment[0]?.content)} />
                  <span className={styles.fileType}>{attachment[0]?.fileName}</span>
                </td>

                <td>
                  <DownloadIcon onClick={() => downloadFile(attachment[1]?.content)} />
                  <span className={styles.fileType}>{attachment[1]?.fileName}</span>
                </td>

                <td>
                  <DownloadIcon onClick={() => downloadFile(attachment[2]?.content)} />
                  <span className={styles.fileType}>{attachment[2]?.fileName}</span>
                </td>

                <td>
                  <DownloadIcon onClick={() => downloadFile(attachment[3]?.content)} />
                  <span className={styles.fileType}>{attachment[3]?.fileName}</span>
                </td>

              
              </tr>
            </tbody>
          </table>

        )}
        {/* </ul> */}
      </div>
    </SupplierDocContainer>
  )
}

export default Attachment