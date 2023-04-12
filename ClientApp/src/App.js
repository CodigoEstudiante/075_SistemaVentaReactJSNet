import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from './componentes/NavBar'
import { Link } from 'react-router-dom';
import { UserContext } from './context/UserProvider';
import Swal from 'sweetalert2'
import { useState } from 'react';

const modelo = {
    nombre: "",
    correo: "",
    idRolNavigation: {
        idRol: 0,
        descripcion: ""
    }
}

const App = () => {
    const { user, cerrarSession } = useContext(UserContext)

    if (user == null) {
        return <Navigate to="/Login" />
    }

    const mostrarModalSalir = () => {

        Swal.fire({
            title: 'Esta por salir',
            text: "Desea cerrar sesion?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                cerrarSession()
            }
        })

    }



    return (
        <>

            <NavBar />

            {/*Content Wrapper*/}
            <div id="content-wrapper" className="d-flex flex-column">

                {/*Main Content*/}
                <div id="content">
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    {/* Sidebar Toggle (Topbar) */}
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>

                    {/* Topbar Navbar */}
                    <ul className="navbar-nav ml-auto">

                        <div className="topbar-divider d-none d-sm-block"></div>

                        {/* Nav Item - User Information */}
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{ JSON.parse(user).correo }</span>
                                    <img className="img-profile rounded-circle"
                                        src={"./imagen/Foto003.jpg"} />
                            </a>
                            {/* Dropdown - User Information */}
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <Link className="dropdown-item" to="/">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Perfil
                                </Link>
                                <div className="dropdown-divider"></div>
                                    <button className="dropdown-item" onClick={mostrarModalSalir}>
                                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                      Salir
                                  </button>
                            </div>
                        </li>

                    </ul>

                </nav>
                    <div className="container-fluid">

                        <Outlet />

                    </div>
                </div>
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Your Website 2020</span>
                        </div>
                    </div>
                </footer>
            </div>

               
        </>
        )
}

export default App