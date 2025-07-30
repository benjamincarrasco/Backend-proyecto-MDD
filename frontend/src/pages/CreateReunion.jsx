import { useState } from "react";
import { CreateReunionS } from "@services/createReunion.service.js";
import Swal from "sweetalert2";

const CreateReunion = () => {
    const [ReunionData, setReunionData] = useState({
        title: '',
        platform: '',
        description: '',
        startDate: ''
    });

    const handleChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        setReunionData({
            ...ReunionData,
            [inputName]: inputValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await CreateReunionS(ReunionData);
            Swal.fire('Reunion creada', 'Reunion creada exitosamente.','success');
            setReunionData({
                title: '',
                platform: '',
                description: '',
                startDate: '',
            });
            
        }catch (error){
            console.error(error)
            Swal.fire('Error', 'No se pudo cerrar la reunión. Inténtalo de nuevo.', 'error');
            
        }
    };

    return(
        <div className="create-page">
            <h2>Crear Reunión</h2>
            <form onSubmit={handleSubmit}>
                <p>Título</p>
                <input 
                    type="text" 
                    name="title" 
                    value={ReunionData.title}
                    onChange={handleChange}
                    required 
                />

                <p>Plataforma</p>
                <input 
                    type="text" 
                    name="platform" 
                    value={ReunionData.platform}
                    onChange={handleChange}
                    required 
                />
                
                <p>Descripción</p>
                <input 
                    type="text" 
                    name="description" 
                    value={ReunionData.description}
                    onChange={handleChange}
                    required 
                />
                
                <p>Fecha de inicio</p>
                <input 
                    type="datetime-local" 
                    name="startDate" 
                    value={ReunionData.startDate}
                    onChange={handleChange}
                    required 
                />
                
                <br/><br/>
                <button type="submit">Crear Reunión</button>
            </form>
        </div>
    )
}

export default CreateReunion;