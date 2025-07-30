import axios from '@services/root.service.js';

// Función para obtener todas las actas (si tu backend tiene un endpoint para esto)
export async function getActas() {
    try {
        // Ajusta esta URL si tu endpoint para listar actas es diferente
        const response = await axios.get('/actas');
        // Asume que tu backend devuelve un objeto con una propiedad 'data' que contiene el array de actas
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener actas:", error);
        throw error; // Propagar el error
    }
}

// Función para enviar un acta por correo electrónico
export async function sendActaByEmail(actaId) {
    try {
        // Ajusta esta URL si tu endpoint para enviar actas es diferente
        // Asumo que el ID del acta se pasa en la URL y el backend maneja el envío
        const response = await axios.post(`/actas/${actaId}/send`);
        return response.data;
    } catch (error) {
        console.error("Error al enviar acta por correo:", error);
        throw error; // Propagar el error
    }
}

// Función para crear un acta (si tu backend tiene un endpoint para esto)
export async function createActa(actaData) {
    try {
        // Ajusta esta URL si tu endpoint para crear actas es diferente
        const response = await axios.post('/actas', actaData);
        return response.data;
    } catch (error) {
        console.error("Error al crear acta:", error);
        throw error;
    }
}
