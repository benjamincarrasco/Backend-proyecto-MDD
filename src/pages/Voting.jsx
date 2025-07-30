import '@styles/votings.css'
import { useGetVoting } from '@hooks/voting/useGetVotings.jsx';
import { useEffect } from 'react';

const Votings = () => {
    const { Voting, fetchVotings } = useGetVoting();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchVotings();
        
    }, [])

    //console.log("Votaciones recibidas:", Voting);

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
                        Voting.map((Voting) => (
                            <tr key={Voting.id}>
                                <td>{Voting.id}</td>
                                <td>{Voting.title}</td>
                                <td>{Voting.description}</td>
                                
                                <td>
                                    <button className="Si">Si</button>
                                    <button className="No">No</button>
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