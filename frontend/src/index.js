// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { GlobalStyle } from "./styles/GlobalStyle";
// import { GlobalProvider } from "./context/globalContext";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <GlobalStyle />
//       <GlobalProvider>
//         <App />
//       </GlobalProvider>
    
//   </React.StrictMode>
// );
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
//
// import { ContextProvider } from './context/Contex';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render (
  
//   <React.StrictMode>
//   <ContextProvider>
//   <App />
//   </ContextProvider>
    
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';
import { ContextProvider } from './context/Contex';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </GlobalProvider>
  </React.StrictMode>
);
