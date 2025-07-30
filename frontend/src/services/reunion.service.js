import axios from '@services/root.service.js';

export async function GetReunion() {
    try {
        const response = await axios.get('/reuniones/all/')
        return response.data
    } catch (error) {
        console.error("Error al obtener las reuniones");
    }
}

export async function StartReunion(reunionid) {
    try {
        const response = await axios.patch(`/reuniones/${reunionid}/start`);
        return response.data;
    } catch (error) {
        console.error("Error al iniciar reunion:", error);
    }
}

export async function DeleteReunion(reunionid) {
    try {
        const response = await axios.delete(`/reuniones/${reunionid}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar reunion:", error);
    }
}