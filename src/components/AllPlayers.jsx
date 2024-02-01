import React, { useState } from 'react'; 
import { useFetchPlayersQuery, useDeletePlayerMutation } from "../../API/mainAPI";
import { Link } from "react-router-dom";
import AddPlayer from "./AddPlayer";

// Render all players
export default function AllPlayers() {
  const { data = {}, error, isLoading } = useFetchPlayersQuery();
  const [deletePlayer] = useDeletePlayerMutation();
  const [search, setSearch] = useState(''); // State for search input

  // Updates the search state when the input changes
  const handleSearchChange = (event) => {
    setSearch(event.target.value); 
  };

  const filteredPlayers = search
    ? data.data.players.filter((player) =>
        player.name.toLowerCase().includes(search.toLowerCase())
      )
    : data.data.players;

  // Delete player button 
  const handleDelete = async (playerId) => {
    try {
      const response = await deletePlayer(playerId).unwrap();
      console.log("Deletion successful:", response); 
    } catch (err) {
      console.error("Failed to delete the player:", err);
    }
  };

  if (isLoading) return <div>Loading players...</div>;
  if (error) return <div>Error loading player: {error.toString()}</div>;

  return (
    <>
      <div className="form-container">
        <AddPlayer />
        <input
          type="text"
          placeholder="Search for a player"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid-container">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="individualPlayer">
            <h3>{player.name}</h3>
            <p>{player.breed}</p>
            <img src={player.imageUrl} alt={player.name} />
            <Link to={`/singleplayer/${player.id}`}>More Details</Link>
            <button
              className="deletePlayerBtn"
              onClick={() => handleDelete(player.id)}
            >
              Delete player
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
