import axios from '@services/root.service.js';

export async function CreateReunionS(ReunionData) {
    try{
        const response = await axios.post("/reuniones/create", ReunionData)
        return response.data
    }catch (error) {
        console.error("Error al crear la reunion:", error);
    }
}