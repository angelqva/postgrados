import React from 'react';
import ReactDOM from 'react-dom';
import './fonts.css';
import './index.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Layout from './components/Template/Layout';
import Inicio from './components/Inicio/index';
import Estudiantes from './components/Estudiantes/index';
import Profesores from './components/Profesores/index';
import { BrowserRouter, Routes, Route } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Inicio />} />
            <Route path="estudiantes" element={<Estudiantes />} />
            <Route path="profesores" element={<Profesores />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);