function renderBoard(data, boardId, boardType) {
  const boardElement = document.getElementById(boardId);
  boardElement.innerHTML = '';
  const { gameboard, alreadyAttacked, missedAttacks } = data.allData[boardType];

  gameboard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');

      if (boardType === 'playerAttackBoard') {
        handlePlayerAttackBoard(
          cellElement,
          alreadyAttacked,
          missedAttacks,
          rowIndex,
          colIndex
        );
      } else if (boardType === 'playerDefenseBoard') {
        handlePlayerDefenseBoard(
          cellElement,
          cell,
          alreadyAttacked,
          missedAttacks,
          rowIndex,
          colIndex
        );
      }

      boardElement.appendChild(cellElement);
    });
  });
}

function handlePlayerAttackBoard(
  cellElement,
  alreadyAttacked,
  missedAttacks,
  rowIndex,
  colIndex
) {
  if (alreadyAttacked[rowIndex][colIndex]) {
    const isMiss = missedAttacks.some(
      miss => miss[0] === rowIndex && miss[1] === colIndex
    );
    cellElement.classList.add(isMiss ? 'miss' : 'hit');
    cellElement.textContent = isMiss ? 'MISS' : 'HIT';
  } else {
    cellElement.classList.add('sea');
    cellElement.textContent = 'SEA';
    cellElement.addEventListener('click', async () => {
      const updatedGameState = await sendAttack([rowIndex, colIndex]);
      if (updatedGameState) {
        renderBoard(updatedGameState, 'playerAttackBoard', 'playerAttackBoard');
        renderBoard(
          updatedGameState,
          'playerDefenseBoard',
          'playerDefenseBoard'
        );
      }
    });
  }
}

function handlePlayerDefenseBoard(
  cellElement,
  cell,
  alreadyAttacked,
  missedAttacks,
  rowIndex,
  colIndex
) {
  const isMiss = missedAttacks.some(
    miss => miss[0] === rowIndex && miss[1] === colIndex
  );
  const isHit = alreadyAttacked[rowIndex][colIndex] && cell !== null;

  if (isHit) {
    cellElement.classList.add('hit');
    cellElement.textContent = 'HIT';
  } else if (isMiss) {
    cellElement.classList.add('miss');
    cellElement.textContent = 'MISS';
  } else {
    cellElement.classList.add(cell ? 'ship' : 'sea');
    cellElement.textContent = cell ? 'SHIP' : 'SEA';
  }
}

async function sendAttack(coordinates) {
  try {
    const response = await fetch('http://localhost:3000/game-state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coordinates })
    });

    const gameState = await response.json();
    if (gameState.winner) {
      disableGameBoards();
      updateHeaderWithWinner(gameState.winner);
    }
    return gameState;
  } catch (error) {
    console.error('Error updating game state:', error);
  }
}

async function startGame() {
  try {
    const res = await fetch('http://localhost:3000/start-game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    renderBoard(data, 'playerDefenseBoard', 'playerDefenseBoard');
    renderBoard(data, 'playerAttackBoard', 'playerAttackBoard');
    renderCheatBoard(data);
  } catch (error) {
    console.error('Error starting the game:', error);
  }
}

function renderCheatBoard(data) {
  const boardElement = document.getElementById('computerCheatBoard');
  const { gameboard } = data.allData.playerAttackBoard;
  gameboard.forEach(row => {
    row.forEach(cell => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.classList.add(cell ? 'ship' : 'sea');
      cellElement.textContent = cell ? 'Ship' : 'Sea';
      boardElement.appendChild(cellElement);
    });
  });
}

function disableGameBoards() {
  const gameboards = document.querySelectorAll('.gameboard');
  gameboards.forEach(board => board.classList.add('disabled'));
}

function updateHeaderWithWinner(winner) {
  const header = document.querySelector('h1');
  header.textContent = `Battleship - ${winner}!`;
}

setTimeout(startGame, 1000);
