import React from 'react';
import ReactDOM from 'react-dom';
import './fonts.css'
import './index.css'
//import Inicio from './components/Inicio/Inicio';
import Appbar from './components/Appbar'
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Appbar />
      {/* <Inicio /> */}
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);