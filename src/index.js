import React from 'react';
import ReactDOM from 'react-dom';
import './fonts.css';
import './index.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Layout from './components/Template/Layout';
import Inicio from './components/Inicio';
import Estudiantes from './components/Estudiantes';
import Profesores from './components/Profesores';
import Nacionales from './components/Nacionales';
import Internacionales from './components/Internacionales';
import Reportes from './components/Reportes';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Provider} from 'react-redux'
import generateStore from './redux/store'
import Custom from './components/Example/Custom'
const store = generateStore()

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Inicio />} />
              <Route path="estudiantes" element={<Estudiantes />} />
              <Route path="example" element={<Custom />} />
              <Route path="profesores" element={<Profesores />} />
              <Route path="postgrados-nacionales" element={<Nacionales />} />
              <Route path="postgrados-internacionales" element={<Internacionales />} />
              <Route path="reportes" element={<Reportes />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>      
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);