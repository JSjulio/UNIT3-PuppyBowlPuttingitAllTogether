import { useState } from "react";
import {useFetchPlayersQuery,useDeletePlayerMutation} from "../../API/mainAPI";
import { Link } from "react-router-dom";
import AddPlayer from "./AddPlayer.1";

// Render all players
export default function AllPlayers() {
  const { data = {}, isError, isLoading } = useFetchPlayersQuery();
  const [deletePlayer] = useDeletePlayerMutation();
  const [search, setSearch] = useState(""); // State for search input

  // Delete a player
    const handleDelete = async (playerId) => {
    try {
      const response = await deletePlayer(playerId).unwrap();
      console.log("Deletion successful:", response);
    } catch (err) {
      console.error("Failed to delete the player:", err);
    }
  };

  //isLoading and isError catch status and errors and prevent the app from being killed/render the status on the web app 
  if (isLoading) return <div>Loading players...</div>;
  // eslint-disable-next-line no-empty
  if (isError)
    return <div> There was an error while fetching your players.  </div>;

//players property of data is extracted 
  const {data: { players },} = data;

  //*this constant uses a ternary operator (?)  to choose between two methods of rendering players 
  // the first operand is the state (search) with the trim method on it 
      // the trim method ensures that the state does not have empty space as a result of a person typing in the input with spaces
            // this mitigates having the wrong aspect of the ternary operator running, and makes a seamless UI as a result. 
  // The second operand (players.filter etc..) will be activated if the user types a player's name into the search bar 
  //Otherwise, the third operand is activated if nothing is in the search 
  // the return statement uses this logic to map through the players data and render the players 
  
  const loadedPlayers = search.trim() ? players.filter((player) => 
     player.name.toLowerCase().includes(search.toLowerCase())) : players; 
  
 // Updates the search state when the input changes
 const handleSearchChange = (event) => {
  setSearch(event.target.value);
};


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
        {loadedPlayers.map((player) => (
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
