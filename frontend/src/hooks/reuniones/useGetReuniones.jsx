import { useState } from "react";
import { GetReunion } from "../../services/reunion.service.js";

export const useGetReuniones = () => {
    const [Reunion, setReuniones] = useState([]);

    const fetchReuniones = async () => {
        try {
            const data = await GetReunion();
            setReuniones(data.data)
        }catch (error) {
        console.error("Error consiguiendo las reuniones")
        }
    }
    return { Reunion, setReuniones, fetchReuniones }
}