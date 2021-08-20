import React from "react";

const TurnIndicator = ({ winner, turn, gameInfo }) => {
  return (
    <div className="turnContainer">
      <div
        className={`turn ${
          turn.toString() === gameInfo.player ? "turn-2" : "turn-1"
        }`}
      >
        <h1>
          {turn.toString() === gameInfo.player ? "YOUR TURN" : "MR B's TURN"}
        </h1>
      </div>
    </div>
  );
};

export default TurnIndicator;
