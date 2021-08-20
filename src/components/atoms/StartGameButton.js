import React from "react";

const StartGameButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={"start-game-button"}>
      Start Game
    </button>
  );
};

export default StartGameButton;
