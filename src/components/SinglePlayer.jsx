//SinglPlayer.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchPlayerIdQuery } from '../../API/mainAPI'

export default function SinglPlayer() { 
    const { playerId } = useParams();
    const { data = {}, error, isLoading } = useFetchPlayerIdQuery(playerId);


     //Navigate for going to previous page
     const navigate = useNavigate();
     const goBack = () => {
         navigate(-1);
     };

    if (isLoading) return <div>Loading player...</div>
    if (error) return <div> Error laoding player: {error.toString()}</div>

    const players = data.data?.players || []; 

    return ( 
    <>
        <div className="container"> 
            {playerId && (
                <div className='singlePlayer'>
                    <h4> {players.name} </h4>
                    <p> {players.owner} </p> 
                    <p> {players.team} </p>
                </div>
            )}
            <h3>Player Details</h3> 
            <button onClick={goBack}>Go Back</button>
        </div>
    </>
    );
}

