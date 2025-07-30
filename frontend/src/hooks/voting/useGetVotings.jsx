import { useState } from "react"
import { GetVoting } from "../../services/voting.service";

export const useGetVoting = () => {
    const [Voting , setVoting] = useState([]);

    const fetchVotings = async () => {
        try {
            
            const data = await GetVoting();
            setVoting(data.data)
        } catch (error) {
            console.error("Error consiguiendo las votaciones:", error);
        }
    }


    return { Voting, setVoting, fetchVotings}
}