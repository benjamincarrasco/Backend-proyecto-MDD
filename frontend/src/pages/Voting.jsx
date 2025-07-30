import '@styles/votings.css'
import { useGetVoting } from '@hooks/voting/useGetVotings.jsx';
import { useSendVote } from '../hooks/vote/useSendVote.jsx';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Votings = () => {
    const { Voting, fetchVotings } = useGetVoting();
    const { fetchVote } = useSendVote(); 
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchVotings();
        
    }, [])

    //console.log("Votaciones recibidas:", Voting);

    const handleSendVote = async (votingId, opcion) => {
            try {
                await fetchVote(votingId, opcion);
                Swal.fire('Voto enviado!', 'El voto ha sido registrado.');
            } catch (error) {
                console.error("Error al registrar voto:", error);
                Swal.fire('Ya votaste', 'Su voto ya ha sido registrado', 'warning');
            }
        };

        




    return(
        <div className= "voting-page">
            <h2> Lista de Votaciones </h2>
            <table className="votings-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>Descripcion</th>
                        <th>Votar</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(Voting) && Voting.length > 0 ? (
                        Voting.map((voting) => (
                            <tr key={voting.id}>
                                <td>{voting.id}</td>
                                <td>{voting.title}</td>
                                <td>{voting.description}</td>
                                
                                <td>
                                    <button className="si" onClick={ () => handleSendVote(voting.id, "si")}>si</button>
                                    <button className="no" onClick={ () => handleSendVote(voting.id, "no")}>no</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No hay votaciones disponibles</td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
    )
}

export default Votings;