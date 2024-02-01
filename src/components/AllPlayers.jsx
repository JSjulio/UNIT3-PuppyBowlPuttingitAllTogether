//AllPlayers.jsx
import { useFetchPlayersQuery } from "../../API/mainAPI"
import { Link } from 'react-router-dom';


//Render all players 
export default function AllPlayers() {
  const { data = {}, error, isLoading } = useFetchPlayersQuery();

  if (isLoading) return <div>Loading players...</div>;

  if (error) return <div> Error laoding player: {error.toString()}</div>;

  // *const players = data.data?.players || [];
  // console.log (players);
  // Lines 13-14 ensure that players array exists in the data before trying to map it

  return (
    <div className="grid-container">
      {data.data.players.map((player) => (
        <div key={player.id} className="individualPlayer">
          <h3>{player.name}</h3>
          <p>{player.breed}</p>
          <img src={player.imageUrl} alt={player.name} />
          <Link to={`/singleplayer/${player.id}`}>More Details</Link>
          <button className="deletePlayerBtn">Remove player</button>
        </div>
      ))}
    </div>
  );
}

