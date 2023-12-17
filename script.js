const attackButton = document.querySelector('#attackButton'),
  coordinatesElement = document.querySelector('#coordinates');

function getUserInputCoordinates() {
  return coordinatesElement.value.split(',').map(function (num) {
    return parseInt(num.trim(), 10);
  });
}

function renderPlayerBoard(data) {
  const boardElement = document.getElementById('playerDefenseBoard');
  const { gameboard } = data.allData.playerDefenseBoard;
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
  const playerCoordinates = getUserInputCoordinates(); // Implement this function to get user input
  const gameState = await sendAttack(playerCoordinates);
  console.log(
    '🚀 ~ file: script.js:15 ~ attackButton.addEventListener ~ gameState:',
    gameState
  );
  //   updateUi(gameState);
});

function sendAttack(coordinates) {
  console.log(
    '🚀 ~ file: script.js:21 ~ sendAttack ~ coordinates:',
    coordinates
  );
  fetch('http://localhost:3000/game-state', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ coordinates })
  })
    .then(response => response.json())
    .then(gameState => {
      console.log('Game State:', gameState);
      // Update your UI based on the received game state
      return gameState;
    })
    .catch(error => console.error('Error updating game state:', error));
}

async function startGame() {
  try {
    const res = await fetch('http://localhost:3000/start-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    renderPlayerBoard(data);
    console.log('🚀 ~ file: script.js:46 ~ startGame ~ data:', data);
  } catch (error) {
    console.error('Error starting the game:', error);
  }
}

// Function to update the UI based on the game state
function updateUI(gameState) {
  console.log('🚀 ~ file: script.js:13 ~ updateUI ~ gameState:', gameState);
  // Update the board, show messages, etc.
  if (gameState.gameOver) {
    alert(gameState.winner);
  }
  // More UI updates here...
}

setTimeout(startGame, 1000);
