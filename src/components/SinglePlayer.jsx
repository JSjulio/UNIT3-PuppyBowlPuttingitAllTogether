import { useParams, useNavigate } from "react-router-dom";
import { useFetchPlayerIdQuery } from "../../API/mainAPI";

export default function SinglPlayer() {
  const { playerId } = useParams(); // Retrieves the playerId from the route parameters
  const { data, error, isLoading } = useFetchPlayerIdQuery(playerId);

  const navigate = useNavigate();
  const goBack = () => navigate(-1); // Function to navigate back

  // Handle loading and error states
  if (isLoading) return <div>Loading player...</div>;
  if (error) return <div>Error loading player: {error.toString()}</div>;

    console.log(data.data.player); 

    return (
        <>
          <div className="singlePlayerContainer">
          <h1 className="player-details">Player Details</h1>
              <div className="singlePlayer">
                <h3>Dog Name: {data.data.player.name}</h3>
                <p>Pet owner: Isaias</p>
                <p>Team Name: SEAL TEAM 7</p>
                {data.data.player.imageUrl && (
                  <img src={data.data.player.imageUrl} alt={`Image of ${data.data.player.name}`} />
                )} {/* Display player image if available */}
              </div>
          </div>
          <button className="go-back-button" onClick={goBack}>Go Back</button>
        </>
      );
      
}
