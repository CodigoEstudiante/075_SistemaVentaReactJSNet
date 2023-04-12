import { useState } from "react";
import { useContext, useEffect } from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import { UserContext } from "../context/UserProvider";

const modelo = {
    nombre: "",
    correo: "",
    idRolNavigation: {
        descripcion :""
    }
}

const Inicio = () => {

    const { user } = useContext(UserContext)
    const [ dataUser, setDataUser ] = useState(modelo)

    useEffect(() => {
        let dt = JSON.parse(user)
        setDataUser(dt)

    }, [])

    return (
        <>
            <Row>
                <Col sm={12} className="text-left">
                    <h2>Bienvenido al sistema</h2>
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <div className="card">
                        <img className="card-img-top" src={"./imagen/Foto003.jpg"} alt="Card image cap" />
                    </div>
                </Col>
                <Col sm={3}>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input disabled value={dataUser.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input disabled value={dataUser.correo}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Rol</Label>
                        <Input disabled value={dataUser.idRolNavigation.descripcion}/>
                    </FormGroup>
                </Col>
                <Col sm={3}>
                </Col>
            </Row>
        </>
       
        )
}

export default Inicio;