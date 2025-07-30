import '@styles/reunion.css'
import { useGetReuniones } from '@hooks/reuniones/useGetReuniones.jsx';
import { useEffect } from 'react';

const Reuniones = () => {
    const { Reunion, fetchReuniones} = useGetReuniones();

    useEffect(()=> {
        fetchReuniones();
    }, [])


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
                        <th>Iniciar</th>
                        
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
                                
                                <td>
                                    {userRole === "administrador" && (<button className="Iniciar">Iniciar</button>)}
                                </td>
                                
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No hay reuniones disponibles</td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
    )
}

export default Reuniones