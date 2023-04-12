import { Link } from "react-router-dom"


const NotFound = () => {
    return (
        <div className="container-fluid pt-5">

            <div className="text-center mt-5">
                <div className="error mx-auto my-auto" data-text="404">404</div>
                <p className="lead text-gray-800 mb-5">Page Not Found</p>
                <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                <Link to="/Login">Regresar</Link>
            </div>

        </div>
        )

}


export default NotFound;