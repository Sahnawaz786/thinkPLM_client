import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import SupplierServices from '../../../services/supplier.services';
import SupplierContainer from '../SupplierContainer/SupplierContainer';

const SupplierDetails = ({id}) => {

 const[supplierDetails,setSupplierDetails]=useState([]);

const {getSupplierById}=new SupplierServices();

const getSupplierApi = async (id) => {
    const supplierInfo = await getSupplierById(id);
    const supData = (supplierInfo?.data || [])
    console.log('supplier info data', supData);
    setSupplierDetails(supData)
  };
  useEffect(() => {
    getSupplierApi(id);
  }, []);

  return (
    <SupplierContainer id={id}>

    {/* edit icon and Delete Icon */}
    <EditIcon/>
    <DeleteIcon/>

     {/* System */}
      <p>{supplierDetails.category}</p>
      <p>{supplierDetails.name}</p>
      <p>{supplierDetails.pt}</p>

     {/* business */}
      <p>{supplierDetails.email}</p>
      <p>{supplierDetails.contact}</p>
      <p>{supplierDetails.start_date}</p>
      <p>{supplierDetails.end_date}</p>
      <p>{supplierDetails.district}</p>
      <p>{supplierDetails.state}</p>
      <p>{supplierDetails.country}</p>
      <p>{supplierDetails.location}</p>
      
    </SupplierContainer>
  )
}

export default SupplierDetails;