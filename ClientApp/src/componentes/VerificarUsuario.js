import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { Navigate } from "react-router-dom"


const VerificarUsuario = ({children}) => {

    const { user } = useContext(UserContext)

    if (user == null) {
        return <Navigate to="/Login"/>
    }
    return children
}

export default VerificarUsuario