const attackButton = document.querySelector('#attackButton'),
  coordinatesElement = document.querySelector('#coordinates');

function getUserInputCoordinates() {
  return coordinatesElement.value
    .split(',')
    .map(num => parseInt(num.trim(), 10));
}

function renderBoard(data, boardId, boardType) {
  const boardElement = document.getElementById(boardId);
  boardElement.innerHTML = '';
  const { gameboard, alreadyAttacked, missedAttacks } = data.allData[boardType];

  gameboard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');

      if (boardType === 'playerAttackBoard') {
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
              renderBoard(
                updatedGameState,
                'playerAttackBoard',
                'playerAttackBoard'
              );
              renderBoard(
                updatedGameState,
                'playerDefenseBoard',
                'playerDefenseBoard'
              );
            }
          });
        }
      } else if (boardType === 'playerDefenseBoard') {
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

      boardElement.appendChild(cellElement);
    });
  });
}

async function sendAttack(coordinates) {
  try {
    const response = await fetch('http://localhost:3000/game-state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coordinates })
    });

    const gameState = await response.json();
    console.log('🚀 ~ file: script.js:66 ~ sendAttack ~ gameState:', gameState);
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
    console.log('🚀 ~ file: script.js:78 ~ startGame ~ data:', data);
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
      if (cell) {
        cellElement.classList.add('ship');
        cellElement.textContent = 'Ship';
      } else {
        cellElement.classList.add('sea');
        cellElement.textContent = 'Sea';
      }
      cellElement.classList.add('cell');
      boardElement.appendChild(cellElement);
    });
  });
}

attackButton.addEventListener('click', async () => {
  const playerCoordinates = getUserInputCoordinates();
  const updatedGameState = await sendAttack(playerCoordinates);
  if (updatedGameState) {
    renderBoard(updatedGameState, 'playerAttackBoard', 'playerAttackBoard');
    renderBoard(updatedGameState, 'playerDefenseBoard', 'playerDefenseBoard');
  }
});

setTimeout(startGame, 1000);
