import AllPlayers from "./components/AllPlayers";
import AddPlayer from "./components/AddPlayer";
import SinglePlayer from "./components/SinglePlayer";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="sign-up-form">{<AddPlayer />}</div>

      <div className="main-section">
        <Routes>
          <Route path="/" element={<AllPlayers />} />
          <Route path="/addplayer" element={<AddPlayer />} />
          <Route path="/singleplayer/:playerId" element={<SinglePlayer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
