import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter, Row, Col } from "reactstrap"
import Swal from 'sweetalert2'


const modeloUsuario = {
    idUsuario: 0,
    nombre : "",
    correo :"",
    telefono :"",
    idRol :0,
    clave :"",
    esActivo :true
}

const Usuario = () => {

    const [usuario, setUsuario] = useState(modeloUsuario);
    const [pendiente, setPendiente] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [verModal, setVerModal] = useState(false);

    const handleChange = (e) => {

        console.log(e.target.value )

        let value;

        if (e.target.name == "idRol") {
            value = e.target.value
        } else if (e.target.name == "esActivo") {
            value = (e.target.value == "true" ? true : false)
        } else {
            value = e.target.value;
        }

        setUsuario({
            ...usuario,
            [e.target.name]: value
        })
    }


    const obtenerRoles = async () => {
        let response = await fetch("api/rol/Lista");
        if (response.ok) {
            let data = await response.json()
            setRoles(data)
        }
    }

    const obtenerUsuarios = async () => {
        let response = await fetch("api/usuario/Lista");

        if (response.ok) {
            let data = await response.json()
            setUsuarios(data)
            setPendiente(false)
        }
    }

    useEffect(() => {
        obtenerRoles();
        obtenerUsuarios();
    }, [])

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: row => row.correo,
            sortable: true,
        },
        {
            name: 'Telefono',
            selector: row => row.telefono,
            sortable: true,
        },
        {
            name: 'Rol',
            selector: row => row.idRolNavigation,
            sortable: true,
            cell: row => (row.idRolNavigation.descripcion)
        },
        {
            name: 'Estado',
            selector: row => row.esActivo,
            sortable: true,
            cell: row => {
                let clase;
                clase = row.esActivo ? "badge badge-info p-2" : "badge badge-danger p-2"
                return (
                    <span className={clase}>{row.esActivo ? "Activo" : "No Activo"}</span>
                )
            }
        },
        {
            name: '',
            cell: row => (
                <>
                    <Button color="primary" size="sm" className="mr-2"
                        onClick={() => abrirEditarModal(row)}
                    >
                        <i className="fas fa-pen-alt"></i>
                    </Button>

                    <Button color="danger" size="sm"
                        onClick={() => eliminarUsuario(row.idUsuario)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </>
            ),
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '13px',
                fontWeight: 800,
            },
        },
        headRow: {
            style: {
                backgroundColor: "#eee",
            }
        }
    };

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const abrirEditarModal = (data) => {
        setUsuario(data);
        setVerModal(!verModal);
    }

    const cerrarModal = () => {
        setUsuario(modeloUsuario)
        setVerModal(!verModal);
    }

    const guardarCambios = async () => {

        delete usuario.idRolNavigation;

        let response;
        if (usuario.idUsuario == 0) {
            response = await fetch("api/usuario/Guardar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(usuario)
            })

        } else {
            response = await fetch("api/usuario/Editar", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(usuario)
            })
        }

        if (response.ok) {
            await obtenerUsuarios();
            setUsuario(modeloUsuario)
            setVerModal(!verModal);

        } else {
            alert("error al guardar")
        }

    }

    const eliminarUsuario = async (id) => {

        Swal.fire({
            title: 'Esta seguro?',
            text: "Desea eliminar el usuario",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {

                const response = fetch("api/usuario/Eliminar/" + id, { method: "DELETE" })
                    .then(response => {
                        if (response.ok) {

                            obtenerUsuarios();

                            Swal.fire(
                                'Eliminado!',
                                'El usuario fue eliminado.',
                                'success'
                            )
                        }
                    })
            }
        })
    }


    return (
        <>
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
                    Lista de Usuarios
                </CardHeader>
                <CardBody>
                    <Button color="success" size="sm" onClick={() => setVerModal(!verModal)}>Nuevo Usuario</Button>
                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={usuarios}
                        progressPending={pendiente}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>

            <Modal isOpen={verModal}>
                <ModalHeader>
                    Detalle Usuario
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Label>Nombre</Label>
                                <Input bsSize="sm" name="nombre" onChange={handleChange} value={usuario.nombre} />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <Label>Correo</Label>
                                <Input bsSize="sm" name="correo" onChange={handleChange} value={usuario.correo} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Label>Telefono</Label>
                                <Input bsSize="sm" name="telefono" onChange={handleChange} value={usuario.telefono} />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <Label>Rol</Label>
                                <Input bsSize="sm" type={"select"} name="idRol" onChange={handleChange} value={usuario.idRol} >
                                    <option value={0}>Seleccionar</option>
                                    {
                                        roles.map((item) => (<option key={item.idRol} value={item.idRol}>{item.descripcion}</option>))
                                    }

                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" >
                            <FormGroup>
                                <Label>Contraseña</Label>
                                <Input bsSize="sm" name="clave" onChange={handleChange} value={usuario.clave} type="password" />
                            </FormGroup>
                        </Col>
                        <Col sm="6" >
                            <FormGroup>
                                <Label>Estado</Label>
                                <Input bsSize="sm" type={"select"} name="esActivo" onChange={handleChange} value={usuario.esActivo} >
                                    <option value={true}>Activo</option>
                                    <option value={false}>No Activo</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                   
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary" onClick={guardarCambios}>Guardar</Button>
                    <Button size="sm" color="danger" onClick={cerrarModal}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Usuario;