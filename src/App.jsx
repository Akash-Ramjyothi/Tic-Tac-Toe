import { useState, useMemo, useCallback } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const BOARD_SIZE = 3;

const INITIAL_GAME_BOARD = Array.from({ length: BOARD_SIZE }, () =>
  Array(BOARD_SIZE).fill(null)
);

/* -------------------------------------------------------------------------- */
/*                              PURE HELPER LOGIC                             */
/* -------------------------------------------------------------------------- */

/**
 * Determines which player is currently active.
 * Uses latest-first turn ordering.
 */
function deriveActivePlayer(gameTurns) {
  if (gameTurns.length === 0) return "X";
  return gameTurns[0].player === "X" ? "O" : "X";
}

/**
 * Creates a fresh board state derived from turns history.
 * Ensures immutability.
 */
function deriveGameBoard(gameTurns) {
  const board = INITIAL_GAME_BOARD.map((row) => [...row]);

  for (const turn of gameTurns) {
    const { row, col } = turn.square;

    // Defensive guard (prevents overwriting in case of future refactors)
    if (board[row][col] === null) {
      board[row][col] = turn.player;
    }
  }

  return board;
}

/**
 * Determines winner based on current board state.
 */
function deriveWinner(gameBoard, players) {
  for (const combination of WINNING_COMBINATIONS) {
    const [first, second, third] = combination;

    const firstSymbol = gameBoard[first.row][first.column];

    if (
      firstSymbol &&
      firstSymbol === gameBoard[second.row][second.column] &&
      firstSymbol === gameBoard[third.row][third.column]
    ) {
      return players[firstSymbol];
    }
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/*                                    APP                                     */
/* -------------------------------------------------------------------------- */

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  /* --------------------------- Derived State --------------------------- */

  const activePlayer = useMemo(
    () => deriveActivePlayer(gameTurns),
    [gameTurns]
  );

  const gameBoard = useMemo(
    () => deriveGameBoard(gameTurns),
    [gameTurns]
  );

  const winner = useMemo(
    () => deriveWinner(gameBoard, players),
    [gameBoard, players]
  );

  const hasDraw = gameTurns.length === BOARD_SIZE * BOARD_SIZE && !winner;

  /* ---------------------------- Event Handlers ---------------------------- */

  const handleSelectSquare = useCallback((rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      // Prevent selecting an already filled square
      const board = deriveGameBoard(prevTurns);
      if (board[rowIndex][colIndex] !== null) {
        return prevTurns;
      }

      return [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
    });
  }, []);

  const handleRestart = useCallback(() => {
    setGameTurns([]);
  }, []);

  const handlePlayerNameChange = useCallback((symbol, newName) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName.trim() || prevPlayers[symbol],
    }));
  }, []);

  /* -------------------------------------------------------------------------- */

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol="X"
            initialName={PLAYERS.X}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            symbol="O"
            initialName={PLAYERS.O}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            isDraw={hasDraw}
            onRestart={handleRestart}
          />
        )}

        <GameBoard
          board={gameBoard}
          onSquareSelect={handleSelectSquare}
        />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
