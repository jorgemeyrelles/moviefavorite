import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import { MoviesProvider } from './context/MoviesContext';

ReactDOM.render(
  <BrowserRouter>
    {/* <MoviesProvider> */}
      <App />
    {/* </MoviesProvider> */}
  </BrowserRouter>,
  document.getElementById('root')
);
