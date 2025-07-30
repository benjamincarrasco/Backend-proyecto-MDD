import axios from '@services/root.service.js';

export async function GetReunion() {
    try {
        const response = await axios.get('/reuniones/all/')
        return response.data
    } catch (error) {
        console.error("Error al obtener las reuniones");
        Swal.fire('Error', 'Error al obtener las reuniones. Inténtalo de nuevo.', 'error');
    }
}

export async function StartReunion(reunionid) {
    try {
        const response = await axios.patch(`/reuniones/${reunionid}/start`);
        return response.data;
    } catch (error) {
        console.error("Error al iniciar reunion:", error);
        Swal.fire('Error', 'Error al iniciar la reunion. Inténtalo de nuevo.', 'error');
    }
}

export async function CloseReunion(reunionid) {
    try {
        const response = await axios.patch(`/reuniones/${reunionid}/close`);
        return response.data;
    } catch (error) {
        console.error("Error al cerrar reunion:", error);
        Swal.fire('Error', 'Error al cerrar la reunion. Inténtalo de nuevo.', 'error');
    }
}

export async function DeleteReunion(reunionid) {
    try {
        const response = await axios.delete(`/reuniones/${reunionid}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar reunion:", error);
        Swal.fire('Error', 'Error al eliminar la reunion. Inténtalo de nuevo.', 'error');
    }
}