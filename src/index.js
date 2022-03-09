import React from 'react';
import ReactDOM from 'react-dom';
import './fonts.css'
//import App from './App';
import Appbar from './components/Appbar'
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Appbar />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);