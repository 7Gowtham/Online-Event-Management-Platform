import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from "react-hot-toast"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const consoleError = console.error;
console.error = (message, ...args) => {
  if (message.includes('Support for defaultProps will be removed from function components')) {
    return;
  }
  consoleError(message, ...args);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster/>
  </React.StrictMode>
)
