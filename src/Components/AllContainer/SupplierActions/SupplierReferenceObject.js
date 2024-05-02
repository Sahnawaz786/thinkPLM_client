import DownloadIcon from '@mui/icons-material/Download';
import React, { useEffect, useState } from 'react';
import SupplierServices from '../../../services/supplier.services';
import SupplierContainer from '../SupplierContainer/SupplierContainer';

const SupplierReferenceObject = ({id}) => {

  const [file,setFile]=useState([]);
  const [uid,setUid]=useState([])
  const {getSupplierById,getFileDownload}=new SupplierServices();

  
  const getSupplier = async (id) => {
    
    const supplierInfo=await getSupplierById(id);
    console.log("new supplier info:",supplierInfo)
    console.log("checking....:",supplierInfo?.data?.document || [] )
    const newSupplier = (supplierInfo?.data || [])
    setUid(newSupplier?.document);
  }
  
  console.log("outer uid is:",uid)

  const getFile = async (uid)=>{
    const fileInfo = await getFileDownload(uid);
    console.log("file download:",fileInfo)
    const newFile = (fileInfo?.data?.document || [])
    setFile(newFile);
  }

  useEffect(() => {
    getSupplier(id);
    getFile(uid)
  }, [id,uid])
  console.log("uid is:",uid)
  console.log("file is:",file)

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

  return (
    <SupplierContainer id={id}>
        <div>
         <ul>
        {file && (

                      <li>Supplier Document :<DownloadIcon onClick={() => downloadFile(file)}/></li>
                  )}
       </ul>
        </div>
    </SupplierContainer>
  )
}

export default SupplierReferenceObject