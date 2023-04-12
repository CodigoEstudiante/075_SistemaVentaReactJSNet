import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter } from "reactstrap"
import Swal from 'sweetalert2'

const modeloCategoria = {
    idCategoria:0,
    descripcion: "",
    esActivo: true
}

const Categoria = () => {

    const [categoria, setCategoria] = useState(modeloCategoria);
    const [pendiente, setPendiente] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [verModal, setVerModal] = useState(false);

    const handleChange = (e) => {
        let value = e.target.nodeName === "SELECT" ? (e.target.value == "true" ? true : false) : e.target.value;

        setCategoria({
            ...categoria,
            [e.target.name]: value
        })
    }

    const obtenerCategorias = async () => {
        let response = await fetch("api/categoria/Lista");

        if (response.ok) {
            let data = await response.json()
            setCategorias(data)
            setPendiente(false)
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])


    const columns = [
        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true,
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
                        onClick={() => abrirEditarModal(row) }
                    >
                        <i className="fas fa-pen-alt"></i>
                    </Button>

                    <Button color="danger" size="sm"
                        onClick={ () => eliminarCategoria(row.idCategoria)}
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
        setCategoria(data);
        setVerModal(!verModal);
    }

    const cerrarModal = () => {
        setCategoria(modeloCategoria)
        setVerModal(!verModal);
    }

    const guardarCambios = async () => {

        let response;
        if (categoria.idCategoria == 0) {
            response = await fetch("api/categoria/Guardar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(categoria)
            })
           
        } else {
            response = await fetch("api/categoria/Editar", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(categoria)
            })
        }

        if (response.ok) {
            await obtenerCategorias();
            setCategoria(modeloCategoria)
            setVerModal(!verModal);

        } else {
            alert("error al guardar")
        }

    }


    const eliminarCategoria = async(id) => {

        Swal.fire({
            title: 'Esta seguro?',
            text: "Desesa eliminar esta categoria",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {

                const response = fetch("api/categoria/Eliminar/" + id, { method: "DELETE" })
                    .then( response => {
                        if (response.ok) {

                            obtenerCategorias();

                            Swal.fire(
                                'Eliminado!',
                                'La categoria fue eliminada.',
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
                    Lista de Categorias
                </CardHeader>
                <CardBody>
                    <Button color="success" size="sm" onClick={() => setVerModal(!verModal) }>Nueva Categoria</Button>
                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={categorias}
                        progressPending={pendiente}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={ customStyles}
                    />
                </CardBody>
            </Card>

            <Modal isOpen={verModal}>
                <ModalHeader>
                    Detalle Categoria
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input bsSize="sm" name="descripcion" onChange={handleChange} value={categoria.descripcion}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Estado</Label>
                        <Input bsSize="sm" type={"select"} name="esActivo" onChange={handleChange} value={categoria.esActivo} >
                            <option value={true}>Activo</option>
                            <option value={false}>No Activo</option>
                        </Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary" onClick={guardarCambios}>Guardar</Button>
                    <Button size="sm" color="danger" onClick={cerrarModal}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </>
        


    )
}

export default Categoria;