const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let board, cur, over, scores = {X:0, O:0, tie:0};

const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');

function init() {
  board = Array(9).fill('');
  cur = 'X';
  over = false;
  cells.forEach(c => { c.textContent = ''; c.className = 'cell'; });
  setStatus();
}

function setStatus(msg) {
  if (msg) { statusEl.innerHTML = msg; return; }
  statusEl.innerHTML = `<span class="${cur.toLowerCase()}">${cur}</span> está jogando`;
}

function checkWin(p) {
  return WINS.find(combo => combo.every(i => board[i] === p));
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const i = +cell.dataset.i;
    if (over || board[i]) return;
    board[i] = cur;
    cell.textContent = cur;
    cell.classList.add(cur.toLowerCase(), 'taken');

    const win = checkWin(cur);
    if (win) {
      win.forEach(i => cells[i].classList.add('win'));
      scores[cur]++;
      document.getElementById(cur === 'X' ? 'scoreX' : 'scoreO').textContent = scores[cur];
      setStatus(`<span class="${cur.toLowerCase()}">${cur}</span> venceu! 🎉`);
      over = true;
    } else if (board.every(v => v)) {
      scores.tie++;
      document.getElementById('scoreTie').textContent = scores.tie;
      setStatus('Empate! 🤝');
      over = true;
    } else {
      cur = cur === 'X' ? 'O' : 'X';
      setStatus();
    }
  });
});

document.getElementById('restartBtn').addEventListener('click', init);
init();
