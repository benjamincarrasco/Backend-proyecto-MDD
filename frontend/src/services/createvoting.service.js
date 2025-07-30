import axios from '@services/root.service.js';

export async function CreateVotingS(VotingData) {
    try {
        const response = await axios.post("/voting/",VotingData)
        return response.data
    } catch (error) {
        console.error("Error al crear la votacion:", error);
    }
} 