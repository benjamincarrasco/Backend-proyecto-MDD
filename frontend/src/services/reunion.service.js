import axios from '@services/root.service.js';

export async function GetReunion() {
    try {
        const response = await axios.get('/reuniones/all/')
        return response.data
    } catch (error) {
        console.error("Error al obtener las reuniones");
    }
}