import React, { useEffect, useState } from "react";
import GameActions from "./components/organism/GameActions";
import io from "socket.io-client";
import axios from "axios";
import { uuid } from "uuidv4";
import StartGameButton from "./components/atoms/StartGameButton";

const socket = io(process.env.REACT_APP_BASE_URL, {
  transports: ["websocket"],
  upgrade: false,
});
function App() {
  const [gameInfo, setGameInfo] = useState(null);
  const handleStartGame = () => {
    let id = uuid();
    socket.emit("join");
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/play`, {
        playerId: id,
      })
      .then(({ data: { result } }) => {
        console.log(result);
        setGameInfo(result);
      })
      .catch((err) => {
        alert(err.message);
        socket.disconnect();
      });
  };
  return (
    <div className="App">
      {!gameInfo && <StartGameButton onClick={handleStartGame} />}
      {gameInfo && <GameActions socket={socket} gameInfo={gameInfo} />}
    </div>
  );
}

export default App;
