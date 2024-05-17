import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import CategoryProvider from './store/CategoryProvider';
import { PartsProvider } from './store/PartsProvider';
import { UserProvider } from './store/UserProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PartsProvider>
      <CategoryProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CategoryProvider>
    </PartsProvider>
  </React.StrictMode>
);

reportWebVitals();
