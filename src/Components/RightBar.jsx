import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../style.module.css';
import Structure from './AllContainer/BomStructure/Structure';
import PartHistory from './AllContainer/History/PartHistory';
import PartHistoryInfo from './AllContainer/History/PartHistoryInfo';
import EditPart from './AllContainer/PartsAction/EditPart';
import PartDetails from './AllContainer/PartsAction/PartDetails';
import SupplierDetails from './AllContainer/SupplierActions/SupplierDetails';
import SupplierReferenceObject from './AllContainer/SupplierActions/SupplierReferenceObject';
import Contract from './Contract';
import OnBoard from './OnBoard';
import PartManagementPage from './Pages/PartManagementPage';
import SupplierPage from './Pages/SupplierPage';
import PartTable from './PartTable';
import EditSupplier from './AllContainer/SupplierActions/EditSupplier';
import SupplierDocumentPage from './Pages/SupplierDocumentPage';
import SupplierDocDetails from './AllContainer/SupplierDocumentAction/SupplierDocDetails';
import SupplierDocEdit from './AllContainer/SupplierDocumentAction/SupplierDocEdit';
import Attachment from './AllContainer/SupplierDocumentAction/Attachment';
import DocumentHistory from './AllContainer/SupplierDocumentAction/DocumentHistory';
import DocumentHistoryInfo from './AllContainer/SupplierDocumentAction/DocumentHistoryInfo';

const RightBar = () => {
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

    case `/reference-object/${id}`:
      if (id) {
        componentToRender = <SupplierReferenceObject id={id} />;
      }
      break;
    case '/supplier-documents':
      componentToRender = <SupplierDocumentPage/>
      break

    case `/supplier-document-details/${id}`:
      if(id){
        componentToRender = <SupplierDocDetails id={id}/>
      }
      break;
      case `/supplier-document-edit/${id}`:
        if(id){
          componentToRender = <SupplierDocEdit id={id}/>
        }
        break;
        case `/attachment/${id}`:
        if(id){
          componentToRender = <Attachment id={id}/>
        }
        break;

        case `/document-history/${id}`:
        if(id){
          componentToRender = <DocumentHistory id={id}/>
        }
        break;

        case `/document-historyInfo/${pid}/${id}`:
          if(id){
            componentToRender = <DocumentHistoryInfo pid={pid} id={id} />
          }
          break;

    default:
      componentToRender = <PartTable />;
  }

  return <div className={styles.rightbarConatiner}>{componentToRender}</div>;
};

export default RightBar;
