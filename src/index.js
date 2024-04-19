import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import CategoryProvider from './store/CategoryProvider';
import { UserProvider } from './store/UserProvider';
import { PartsProvider } from './store/PartsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CategoryProvider>
      <UserProvider>
        <PartsProvider>
        <App />
        </PartsProvider>
      </UserProvider>
    </CategoryProvider>
  </React.StrictMode>
);

reportWebVitals();
