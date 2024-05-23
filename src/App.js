import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Container from './Components/Container';
import Login from './Components/Form/Authentication/Login';
import ControlPage from './Components/Form/Authentication/ControlPage';

function App() {
  return (
    <div className="App">
      <Router>
       {/* <Container/> */}
        <Routes>
          <Route path="/part-table" element={<></>} />
          <Route path="/search-supplier" element={<></>} />
          <Route path="/create-supplier" element={<></>} />
          <Route path="/onboard-status" element={<></>} />
          <Route path="/contract-details" element={<></>} />
          <Route path="/create-part" element={<></>} />
          <Route path="/details/:id" element={<></>} />
          <Route path="/part-details/:id" element={<></>} />
          <Route path="/bom-structure/:id" element={<></>} />
          <Route path="/part-history/:id" element={<></>} />
          <Route path="/part-historyInfo/:pid/:cid" element={<></>} />
          <Route path="/edit-part/:id" element={<></>} />
          <Route path="/edit-supplier/:id" element={<></>} />
          <Route path="/supplier-details/:id" element={<></>} />
          <Route path="/supplier-history/:id" element={<></>} />
          <Route path="/part-historyInfo/:pid/:cid" element={<></>} />

          <Route path="/reference-object/:id" element={<></>} />
          <Route path="/supplier-documents" element={<></>} />
          <Route path='/supplier-documents-details/:id' element={<></>}/>
          <Route path='/supplier-documents-edit/:id' element={<></>}/>
          <Route path='/attachment/:id' element={<></>} />
          <Route path='/document-history/:id' element={<></>}/>
          <Route path='/document-historyInfo/:pid/:cid' element={<></>}/>
          <Route path='/compliance-documents-details/:id' element={<></>}/>
          <Route path='/compliance-document-history/:id' element={<></>}/>
          <Route path='/compliance-document-historyInfo/:pid/:cid' element={<></>}/>
          <Route path='/compliance-attachment/:id' element={<></>} />
          <Route path='/compliance-documents-edit/:id' element={<></>}/>

          <Route path='/invoice-documents-details/:id' element={<></>}/>
          <Route path='/invoice-document-history/:id' element={<></>}/>
          <Route path='/invoice-document-historyInfo/:pid/:cid' element={<></>}/>
          <Route path='/invoice-attachment/:id' element={<></>} />
          <Route path='/invoice-documents-edit/:id' element={<></>}/>

          <Route path='/certificate-documents-details/:id' element={<></>}/>
          <Route path='/certificate-document-history/:id' element={<></>}/>
          <Route path='/certificate-document-historyInfo/:pid/:cid' element={<></>}/>
          <Route path='/certificate-attachment/:id' element={<></>} />
          <Route path='/certificate-documents-edit/:id' element={<></>}/>

          <Route path='/login' element={<Login/>}/>
          <Route path='/control-page' element={<ControlPage/>}/>
         

          




        </Routes>
      </Router>
      <Toaster richColors/>
    </div>
  );
}

export default App;
