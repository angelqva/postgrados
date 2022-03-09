import React from 'react';
import ReactDOM from 'react-dom';
import './fonts.css'
import './index.css'
import { StyledEngineProvider } from '@mui/material/styles';
import Appbar from './components/Appbar'
//import Inicio from './components/Inicio/index';
import Estudiantes from './components/Estudiantes/index'




ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Appbar />
      {/* <Inicio /> */}
      <Estudiantes/>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);