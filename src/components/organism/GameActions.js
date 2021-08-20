import React, { useEffect, useState } from "react";
import GameContainer from "../molecoles/Container";
import axios from "axios";
import { data } from "../../utils";

// const ORIG_BOARD = [...data]
const winSet_client = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const GameActions = ({ socket, gameInfo }) => {
  const [player, setPlayer] = useState("");
  const [win, setWin] = useState({});
  const [winner, setWinner] = useState({});
  const [turn, setTurn] = useState("");
  const [pit, setPit] = useState([...data]);

  const checkWin = (value) => {
    if (value.gameOver && value.winner) {
      let playerId =
        value.player == gameInfo.player ? "You Wine !!" : `You Loose !!`;
      setWin({ message: playerId, win: true });
    }

    if (value.gameOver && !value.winner) {
      setWin({ message: "Game Over", win: true });
    }

    setTurn(value.turn);
  };

  const checkRowsAndCols = (value) => {
    console.log("PALY GAME START==", value, turn, gameInfo.player);
    if (JSON.stringify(turn) !== JSON.stringify(gameInfo.player)) return;
    let lent = winSet_client.length;
    for (let index = 0; lent > index; index++) {
      let row = index;
      let col = winSet_client[index].indexOf(value);
      if (winSet_client[index].indexOf(value) > -1) {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/submitMove`, {
            player: gameInfo.player,
            row: row,
            column: col,
            pit: value,
            matchId: gameInfo.matchId,
          })
          .then(({ data }) => {})
          .catch((err) => {
            console.log(err);
          });
        break;
      }
    }
  };

  const checkWhoPlayed = (value) => {
    let new_pit = [...pit];
    new_pit[value.pit].color = value.player === "X" ? "#8a0b7f" : "orange";
    setPit(new_pit);
    checkWin(value);
  };

  const PlayGame = (value) => {
    console.log("PALY GAME START==", value);
    setPlayer(value.player);
    setTurn(value.turn);
    checkWhoPlayed(value);
  };

  const resetGame = () => {
    let new_pit = [...pit];
    let lent = new_pit.length;
    for (let i = 0; i < lent; i++) {
      new_pit[i].color = "";
    }
    setPit(new_pit);
    setWin(false);
    setWinner({});
  };

  useEffect(() => {
    socket.on("submitMove", (result) => {
      PlayGame(result);
      setTurn(result.turn);
    });
    setTurn(gameInfo.turn);
  }, [gameInfo]);

  return (
    <div className="App">
      <GameContainer
        BOARD={pit}
        onClick={checkRowsAndCols}
        player={player}
        win={win}
        resetGame={resetGame}
        winner={winner}
        turn={turn}
        gameInfo={gameInfo}
      />
    </div>
  );
};

export default GameActions;
