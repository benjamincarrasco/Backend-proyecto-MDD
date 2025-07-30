import { useState } from "react";
import { sendVote } from "../../services/voting.service.js";

export const useSendVote = () => {
    const [Vote , setVote] = useState([]);

    const fetchVote = async (votingId, opcion) => {
        try {
            
            const data = await sendVote(votingId, opcion);
            setVote(data.data)
        } catch (error) {
            console.error("Error al enviar el voto:", error);
            throw error;
        }
    }


    return { Vote, setVote, fetchVote}
}