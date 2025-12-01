'use client';

import React, { useState } from 'react';

function Square({ value, onSquareClick }: { value: string | null, onSquareClick: () => void }) {
  let textColor = 'text-gray-500';
  if (value === 'X') {
    textColor = 'text-pink-500';
  } else if (value === 'O') {
    textColor = 'text-purple-500';
  }

  return (
    <button
      className={`w-20 h-20 bg-pink-100 border-2 border-pink-200 rounded-2xl text-4xl font-bold leading-none hover:bg-pink-200 transition-colors duration-200 flex items-center justify-center shadow-sm ${textColor}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  let status;
  let statusColor = 'text-pink-400';
  if (winner) {
    status = `Winner: ${winner}`;
    statusColor = winner === 'X' ? 'text-pink-500' : 'text-purple-500';
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    statusColor = xIsNext ? 'text-pink-500' : 'text-purple-500';
  }

  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl border-4 border-pink-100 max-w-sm w-full">
      <h1 className="text-3xl font-bold text-pink-500 mb-6 font-sans">Tic Tac Toe</h1>
      <div className={`text-xl font-semibold mb-6 min-h-[1.75rem] ${statusColor}`}>
        {status}
      </div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button
        className="px-6 py-2 bg-pink-400 text-white font-bold rounded-full hover:bg-pink-500 transition-colors duration-200 shadow-md transform hover:scale-105"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(squares: Array<string | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
