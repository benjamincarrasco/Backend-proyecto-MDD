import axios from '@services/root.service.js';
import Swal from 'sweetalert2';

export async function CreateReunionS(ReunionData) {
    try{
        const response = await axios.post("/reuniones/create", ReunionData)
        return response.data
    }catch (error) {
        console.error("Error al crear la reunion:", error);
        Swal.fire('Error', 'Error al crear la reunion. Inténtalo de nuevo.', 'error');
        throw error
    }
}