
import { Card, CardBody, CardHeader, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row, Table, Button,Modal,ModalHeader,ModalBody,ModalFooter } from "reactstrap";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2'

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";


const HistorialVenta = () => {
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [nroVenta,setNumeroVenta] = useState("")
    const [buscarPor, setBuscarPor] = useState("fecha")

    const [verModal,setVerModal] = useState(false)
    const [detalleVenta, setDetalleVenta] = useState({})

    const [ventas,setVentas] = useState([])

    const buscarVenta = () => {
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        let _fechaInicio = fechaInicio.toLocaleDateString('es-PE', options)
        let _fechaFin = fechaFin.toLocaleDateString('es-PE', options)

        const api = fetch(`api/venta/Listar?buscarPor=${buscarPor}&numeroVenta=${nroVenta}&fechaInicio=${_fechaInicio}&fechaFin=${_fechaFin}`)
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                var data = dataJson;
                if (data.length < 1) {
                    Swal.fire(
                        'Opps!',
                        'No se encontraron resultados',
                        'warning'
                    )
                }
                setVentas(data);
            }).catch((error) => {
                setVentas([]);
                Swal.fire(
                    'Opps!',
                    'No se pudo encontrar información',
                    'error'
                )
            })

    }

    const mostrarModal = (data) => {
        setDetalleVenta(data)
        setVerModal(!verModal);
    }

    
    return (
        <>
            <Row>
                <Col sm={12}>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
                            Historial de ventas
                        </CardHeader>
                        <CardBody>
                            <Row className="align-items-end">
                                <Col sm={3}>
                                    <FormGroup>
                                        <Label>Buscar por: </Label>
                                        <Input type="select" bsSize="sm" onChange={(e) => setBuscarPor(e.target.value)}
                                            value={buscarPor}
                                        >
                                            <option value="fecha">Fechas</option>
                                            <option value="numero">Numero Venta</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                {
                                    (buscarPor == "fecha") ? (
                                        <>
                                            <Col sm={3}>
                                                <FormGroup>
                                                    <Label>Fecha Inicio:</Label>
                                                    <DatePicker
                                                        className="form-control form-control-sm"
                                                        selected={fechaInicio}
                                                        onChange={(date) => setFechaInicio(date)}
                                                        dateFormat='dd/MM/yyyy'
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col sm={3}>
                                                <FormGroup>
                                                    <Label>Fecha Fin:</Label>
                                                    <DatePicker
                                                        className="form-control form-control-sm"
                                                        selected={fechaFin}
                                                        onChange={(date) => setFechaFin(date)}
                                                        dateFormat='dd/MM/yyyy'
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </>
                                    ) : (
                                        <Col sm={3}>
                                            <FormGroup>
                                                <Label>Numero venta:</Label>
                                                <Input bsSize="sm" value={nroVenta} onChange={(e) => setNumeroVenta(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                    )
                                }
                                <Col sm={3}>
                                    <FormGroup>
                                        <Button color="success" size="sm" block onClick={buscarVenta}>
                                            <i className="fa fa-search" aria-hidden="true"></i> Buscar
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col sm="12">
                                    <Table striped responsive size="sm">
                                        <thead>
                                            <tr>
                                                <th>Fecha Registro</th>
                                                <th>Numero Venta</th>
                                                <th>Tipo Documento</th>
                                                <th>Documento Cliente</th>
                                                <th>Nombre Cliente</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (ventas.length < 1) ? (
                                                    <tr>
                                                        <td colSpan="7" style={{ textAlign: "center" }}>
                                                            Sin resultados
                                                        </td>
                                                    </tr>
                                                ) : (

                                                    ventas.map((item) => (
                                                        <tr key={item.numeroDocumento}>
                                                            <td>{item.fechaRegistro}</td>
                                                            <td>{item.numeroDocumento}</td>
                                                            <td>{item.tipoDocumento}</td>
                                                            <td>{item.documentoCliente}</td>
                                                            <td>{item.nombreCliente}</td>
                                                            <td>{item.total}</td>
                                                            <td>
                                                                <Button size="sm" color="info" outline
                                                                    onClick={() => mostrarModal(item)}
                                                                >
                                                                    <i className="fa fa-eye" aria-hidden="true"></i> Ver detalle
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>
                                    </Table>

                                </Col>

                            </Row>

                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal size="lg" isOpen={verModal}>
                <ModalHeader>
                    Detalle Venta
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>Fecha Registro:</Label>
                                <Input bsSize="sm" disabled value={detalleVenta.fechaRegistro}/>
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>Numero Venta:</Label>
                                <Input bsSize="sm" disabled value={detalleVenta.numeroDocumento}/>
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>Tipo Documento:</Label>
                                <Input bsSize="sm" disabled value={detalleVenta.tipoDocumento} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>Usuario Registro:</Label>
                                <Input bsSize="sm" disabled value={detalleVenta.usuarioRegistro}/>
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>Documento Cliente:</Label>
                                <Input bsSize="sm" disabled value={detalleVenta.documentoCliente} />
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>Nombre Cliente:</Label>
                                <Input bsSize="sm" disabled value={detalleVenta.nombreCliente}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>Sub Total:</Label>
                                <Input bsSize="sm" disabled value={detalleVenta.subTotal} />
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>IGV (18%):</Label>
                                <Input bsSize="sm" disabled value={detalleVenta.impuesto}/>
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>Total:</Label>
                                <Input bsSize="sm" disabled value={detalleVenta.total} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Table size="sm">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (detalleVenta.detalle == undefined) ? (
                                            <tr><td colSpan={4}>Sin productos</td></tr>
                                        ) : (
                                            detalleVenta.detalle.map((item) => (
                                                <tr key={item.producto}>
                                                    <td>{item.producto}</td>
                                                    <td>{item.cantidad}</td>
                                                    <td>{item.precio}</td>
                                                    <td>{item.total}</td>
                                                </tr>
                                            ))
                                        )
                                    }

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="danger" onClick={() => setVerModal(!verModal)}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </>
        


    )
}

export default HistorialVenta;