import React, { useEffect, useState } from 'react';
import { getActas, sendActaByEmail, createActa } from '@services/acta.service.js';
import Swal from 'sweetalert2';
import '@styles/votings.css'; // Puedes reutilizar este CSS o crear uno específico para actas

const ActasAdmin = () => {
    const [actas, setActas] = useState([]);
    const [newActaData, setNewActaData] = useState({ title: '', content: '' }); // Asumiendo que un acta tiene título y contenido

    const fetchActas = async () => {
        try {
            const data = await getActas();
            setActas(data);
        } catch (error) {
            console.error("Error al cargar actas:", error);
            Swal.fire('Error', 'No se pudieron cargar las actas.', 'error');
        }
    };

    useEffect(() => {
        fetchActas();
    }, []);

    const handleSendActa = async (actaId) => {
        try {
            await sendActaByEmail(actaId);
            Swal.fire('¡Acta enviada!', 'El acta ha sido enviada por correo electrónico.', 'success');
        } catch (error) {
            console.error("Error al enviar acta:", error);
            Swal.fire('Error', 'No se pudo enviar el acta. Inténtalo de nuevo.', 'error');
        }
    };

    const handleCreateActaChange = (e) => {
        setNewActaData({ ...newActaData, [e.target.name]: e.target.value });
    };

    const handleCreateActaSubmit = async (e) => {
        e.preventDefault();
        try {
            await createActa(newActaData);
            Swal.fire('¡Acta creada!', 'El acta ha sido creada exitosamente.', 'success');
            setNewActaData({ title: '', content: '' }); // Limpiar formulario
            fetchActas(); // Recargar la lista de actas
        } catch (error) {
            console.error("Error al crear acta:", error);
            Swal.fire('Error', 'No se pudo crear el acta.', 'error');
        }
    };

    return (
        <div className="actas-admin-page">
            <h2>Administración de Actas</h2>

            <h3>Crear Nueva Acta</h3>
            <form onSubmit={handleCreateActaSubmit}>
                <p>Título</p>
                <input
                    type="text"
                    name="title"
                    value={newActaData.title}
                    onChange={handleCreateActaChange}
                    required
                />
                <p>Contenido</p>
                <textarea
                    name="content"
                    value={newActaData.content}
                    onChange={handleCreateActaChange}
                    required
                ></textarea>
                <br/><br/>
                <button type="submit">Crear Acta</button>
            </form>

            <h3>Actas Existentes</h3>
            <table className="votings-table"> {/* Reutilizando la clase de estilos de votaciones */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(actas) && actas.length > 0 ? (
                        actas.map((acta) => (
                            <tr key={acta.id}>
                                <td>{acta.id}</td>
                                <td>{acta.title}</td>
                                <td>
                                    <button className="Si" onClick={() => handleSendActa(acta.id)}>Enviar por Correo</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay actas disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ActasAdmin;

    