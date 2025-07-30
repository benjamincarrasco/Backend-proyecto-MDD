import { useState } from "react";
import { CreateVotingS } from "@services/createvoting.service.js";
import Swal from "sweetalert2";
const CreateVoting = () => {
    const [VotingData, setVotingData] = useState({
        title: '',
        description: '',
        endDate: ''
    });

    const handleChange = (e) => {
        const inputName = e.target.name;    
        const inputValue = e.target.value;  
        
        setVotingData({
            ...VotingData,           
            [inputName]: inputValue  
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await CreateVotingS(VotingData);
            Swal.fire('Votación creada!');
            // Limpiar formulario
            setVotingData({ title: '', description: '', endDate: '' });
        } catch (error) {
            console.error("Error:", error);
            Swal.fire('Error al crear votación');
            throw error;
        }
    };

    return(
        <div className="create-page">
            <h2>Crear Votación</h2>
            <form onSubmit={handleSubmit}>
                <p>Título</p>
                <input 
                    type="text" 
                    name="title" 
                    value={VotingData.title}
                    onChange={handleChange}
                    required 
                />
                
                <p>Descripción</p>
                <input 
                    type="text" 
                    name="description" 
                    value={VotingData.description}
                    onChange={handleChange}
                    required 
                />
                
                <p>Fecha de cierre</p>
                <input 
                    type="datetime-local" 
                    name="endDate" 
                    value={VotingData.endDate}
                    onChange={handleChange}
                    required 
                />
                
                <br/><br/>
                <button type="submit">Crear Votación</button>
            </form>
        </div>
    )
}

export default CreateVoting;


