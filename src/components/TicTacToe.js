import { useState } from 'react';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''} ${value ? 'filled' : ''}`} 
      onClick={onSquareClick}
    >
      {value && <span className={`symbol ${value}`}>{value}</span>}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares).winner || squares[i]) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares, i);
  }

  const { winner, line } = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Vencedor: ${winner}`;
  } else if (squares.every(square => square)) {
    status = 'Jogo empatado!';
  } else {
    status = `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;
  }

  // Cria os quadrados de forma mais dinâmica
  const renderSquare = (i) => (
    <Square 
      key={i}
      value={squares[i]} 
      onSquareClick={() => handleClick(i)}
      isWinning={line && line.includes(i)}
    />
  );

  return (
    <div className="game-container">
      <div className="status">{status}</div>
      <div className="board">
        {[...Array(3)].map((_, row) => (
          <div key={row} className="board-row">
            {[...Array(3)].map((_, col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), moveLocation: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const currentSquares = history[currentMove].squares;
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares, moveIndex) {
    const row = Math.floor(moveIndex / 3) + 1;
    const col = (moveIndex % 3) + 1;
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, moveLocation: { row, col } }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = [
    <li key={0}>
      <button 
        onClick={() => jumpTo(0)}
        className={currentMove === 0 ? 'current-move' : ''}
      >
        Recomeçar jogo
      </button>
    </li>
  ];
  

  return (
    <div className="app">
      <h1>Jogo da Velha</h1>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
  <div className="controls">
    <button onClick={() => jumpTo(0)}>
      Recomeçar jogo
    </button>
  </div>
  <ol className="move-list">{moves}</ol>
</div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}
