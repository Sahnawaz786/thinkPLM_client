import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../style.module.css';
import Structure from './AllContainer/BomStructure/Structure';
import PartHistory from './AllContainer/History/PartHistory';
import PartHistoryInfo from './AllContainer/History/PartHistoryInfo';
import EditPart from './AllContainer/PartsAction/EditPart';
import PartDetails from './AllContainer/PartsAction/PartDetails';
import EditSupplier from './AllContainer/SupplierActions/EditSupplier';
import SupplierDetails from './AllContainer/SupplierActions/SupplierDetails';
import SupplierReferenceObject from './AllContainer/SupplierActions/SupplierReferenceObject';
import SupplierSearch from './AllContainer/SupplierActions/SupplierSearch';
import Attachment from './AllContainer/SupplierDocumentAction/Attachment';
import DocumentHistory from './AllContainer/SupplierDocumentAction/DocumentHistory';
import DocumentHistoryInfo from './AllContainer/SupplierDocumentAction/DocumentHistoryInfo';
import SupplierDocDetails from './AllContainer/SupplierDocumentAction/SupplierDocDetails';
import SupplierDocEdit from './AllContainer/SupplierDocumentAction/SupplierDocEdit';
import Contract from './Contract';
import OnBoard from './OnBoard';
import PartManagementPage from './Pages/PartManagementPage';
import SupplierDocumentPage from './Pages/SupplierDocumentPage';
import SupplierPage from './Pages/SupplierPage';
import PartTable from './PartTable';

import { DocsContext } from '../store/DocsProvider';
import CertificateAttachment from './AllContainer/CertificateOfInsuranceActions/CertificateAttachment';
import CertificateDocDetails from './AllContainer/CertificateOfInsuranceActions/CertificateDocDetails';
import CertificateDocEdit from './AllContainer/CertificateOfInsuranceActions/CertificateDocEdit';
import CertificateDocumentHistory from './AllContainer/CertificateOfInsuranceActions/CertificateDocumentHistory';
import CertificateDocumentHistoryInfo from './AllContainer/CertificateOfInsuranceActions/CertificateDocumentHistoryInfo';
import ComplianceAttachment from './AllContainer/ComplianceCertificateActions/ComplianceAttachment';
import ComplianceDocDetails from './AllContainer/ComplianceCertificateActions/ComplianceDocDetails';
import ComplianceDocEdit from './AllContainer/ComplianceCertificateActions/ComplianceDocEdit';
import ComplianceDocumentHistory from './AllContainer/ComplianceCertificateActions/ComplianceDocumentHistory';
import ComplianceDocumentHistoryInfo from './AllContainer/ComplianceCertificateActions/ComplianceDocumentHistoryInfo';
import InvoiceAttachment from './AllContainer/InvoiceActions/InvoiceAttachment';
import InvoiceDocDetails from './AllContainer/InvoiceActions/InvoiceDocDetails';
import InvoiceDocEdit from './AllContainer/InvoiceActions/InvoiceDocEdit';
import InvoiceDocumentHistory from './AllContainer/InvoiceActions/InvoiceDocumentHistory';
import InvoiceDocumentHistoryInfo from './AllContainer/InvoiceActions/InvoiceDocumentHistoryInfo';
import SupplierHistory from './AllContainer/SupplierActions/SupplierHistory';
import SupplierHistoryInfo from './AllContainer/SupplierActions/SupplierHistoryInfo';

const RightBar = () => {
  const { type } = useContext(DocsContext);
  console.log('TYPE', type);
  let location = useLocation();
  let id = location.pathname.split('/').slice(-1)[0];
  let pid = location.pathname.split('/').slice(-2)[0];
  console.log({ id });

  console.log('PATHNAME', pid, id);

  let componentToRender = <PartTable />;

  switch (location.pathname) {
    case '/part-table':
      componentToRender = <PartTable />;
      break;
    case '/onboard-status':
      componentToRender = <OnBoard />;
      break;
    case '/contract-details':
      componentToRender = <Contract />;
      break;
    case '/create-supplier':
      componentToRender = <SupplierPage />;
      break;
    case '/create-part':
      componentToRender = <PartManagementPage />;
      break;
    case `/part-details/${id}`:
      if (id) {
        componentToRender = <PartDetails id={id} />;
      }
      break;
    case `/bom-structure/${id}`:
      if (id) {
        componentToRender = <Structure id={id} />;
      }
      break;

    case `/part-history/${id}`:
      if (id) {
        componentToRender = <PartHistory id={id} />;
      }
      break;

    case `/part-historyInfo/${pid}/${id}`:
      if (id) {
        componentToRender = <PartHistoryInfo pid={pid} id={id} />;
      }
      break;
    case `/edit-part/${id}`:
      if (id) {
        componentToRender = <EditPart id={id} />;
      }
      break;
    case `/edit-supplier/${id}`:
      if (id) {
        componentToRender = <EditSupplier id={id} />;
      }
      break;
    case `/supplier-details/${id}`:
      if (id) {
        componentToRender = <SupplierDetails id={id} />;
      }
      break;

      case `/supplier-history/${id}`:
      if (id) {
        componentToRender = <SupplierHistory id={id} />;
      }
      break;

      case `/supplier-historyInfo/${pid}/${id}`:
        if (id) {
          componentToRender = <SupplierHistoryInfo pid={pid} id={id} />;
        }
        break;

    case `/reference-object/${id}`:
      if (id) {
        componentToRender = <SupplierReferenceObject id={id} />;
      }
      break;
    case '/supplier-documents':
      componentToRender = <SupplierDocumentPage />;
      break;

    case `/supplier-document-details/${id}`:
      if (id) {
        componentToRender = <SupplierDocDetails id={id} />;
      }
      break;
    case `/supplier-document-edit/${id}`:
      if (id) {
        componentToRender = <SupplierDocEdit id={id} document_type='He' />;
      }
      break;
    case `/attachment/${id}`:
      if (id) {
        componentToRender = <Attachment id={id} />;
      }
      break;

    case `/document-history/${id}`:
      if (id) {
        componentToRender = <DocumentHistory id={id} />;
      }
      break;

    case `/document-historyInfo/${pid}/${id}`:
      if (id) {
        componentToRender = <DocumentHistoryInfo pid={pid} id={id} />;
      }
      break;

    case `/compliance-documents-details/${id}`:
      if (id) {
        componentToRender = <ComplianceDocDetails id={id} />;
      }
      break;
    case `/compliance-document-history/${id}`:
      if (id) {
        componentToRender = <ComplianceDocumentHistory id={id} />;
      }
      break;
    case `/compliance-attachment/${id}`:
      if (id) {
        componentToRender = <ComplianceAttachment id={id} />;
      }
      break;
    case `/compliance-document-historyInfo/${pid}/${id}`:
      if (id) {
        componentToRender = <ComplianceDocumentHistoryInfo id={id} pid={pid} />;
      }
      break;
      case `/compliance-document-edit/${id}`:
      if (id) {
        componentToRender = <ComplianceDocEdit id={id} />;
      }
      break;

      case `/invoice-documents-details/${id}`:
        if (id) {
          componentToRender = <InvoiceDocDetails id={id} />;
        }
        break;
      case `/invoice-document-history/${id}`:
        if (id) {
          componentToRender = <InvoiceDocumentHistory id={id} />;
        }
        break;
      case `/invoice-attachment/${id}`:
        if (id) {
          componentToRender = <InvoiceAttachment id={id} />;
        }
        break;
      case `/invoice-document-historyInfo/${pid}/${id}`:
        if (id) {
          componentToRender = <InvoiceDocumentHistoryInfo id={id} pid={pid} />;
        }
        break;
        case `/invoice-document-edit/${id}`:
        if (id) {
          componentToRender = <InvoiceDocEdit id={id} />;
        }
        break;

        case `/certificate-documents-details/${id}`:
        if (id) {
          componentToRender = <CertificateDocDetails id={id} />;
        }
        break;
      case `/certificate-document-history/${id}`:
        if (id) {
          componentToRender = <CertificateDocumentHistory id={id} />;
        }
        break;
      case `/certificate-attachment/${id}`:
        if (id) {
          componentToRender = <CertificateAttachment id={id} />;
        }
        break;
      case `/certificate-document-historyInfo/${pid}/${id}`:
        if (id) {
          componentToRender = <CertificateDocumentHistoryInfo id={id} pid={pid} />;
        }
        break;
        case `/certificate-document-edit/${id}`:
        if (id) {
          componentToRender = <CertificateDocEdit id={id} />;
        }
        break;

        case '/search-supplier':
          componentToRender = <SupplierSearch/>;
          break; 

        

    default:
      componentToRender = <PartTable />;
  }

  return <div className={styles.rightbarConatiner}>{componentToRender}</div>;
};

export default RightBar;
