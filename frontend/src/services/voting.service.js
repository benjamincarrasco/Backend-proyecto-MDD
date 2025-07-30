import axios from '@services/root.service.js';

export async function GetVoting() {
    try {
        const response = await axios.get('/voting/')
        return response.data
    } catch (error) {
        console.error("Error al obtener las votaciones:", error);
    }
}