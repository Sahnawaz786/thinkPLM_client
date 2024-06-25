import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import AddExistingPart from './Components/AllContainer/BomStructure/AddExistingPart';
import CreateNewPart from './Components/AllContainer/BomStructure/CreateNewPart';
import CertificateDocEdit from './Components/AllContainer/CertificateOfInsuranceActions/CertificateDocEdit';
import ComplianceDocEdit from './Components/AllContainer/ComplianceCertificateActions/ComplianceDocEdit';
import InvoiceDocEdit from './Components/AllContainer/InvoiceActions/InvoiceDocEdit';
import EditPart from './Components/AllContainer/PartsAction/EditPart';
import EditSupplier from './Components/AllContainer/SupplierActions/EditSupplier';
import SupplierDocEdit from './Components/AllContainer/SupplierDocumentAction/SupplierDocEdit';
import AddUser from './Components/AllContainer/UserManagement/AddUser';
import EditUser from './Components/AllContainer/UserManagement/EditUser';
import Container from './Components/Container';
import ControlPage from './Components/Form/Authentication/ControlPage';
import Login from './Components/Form/Authentication/Login';
import SignUp from './Components/Form/Authentication/SignUp';
import CustomParts from './Components/Form/Parts/CustomParts';
import StandardParts from './Components/Form/Parts/StandardParts';
import ManufacturerForm from './Components/Form/Supplier/ManufacturerForm';
import Tier1 from './Components/Form/Supplier/Tier1';
import Tier2 from './Components/Form/Supplier/Tier2';
import VendorForm from './Components/Form/Supplier/VendorForm';
import CertificateOFInsurance from './Components/Form/SupplierDocument/CertificateOFInsurance';
import ComplianceCertificate from './Components/Form/SupplierDocument/ComplianceCertificate';
import Invoices from './Components/Form/SupplierDocument/Invoice';
import SupplierContract from './Components/Form/SupplierDocument/SupplierContract';
import PartManagementPage from './Components/Pages/PartManagementPage';
import SupplierPage from './Components/Pages/SupplierPage';


function App() {
  const token = localStorage.getItem('accessToken');
  let isLoggedIn =Boolean(token);
  return (
    <div className="App">
      <Router>
       
          <Routes>
          {isLoggedIn ? <>
          <Route path="/part-table" element={<Container/>} />
          <Route path="/search-supplier" element={<Container/>} />
          <Route path="/create-supplier" element={<SupplierPage/>} />
          <Route path="/onboard-status" element={<Container/>} />
          <Route path="/contract-details" element={<Container/>} />
          <Route path="/create-part" element={<PartManagementPage/>} />
          <Route path="/details/:id" element={<Container/>} />
          <Route path="/part-details/:id" element={<Container/>} />
          <Route path="/bom-structure/:id" element={<Container/>} />
          <Route path="/part-history/:id" element={<Container/>} />
          <Route path="/part-historyInfo/:pid/:cid" element={<Container/>} />
          <Route path="/supplier-details/:id" element={<Container/>} />
          <Route path="/supplier-history/:id" element={<Container/>} />
          <Route path="/supplier-historyInfo/:id/:pid" element={<Container/>} />

          <Route path="/part-historyInfo/:pid/:cid" element={<Container/>} />
          <Route path="/document-table" element={<Container/>} />
          <Route path='/global-search' element={<Container/>} />

          <Route path="/reference-object/:id" element={<Container/>} />
          <Route path="/supplier-documents" element={<Container/>} />
          <Route path='/supplier-document-details/:id' element={<Container/>}/>
          <Route path='/attachment/:id' element={<Container/>} />
          <Route path='/document-history/:id' element={<Container/>}/>
          <Route path='/document-historyInfo/:pid/:cid' element={<Container/>}/>
          <Route path='/compliance-documents-details/:id' element={<Container/>}/>
          <Route path='/compliance-document-history/:id' element={<Container/>}/>
          <Route path='/compliance-document-historyInfo/:pid/:cid' element={<Container/>}/>
          <Route path='/compliance-attachment/:id' element={<Container/>} />

          <Route path='/invoice-documents-details/:id' element={<Container/>}/>
          <Route path='/invoice-document-history/:id' element={<Container/>}/>
          <Route path='/invoice-document-historyInfo/:pid/:cid' element={<Container/>}/>
          <Route path='/invoice-attachment/:id' element={<Container/>} />

          <Route path='/certificate-documents-details/:id' element={<Container/>}/>
          <Route path='/certificate-document-history/:id' element={<Container/>}/>
          <Route path='/certificate-document-historyInfo/:pid/:cid' element={<Container/>}/>
          <Route path='/certificate-attachment/:id' element={<Container/>} />
          <Route path='/user-management' element={<Container/>}/>
          <Route path='/edit-user/:id' element={<EditUser/>}/>
          <Route path='/task' element={<Container/>}/>
          <Route path='/suppliers' element={<Container/>} />
          <Route path='/user-details/:id' element={<Container/>} />




          <Route path='/' element={<Container />}/>
          <Route path='/control-page' element={<ControlPage/>}/>

          {/* POP UP */}
          <Route path='/sign-up' element={<SignUp/>} />
          {/* Supplier popup */}
          <Route path='/supplier-tier1' element={<Tier1 />}/>
          <Route path='/supplier-tier2' element={<Tier2 />}/>
          <Route path='/supplier-manufacturer' element={<ManufacturerForm />}/>
          <Route path='/supplier-vendor' element={<VendorForm />}/>
          <Route path="/edit-part/:id" element={<EditPart />} />
          <Route path="/edit-supplier/:id" element={<EditSupplier/>} />


          {/* Parts popup */}
          <Route path='/standard-parts' element={<StandardParts />}/>
          <Route path='/custom-parts' element={<CustomParts />}/>

          {/* BOM popup */}
          <Route path='/add-existing-bom-part/:id' element={<AddExistingPart />}/>
          <Route path='/add-new-bom-part/:id' element={<CreateNewPart />}/>
          {/* Document */}
          <Route path='/supplier-contract' element={<SupplierContract />}/>
          <Route path='/supplier-invoice' element={<Invoices />}/>
          <Route path='/supplier-certificate-of-insurance' element={<CertificateOFInsurance />}/>
          <Route path='/supplier-compliance-certificate' element={<ComplianceCertificate />}/>
          {/* Document Edit */}
          <Route path='/supplier-document-edit/:id' element={<SupplierDocEdit/>}/>
          <Route path='/compliance-document-edit/:id' element={<ComplianceDocEdit />}/>
          <Route path='/invoice-document-edit/:id' element={<InvoiceDocEdit/>}/>
          <Route path='/certificate-document-edit/:id' element={<CertificateDocEdit />}/>

          {/* User Management  */}
          <Route path='/add-users' element={<AddUser />}/>
          
          <Route path='/edit-user/:id' element={<EditUser />}/>

          </>:null}

          {!isLoggedIn ?<Route path='/login' element={<Login/>}/>:null }
          {!isLoggedIn ?<Route path='/' element={<Login/>}/>:null }
          
        </Routes>
       
        
      </Router>
      <Toaster richColors  position="top-center"/>
    </div>
  );
}

export default App;
