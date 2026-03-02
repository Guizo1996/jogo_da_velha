import { useState } from 'react'
import './App.css'

const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [cur, setCur] = useState('X');
  const [over, setOver] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, tie: 0 });
  const [winLine, setWinLine] = useState(null);

  function checkWin(p, b) {
    return WINS.find(combo => combo.every(i => b[i] === p));
  }

  function handleCellClick(i) {
    if (over || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = cur;

    const win = checkWin(cur, newBoard);

    if (win) {
      setBoard(newBoard);
      setWinLine(win);
      setScores(prev => ({ ...prev, [cur]: prev[cur] + 1 }));
      setOver(true);
    } else if (newBoard.every(v => v)) {
      setBoard(newBoard);
      setScores(prev => ({ ...prev, tie: prev.tie + 1 }));
      setOver(true);
    } else {
      setBoard(newBoard);
      setCur(cur === 'X' ? 'O' : 'X');
    }
  }

  function handleRestart() {
    setBoard(Array(9).fill(''));
    setCur('X');
    setOver(false);
    setWinLine(null);
  }

  const winner = winLine ? board[winLine[0]] : null;
  const statusMsg = over
    ? winner
      ? <><span className={winner.toLowerCase()}>{winner}</span> venceu! 🎉</>
      : 'Empate! 🤝'
    : <><span className={cur.toLowerCase()}>{cur}</span> está jogando</>;

  return (
    <div className="container">
      <h1>Jogo da Velha</h1>
      <p className="subtitle">Dois jogadores • X começa</p>

      <div className="scoreboard">
        <div className="score-box x">
          <div className="label">X</div>
          <div className="value">{scores.X}</div>
        </div>
        <div className="score-box tie">
          <div className="label">Empate</div>
          <div className="value">{scores.tie}</div>
        </div>
        <div className="score-box o">
          <div className="label">O</div>
          <div className="value">{scores.O}</div>
        </div>
      </div>

      <div className="status">{statusMsg}</div>

      <div className="board">
        {board.map((value, i) => (
          <div
            key={i}
            className={`cell ${value.toLowerCase()} ${value ? 'taken' : ''} ${winLine?.includes(i) ? 'win' : ''}`}
            onClick={() => handleCellClick(i)}
          >
            {value}
          </div>
        ))}
      </div>

      <button className="btn" onClick={handleRestart}>
        Nova Partida
      </button>
    </div>
  );
}

export default App;
