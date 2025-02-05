import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import the main App component

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
