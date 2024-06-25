import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CertificateServices from "../../../services/certificate.services";
import ComplianceServices from "../../../services/compliance.services";
import InvoiceServices from "../../../services/invoice.services";
import PartServices from "../../../services/parts.services.js";
import SupplierServices from "../../../services/supplier.services";
import { UserContext } from "../../../store/UserProvider";
import styles from "../../../style.module.css";
import DisplayAlert from "../../../utils/DisplayAlert";
import { URL, openNewWindow } from "../../../utils/helper";
const { deletePart } = new PartServices();
const { deleteSupplier } = new SupplierServices();
const { deleteInvoiceDocumentById } = new InvoiceServices();
const { deleteCertificateDocumentById } = new CertificateServices();
const { deleteComplianceDocumentById } = new ComplianceServices();

const GlobalSearchTable = () => {
  const { choice, showAlert, setShowAlert, searchData, setSearchData } = useContext(UserContext);
  console.log(searchData, "@@@");
  const [selectedId, setSelectedId] = useState(null);
  const [elem, setElem] = useState();
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
    console.log("SelectedID", selectedId);
  };

  const handleDeleteBtn = async () => {
    if (choice && elem?.documenttype === "Supplier Contract") {
      await deleteSupplier(id);
      navigate("/document-table");
    } else if (choice && elem?.documenttype === "Invoice") {
      await deleteInvoiceDocumentById(id);
      navigate("/document-table");
    } else if (choice && elem?.documenttype === "Complaince Certificate") {
      await deleteComplianceDocumentById(id);
      navigate("/document-table");
    } else if (choice && elem?.documenttype === "Certification_of_Insurance") {
      await deleteCertificateDocumentById(id);
      navigate("/document-table");
    } else if (choice && elem?.part_name) {
      await deletePart(id);
      navigate("/");
    }
  };

  const handleEditBtn = async (e) => {
    if (elem?.documenttype === "Supplier Contract") {
      openNewWindow(e, `${URL}/supplier-document-edit/${id}`);
      setTimeout(() => {
        navigate("/global-search");
      }, 1000);
    } else if (elem?.documenttype === "Invoice") {
      openNewWindow(e, `${URL}/invoice-document-edit/${id}`);
      setTimeout(() => {
        navigate("/global-search");
      }, 1000);
    } else if (elem?.documenttype === "Complaince Certificate") {
      openNewWindow(e, `${URL}/compliance-document-edit/${id}`);
      setTimeout(() => {
        navigate("/global-search");
      }, 1000);
    } else if (elem?.documenttype === "Certification_of_Insurance") {
      openNewWindow(e, `${URL}/certificate-document-edit/${id}`);
      setTimeout(() => {
        navigate("/global-search");
      }, 1000);
    } else {
      openNewWindow(e, `${URL}/edit-part/${id}`);
      setTimeout(() => {
        navigate("/global-search");
      }, 1000);
    }
  };

  useEffect(() => {
    handleDeleteBtn(id);
  }, [choice]);

  return (
    <div className={styles.fontStyles}>
      <div className={styles.rightBar}>
        <div className={styles.rightBarLogo}>
          <div title="Delete">
            <img
              src="https://cdn-icons-png.freepik.com/512/9740/9740598.png"
              width={30}
              height={30}
              alt=""
              className={styles.deleteIcon}
              onClick={(e) => setShowAlert(true)}
            />
          </div>

          <div title="Edit">
            <img
              src="https://cdn-icons-png.freepik.com/512/3425/3425921.png"
              width={30}
              height={30}
              alt=""
              className={styles.deleteIcon}
              onClick={(e) => handleEditBtn(e)}
            />
          </div>
        </div>
      </div>
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
            console.log({ elem });
            return (
              <>
                <tr key={i}>
                  <td>
                    <input
                      className={styles.icon_pointer}
                      checked={elem.id === selectedId}
                      onChange={() => setSelectedId(elem.id)}
                      onClick={() => {
                        setId(elem.id);
                        setElem(elem);
                      }}
                      type="checkbox"
                    />
                  </td>

                  <td>
                    <img
                      src="/images/parts.png"
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
            console.log(i+1,elem)
            return (
              <>
                <tr key={i}>
                  <td>
                    <input
                      className={styles.icon_pointer}
                      checked={elem.id === selectedId}
                      onChange={() => setSelectedId(elem.id)}
                      onClick={() => {
                        setId(elem.id);
                        setElem(elem);
                      }}
                      type="checkbox"
                    />
                  </td>

                  <td>
                    <img
                      src="/images/document.png"
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
                      onClick={() => {
                        setId(elem.id);
                        setElem(elem);
                      }}
                      type="checkbox"
                    />
                  </td>

                  <td>
                    <img
                      src="/images/document.png"
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
                      onClick={() => {
                        setId(elem.id);
                        setElem(elem);
                      }}
                      type="checkbox"
                    />
                  </td>

                  <td>
                    <img
                      src="/images/document.png"
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
                      onClick={() => {
                        setId(elem.id);
                        setElem(elem);
                      }}
                      type="checkbox"
                    />
                  </td>

                  <td>
                    <img
                      src="/images/document.png"
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
      {showAlert && <DisplayAlert />}
    </div>
  );
};

export default GlobalSearchTable;
