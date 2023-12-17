const attackButton = document.querySelector('#attackButton'),
  coordinatesElement = document.querySelector('#coordinates');

function getUserInputCoordinates() {
  return coordinatesElement.value.split(',').map(function (num) {
    return parseInt(num.trim(), 10);
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

function startGame() {
  fetch('http://localhost:3000/start-game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Error starting the game:', error));
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

startGame();
