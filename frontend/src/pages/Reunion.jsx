import '@styles/reunion.css'
import { useGetReuniones } from '@hooks/reuniones/useGetReuniones.jsx';
import { useEffect } from 'react';
import { DeleteReunion, StartReunion, CloseReunion } from '../services/reunion.service.js';
import Swal from 'sweetalert2';

const Reuniones = () => {
    const { Reunion, fetchReuniones} = useGetReuniones();

    useEffect(()=> {
        fetchReuniones();
    }, [])


    const handleStartReunion = async (reunionid) => {
        try {
            await StartReunion(reunionid);
            Swal.fire('Reunion iniciada', 'La reunión se ha iniciado correctamente.', 'success');
        } catch (error) {
            console.error("Error al iniciar la reunion:", error);
            Swal.fire('Error', 'No se pudo iniciar la reunión. Inténtalo de nuevo.', 'error');
        }
    };

    const handleCloseReunion = async (reunionid) => {
        try {
            await CloseReunion(reunionid);
            Swal.fire('Reunion Cerrada', 'La reunión se ha cerrado correctamente.', 'success');
        } catch (error) {
            console.error("Error al cerrar la reunion:", error);
            Swal.fire('Error', 'No se pudo cerrar la reunión. Inténtalo de nuevo.', 'error');
        }
    };

    const handleDeleteReunion = async (reunionid) => {
        try {
            await DeleteReunion(reunionid);
            Swal.fire('Reunion eliminada', 'La reunión se ha eliminado correctamente.', 'success');
        } catch (error) {
            console.error("Error al iniciar la reunion:", error);
            Swal.fire('Error', 'No se pudo eliminar la reunión. Inténtalo de nuevo.', 'error');
        }
    };

    const user = JSON.parse(sessionStorage.getItem("usuario")) || "";
    const userRole = user?.role;

    return(
        <div className= "reunion-page">
            <h2> Lista de Reuniones </h2>
            <table className="reuniones-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>Plataforma</th>
                        <th>Descripcion</th>
                        <th>Fecha inicio</th>
                        <th>Iniciada</th>
                        <th>Cerrada</th>
                        {userRole === "administrador" && <th>
                            <th>Iniciar</th>
                            <th>Cerrar</th> 
                            <th>Eliminar</th>
                        </th>}
                        
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(Reunion) && Reunion.length > 0 ? (
                        Reunion.map((Reunion) => (
                            <tr key={Reunion.id}>
                                <td>{Reunion.id}</td>
                                <td>{Reunion.title}</td>
                                <td>{Reunion.platform}</td>
                                <td>{Reunion.description}</td>
                                <td>{Reunion.startDate}</td>
                                <td>{Reunion.isActive ? "Sí" : "No" }</td>
                                <td>{Reunion.isClosed ? "Sí" : "No" }</td>
                                
                                {userRole === "administrador" && <td>
                                <td>
                                    <button className="Iniciar" onClick={() => handleStartReunion(Reunion.id)} >Iniciar</button>
                                </td>

                                <td>
                                    <button className="Cerrar" onClick={() => handleCloseReunion(Reunion.id)} >Cerrar</button>
                                </td>

                                <td>
                                    <button className="Eliminar" onClick={() => handleDeleteReunion(Reunion.id)} >Eliminar</button>
                                </td>
                                </td>
                                }
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No hay reuniones disponibles</td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
    )
}

export default Reuniones