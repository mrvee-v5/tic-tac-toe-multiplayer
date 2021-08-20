import React from "react";

const WinnerComponent = ({ resetGame, win }) => {
  return (
    <div className={"winner"}>
      <h1 className="winner-text">{win && win.message}</h1>
      <div className="btn-container">
        <a onClick={resetGame} className={"button"}>
          Restart
        </a>
      </div>
    </div>
  );
};

export default WinnerComponent;
