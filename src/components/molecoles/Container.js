import React from "react";
import Card from "../atoms/Card";
import TurnIndicator from "../atoms/TurnIndicator";
import WinnerComponent from "../atoms/WinnerComponent";

const GameContainer = (props) => {
  return (
    <div>
      <div className={"Game-container"}>
        {props.BOARD.map((value, index) => {
          return (
            <Card
              key={index}
              value={value}
              index={index}
              {...props}
              bg={value.color}
            />
          );
        })}
      </div>
      {props.win && props.win.win && <WinnerComponent {...props} />}
      <TurnIndicator {...props} />
    </div>
  );
};

export default GameContainer;
