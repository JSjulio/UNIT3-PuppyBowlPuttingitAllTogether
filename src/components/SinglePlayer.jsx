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

  // Destructure the player details from data.data.player
//   const { name, breed, team, imageUrl } = data?.data?.player || {}; // Adjusted for the nested 'data.data.player'

    console.log(data.data.player); 

    return (
        <>
          <div className="singlePlayerContainer">
            {/* Directly accessing the properties of data.data.player since it's a single object */}
              <div className="singlePlayer">
                <h4>Dog Name :{data.data.player.name}</h4>
                <p>Pet owner: Isaias</p>
                {data.data.player.imageUrl && (
                  <img src={data.data.player.imageUrl} alt={`Image of ${data.data.player.name}`} />
                )} {/* Display player image if available */}
              </div>
          </div>
          <h3>Player Details</h3>
          <button onClick={goBack}>Go Back</button>
        </>
      );
      
}
