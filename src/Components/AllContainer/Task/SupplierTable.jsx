import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupplierServices from '../../../services/supplier.services';
import styles from './Task.module.css';

const { getSupplier } = new SupplierServices();

const SupplierTable = () => {
    const navigate = useNavigate();


    const [supplierData, setSupplierData] = useState([])

    const handleAPI = async () => {
        const data = await getSupplier();
        setSupplierData(data.data.reverse())
        console.log('suppliers', data.data);
    };

    useEffect(() => {
        handleAPI();
    }, []);
    return (
        <div className={styles.tabelContainer}>
            <div className={styles.Header}>
                <p className={styles.para}>Supplier</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Supplier Category</th>
                        <th>Supplier Name</th>
                        <th>Created Date</th>
                        <th>Modified Date</th>
                        <th>Email</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Approver Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        supplierData?.map((elem, index) => {
                            return <tr key={index}>
                                <td>{elem.category}</td>
                                <td>{elem.name}</td>
                                <td>{elem.createdDate}</td>
                                <td>{elem.modifiedDate}</td>
                                <td>{elem.supplier[0]?.email}</td>
                                <td>{elem.supplier[0]?.start_date}</td>
                                <td>{elem.supplier[0]?.end_date}</td>
                                <td>Jackson</td>
                                <td>
                                    <img
                                        className={styles.icon_pointer}
                                        src='https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid'
                                        width={20}
                                        height={20}
                                        onClick={() => {
                                            navigate(`/supplier-details/${elem.id}`);
                                        }}
                                    />
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>

        </div>
    )
}

export default SupplierTable
