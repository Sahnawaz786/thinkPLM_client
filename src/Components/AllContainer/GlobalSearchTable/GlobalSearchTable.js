import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../store/UserProvider";
import styles from "../../../style.module.css";

const GlobalSearchTable = () => {
  const { choice, showAlert, setShowAlert, searchData, setSearchData } =
    useContext(UserContext);
  console.log(searchData, "@@@");
  const [selectedId, setSelectedId] = useState(null);
  const [id, setId] = useState();
  const navigate = useNavigate();

  const handlePartDetails = (id) => {
    navigate("/part-details/" + id);
  };

  const handleSupplierContractDetails = (id) => {
    navigate("/supplier-document-details/" + id);
  };

  const handleInvoiceDetails = (id) => {
    navigate("/invoice-documents-details/" + id);
  };

  const handleComplianceCertificateDetails = (id) => {
    navigate("/compliance-documents-details/" + id);
  };

  const handleCertificateOfInsuranceDetails = (id) => {
    navigate("/certificate-documents-details/" + id);
  };

  const handleCheckboxChange = (id) => {
    setSelectedId(id);
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Number</th>
          <th>state</th>
          <th>Version</th>
          <th>Iteration</th>
          <th>Created Date</th>
          <th>Modified Date</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {/* for Parts */}
        {searchData?.Parts?.map((elem, i) => {
          return (
            <>
              <tr key={i}>
                <td>
                  <input
                    className={styles.icon_pointer}
                    checked={elem.id === selectedId}
                    onChange={() => handleCheckboxChange(elem.id)}
                    onClick={() => setId(elem.id)}
                    type="checkbox"
                  />
                </td>

                <td>
                  <img
                    src="/images/supplier.png"
                    alt="part"
                    className={styles.display_supplier_icon}
                  />
                  {elem?.part_name}
                </td>

                <td>{elem?.part_number}</td>

                <td className={styles.open}>Open </td>

                <td>A</td>

                <td>{elem?.parts[0]?.iteration_info}</td>

                <td>{elem?.createdDate}</td>

                <td>{elem?.parts[0]?.modifiedDate}</td>
                <td>
                  <img
                    className={styles.icon_pointer}
                    src="https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid"
                    width={20}
                    height={20}
                    onClick={() => {
                      handlePartDetails(elem.id);
                    }}
                  />
                </td>
              </tr>
            </>
          );
        })}

        {/* Supplier Contract */}

        {searchData?.Supplier_Contract_Document?.map((elem, i) => {
          return (
            <>
              <tr key={i}>
                <td>
                  <input
                    className={styles.icon_pointer}
                    checked={elem.id === selectedId}
                    onChange={() => handleCheckboxChange(elem.id)}
                    onClick={() => setId(elem.id)}
                    type="checkbox"
                  />
                </td>

                <td>
                  <img
                    src="/images/supplier.png"
                    alt="part"
                    className={styles.display_supplier_icon}
                  />
                  {elem?.document_name}
                </td>

                <td>{elem?.document_number}</td>

                <td className={styles.open}>Open </td>

                <td>A</td>

                <td>{elem?.supplier_contract[0]?.iteration_info}</td>

                <td>{elem?.createdDate}</td>

                <td>{elem?.modifiedDate}</td>
                <td>
                  <img
                    className={styles.icon_pointer}
                    src="https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid"
                    width={20}
                    height={20}
                    onClick={() => {
                      handleSupplierContractDetails(elem.id);
                    }}
                  />
                </td>
              </tr>
            </>
          );
        })}

        {/* Invoice Document */}

        {searchData?.Invoice_Document?.map((elem, i) => {
          return (
            <>
              <tr key={i}>
                <td>
                  <input
                    className={styles.icon_pointer}
                    checked={elem.id === selectedId}
                    onChange={() => handleCheckboxChange(elem.id)}
                    onClick={() => setId(elem.id)}
                    type="checkbox"
                  />
                </td>

                <td>
                  <img
                    src="/images/supplier.png"
                    alt="part"
                    className={styles.display_supplier_icon}
                  />
                  {elem?.invoice_name}
                </td>

                <td>{elem?.invoice_number}</td>

                <td className={styles.open}>Open </td>

                <td>A</td>

                <td>{elem?.invoice_Doc[0]?.iteration_info}</td>

                <td>{elem?.createdDate}</td>

                <td>{elem?.modifiedDate}</td>
                <td>
                  <img
                    className={styles.icon_pointer}
                    src="https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid"
                    width={20}
                    height={20}
                    onClick={() => {
                      handleInvoiceDetails(elem.id);
                    }}
                  />
                </td>
              </tr>
            </>
          );
        })}

        {/* for Compliance certificate */}

        {searchData?.Complaince_Certificate_Document?.map((elem, i) => {
          return (
            <>
              <tr key={i}>
                <td>
                  <input
                    className={styles.icon_pointer}
                    checked={elem.id === selectedId}
                    onChange={() => handleCheckboxChange(elem.id)}
                    onClick={() => setId(elem.id)}
                    type="checkbox"
                  />
                </td>

                <td>
                  <img
                    src="/images/supplier.png"
                    alt="part"
                    className={styles.display_supplier_icon}
                  />
                  {elem?.document_name}
                </td>

                <td>{elem?.document_number}</td>

                <td className={styles.open}>Open </td>

                <td>A</td>

                <td>{elem?.docs[0]?.iteration_info}</td>

                <td>{elem?.createdDate}</td>

                <td>{elem?.modifiedDate}</td>
                <td>
                  <img
                    className={styles.icon_pointer}
                    src="https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid"
                    width={20}
                    height={20}
                    onClick={() => {
                      handleComplianceCertificateDetails(elem.id);
                    }}
                  />
                </td>
              </tr>
            </>
          );
        })}

        {/*for Certificate of Insurance  */}

        {searchData?.Certification_of_Insurance_Document?.map((elem, i) => {
          return (
            <>
              <tr key={i}>
                <td>
                  <input
                    className={styles.icon_pointer}
                    checked={elem.id === selectedId}
                    onChange={() => handleCheckboxChange(elem.id)}
                    onClick={() => setId(elem.id)}
                    type="checkbox"
                  />
                </td>

                <td>
                  <img
                    src="/images/supplier.png"
                    alt="part"
                    className={styles.display_supplier_icon}
                  />
                  {elem?.document_name}
                </td>

                <td>{elem?.document_number}</td>

                <td className={styles.open}>Open </td>

                <td>A</td>

                <td>{elem?.docs[0]?.iteration_info}</td>

                <td>{elem?.createdDate}</td>

                <td>{elem?.modifiedDate}</td>
                <td>
                  <img
                    className={styles.icon_pointer}
                    src="https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid"
                    width={20}
                    height={20}
                    onClick={() => {
                      handleCertificateOfInsuranceDetails(elem.id);
                    }}
                  />
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default GlobalSearchTable;
