import React, { useState, useEffect } from 'react'
import SupplierDocContainer from '../SupplierDocumentContainer/SupplierDocContainer';
import DownloadIcon from '@mui/icons-material/Download';
import SupplierServices from '../../../services/supplier.services';
import DocumentServices from '../../../services/document.services';
import ComplianceServices from '../../../services/compliance.services';
import styles from '../../../style.module.css'
import ComplianceCertificate from '../SupplierDocumentContainer/ComplianceCertificate';
import CertificateDocContainer from '../SupplierDocumentContainer/CertificateDocContainer';
import CertificateServices from '../../../services/certificate.services';


const { getCertificateDocumentById,getFileDownload } = new CertificateServices();

const CertificateAttachment = ({ id }) => {
  const [file, setFile] = useState([]);
  const [uid, setUid] = useState([])
  const [attachment, setAttachment] = useState([]);

  const getSupplier = async (id) => {

    const supplierInfo = await getCertificateDocumentById(id);
    console.log("new supplier info:", supplierInfo)
    setAttachment(supplierInfo?.data?.docs[0]?.attachment);
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
    <CertificateDocContainer id={id} >
      <div>
        {/* <ul> */}
          {file && (
            <table>
              <thead>
                <tr>
                  <th>
                    <span>{attachment[0]?.attachmentType}</span>
                    
                  </th>
                  <th>
                    <span>{attachment[1]?.attachmentType}</span>
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


                </tr>
              </tbody>
            </table>

          )}
        {/* </ul> */}
      </div>
    </CertificateDocContainer>
  )
}

export default CertificateAttachment