import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App';
import Categoria from './views/Categoria';
import DashBoard from './views/DashBoard';
import HistorialVenta from './views/HistorialVenta';
import Inicio from './views/Inicio';
import NotFound from './views/NotFound';
import Producto from './views/Producto';
import ReporteVenta from './views/ReporteVenta';
import Usuario from './views/Usuario';
import Venta from './views/Venta';
import Login from './views/Login';

import UserProvider from "./context/UserProvider"
import VerificarUsuario from './componentes/VerificarUsuario';


const root = ReactDOM.createRoot(document.getElementById('wrapper'));

root.render(
    <BrowserRouter>
        <UserProvider>
            <Routes>

                {/*ACONTINUACION ESTABLECEMOS LAS RUTAS DE NUESTRO SISTEMA*/}

                {/*ruta individual sin usar una como base*/}
                <Route index path='/Login' element={<Login />} />

                {/*Permite anidar rutas en base a una*/}
                <Route path='/' element={<App />}>

                    <Route index element={<Inicio />} />
                    <Route path='dashboard' element={<VerificarUsuario> <DashBoard /> </VerificarUsuario>} />
                    <Route path='usuario' element={<VerificarUsuario> <Usuario /> </VerificarUsuario>} />
                    <Route path='producto' element={<VerificarUsuario> <Producto /> </VerificarUsuario>} />
                    <Route path='categoria' element={<VerificarUsuario> <Categoria /> </VerificarUsuario>} />
                    <Route path='venta' element={<VerificarUsuario> <Venta /> </VerificarUsuario>} />
                    <Route path='historialventa' element={<VerificarUsuario> <HistorialVenta /> </VerificarUsuario>} />
                    <Route path='reporteventa' element={<VerificarUsuario > <ReporteVenta /> </VerificarUsuario>} />

                </Route>
                <Route path='*' element={<NotFound />} />
                
            </Routes>

        </UserProvider>
       

    </BrowserRouter>
);

