import React, { useState, useEffect } from 'react'
import SupplierDocContainer from '../SupplierDocumentContainer/SupplierDocContainer';
import DownloadIcon from '@mui/icons-material/Download';
import SupplierServices from '../../../services/supplier.services';
import DocumentServices from '../../../services/document.services';

const { getDocumentById, getFileDownload } = new DocumentServices();

const Attachment = ({ id }) => {
  const [file, setFile] = useState([]);
  const [uid, setUid] = useState([])
  const [attachment, setAttachment] = useState([]);

  const getSupplier = async (id) => {

    const supplierInfo = await getDocumentById(id);
    console.log("new supplier info:", supplierInfo)
    setAttachment(supplierInfo?.data[0]?.supplier_contract[0]?.attachment);
    console.log('ATTACHEMNTS', attachment);


    // console.log("checking....:",supplierInfo?.data?.document || [] )
    // const newSupplier = (supplierInfo?.data || [])
    // setUid(newSupplier?.document);

  }

  const getFile = async (uid)=>{
    const fileInfo = await getFileDownload(206);
    console.log("file download:",fileInfo)
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
    <SupplierDocContainer id={id}>
      <h>Attachments</h>
      <div>
        <ul>
          {file && (
            <table>
              <thead>
                <tr>
                  <th>GoveringLawandJurisdication</th>
                  <th>PricingandPaymentTerms</th>
                  <th>Signatures</th>
                  <th>TermandTermination</th>
                </tr>
              </thead>
              <tbody>


                <tr>
                  <td><DownloadIcon onClick={() => downloadFile(attachment[0]?.goveringLawandJurisdication)} /></td>

                  <td><DownloadIcon onClick={() => downloadFile(attachment[0]?.pricingandPaymentTerms)} /></td>

                  <td><DownloadIcon onClick={() => downloadFile(attachment[0]?.signatures)} /></td>

                  <td><DownloadIcon onClick={() => downloadFile(attachment[0]?.termandTermination)} /></td>

                </tr>
              </tbody>
            </table>

          )}
        </ul>
      </div>
    </SupplierDocContainer>
  )
}

export default Attachment