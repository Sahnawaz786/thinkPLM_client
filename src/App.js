import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Container from './Components/Container';
import ControlPage from './Components/Form/Authentication/ControlPage';
import Login from './Components/Form/Authentication/Login';
import Tier1 from './Components/Form/Supplier/Tier1';
import Tier2 from './Components/Form/Supplier/Tier2';

function App() {
  const token = localStorage.getItem('token');
  let isLoggedIn =Boolean(token);
  return (
    <div className="App">
      <Router>
       
          <Routes>
          {isLoggedIn ? <>
          <Route path="/part-table" element={<Container/>} />
          <Route path="/search-supplier" element={<Container/>} />
          <Route path="/create-supplier" element={<Container/>} />
          <Route path="/onboard-status" element={<Container/>} />
          <Route path="/contract-details" element={<Container/>} />
          <Route path="/create-part" element={<Container/>} />
          <Route path="/details/:id" element={<Container/>} />
          <Route path="/part-details/:id" element={<Container/>} />
          <Route path="/bom-structure/:id" element={<Container/>} />
          <Route path="/part-history/:id" element={<Container/>} />
          <Route path="/part-historyInfo/:pid/:cid" element={<Container/>} />
          <Route path="/edit-part/:id" element={<Container/>} />
          <Route path="/edit-supplier/:id" element={<Container/>} />
          <Route path="/supplier-details/:id" element={<Container/>} />
          <Route path="/supplier-history/:id" element={<Container/>} />
          <Route path="/part-historyInfo/:pid/:cid" element={<Container/>} />
          <Route path="/document-table" element={<Container/>} />

          <Route path="/reference-object/:id" element={<Container/>} />
          <Route path="/supplier-documents" element={<Container/>} />
          <Route path='/supplier-document-details/:id' element={<Container/>}/>
          <Route path='/supplier-document-edit/:id' element={<Container/>}/>
          <Route path='/attachment/:id' element={<Container/>} />
          <Route path='/document-history/:id' element={<Container/>}/>
          <Route path='/document-historyInfo/:pid/:cid' element={<Container/>}/>
          <Route path='/compliance-documents-details/:id' element={<Container/>}/>
          <Route path='/compliance-document-history/:id' element={<Container/>}/>
          <Route path='/compliance-document-historyInfo/:pid/:cid' element={<Container/>}/>
          <Route path='/compliance-attachment/:id' element={<Container/>} />
          <Route path='/compliance-document-edit/:id' element={<Container/>}/>

          <Route path='/invoice-documents-details/:id' element={<Container/>}/>
          <Route path='/invoice-document-history/:id' element={<Container/>}/>
          <Route path='/invoice-document-historyInfo/:pid/:cid' element={<Container/>}/>
          <Route path='/invoice-attachment/:id' element={<Container/>} />
          <Route path='/invoice-document-edit/:id' element={<Container/>}/>

          <Route path='/certificate-documents-details/:id' element={<Container/>}/>
          <Route path='/certificate-document-history/:id' element={<Container/>}/>
          <Route path='/certificate-document-historyInfo/:pid/:cid' element={<Container/>}/>
          <Route path='/certificate-attachment/:id' element={<Container/>} />
          <Route path='/certificate-document-edit/:id' element={<Container/>}/>

          <Route path='/' element={<Container />}/>
          <Route path='/control-page' element={<ControlPage/>}/>

          {/* POP UP */}
          <Route path='/supplier-tier1' element={<Tier1 />}/>
          <Route path='/supplier-tier2' element={<Tier2 />}/>
          </>:null}

          {!isLoggedIn ?<Route path='/login' element={<Login/>}/>:null }
          
        </Routes>
       
        
      </Router>
      <Toaster richColors  position="top-center"/>
    </div>
  );
}

export default App;
