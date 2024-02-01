import AllPlayers from "./components/AllPlayers";
import SinglePlayer from "./components/SinglePlayer";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>

      <div className="main-section">
        <Routes>
          <Route path="/" element={<AllPlayers />} />
          <Route path="/singleplayer/:playerId" element={<SinglePlayer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
