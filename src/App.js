import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Container from './Components/Container';


function App() {
  return (
    <div className="App">
      <Router>
       <Container/>
        <Routes>
          <Route path="/part-table" element={<></>} />
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
          <Route path="/reference-object/:id" element={<></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
