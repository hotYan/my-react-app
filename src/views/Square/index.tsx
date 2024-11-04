import './index.css'
import { useState } from 'react'

type SquareProps = {
  value: string,
  onSquareClick: () => void
}
function Square({ value, onSquareClick }: SquareProps) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}
function calculateWinner(squares: BoardProps['squares']) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
type BoardProps = {
  isNext: boolean,
  squares: Array<string>,
  onPlay: (nextSquares: BoardProps['squares']) => void
}
function Board({ isNext, squares, onPlay }: BoardProps) {

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (isNext ? 'X' : 'O')
  }

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return
    const nextSquares = squares.slice();
    if (isNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares)
  }
  return (
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}
export default function Game() {
  const [currentMove, setCurrentMove] = useState(0)
  const isNext = currentMove % 2 === 0
  const [history, setHistory] = useState([Array(9).fill(null)])
  const currentSquares = history[currentMove]// 渲染当前选定的着法

  function handlePlay(nextSquares: BoardProps['squares']) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares] // 截取到当前步数
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }
  const moves = history.map((move) => {
    const desc = move > 0 ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}