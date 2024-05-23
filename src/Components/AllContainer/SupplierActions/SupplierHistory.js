import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import SupplierServices from "../../../services/supplier.services";
import styles from '../../../style.module.css';
import SupplierContainer from "../SupplierContainer/SupplierContainer";

const SupplierHistory = ({id,iteration_info,children}) => {

    const [histories, setSupplierHistories] = useState([]);
    const [timer, setTimer] = useState(true);
    const { getSupplierById,getSupplierHistoryById } = new SupplierServices();
    const navigate = useNavigate();
    console.log({ 'ParanstestIDDD': id });

    const getSupplierApi= async (id)=>{
        const supplierInfo = await getSupplierHistoryById(id);

        const newSupplierInfo = (supplierInfo?.data?.supplier || []).map(elem => {
            return { ...elem, name: supplierInfo?.data.name, category: supplierInfo?.data?.category, createdDate: supplierInfo.data.createdDate ,modifiedDate:supplierInfo.data.modifiedDate}
          }).sort((a, b) => b.iteration_info - a.iteration_info);
          console.log({ supplierInfo, newSupplierInfo });
          setSupplierHistories(newSupplierInfo || []);
    }
useEffect(()=>{
    getSupplierApi(id);
},[])

useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 1000)
  })

  const InformationHistoryFun = (childId) => {
    navigate(`/supplier-historyInfo/${id}/${childId}`);
  };

console.log('hgjhfjfhvcghcgfcgf87677',histories)
    return (
        timer ? <div className={styles.spinnerContainer}>
        {' '}
        <HashLoader color='#0E6EFD' />{' '}
      </div> :
        <SupplierContainer id={id}>
          <div style={{ marginTop: "15px" }}>
           
  
            <div className="container" style={{ maxWidth: "100%" }}>
              <table>
                <thead>
                  <tr>
                  <th scope="col">Supplier Category</th>
                    <th scope="col">Supplier Name</th>
                    <th scope="col">Iteration Info</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Modified Date</th>
                    <th scope="col">Info</th>

                  </tr>
                </thead>
  
                <tbody>
                  {(histories || [])?.map((sup, index) => {
                    return (
  
                      <tr key={index}>
                        <td>{sup?.category}</td>
                        <td>{sup?.name}</td>
                        <td>{sup.iteration_info}</td>
                        <td>{sup?.createdDate}</td>
                        <td>{sup?.modifiedDate}</td>
                        <td><button
                          onClick={() => {
                            InformationHistoryFun(sup.id);
                          }}
                          style={{
                            border:'none'
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
        </SupplierContainer>
    )
  }
  
  export default SupplierHistory




