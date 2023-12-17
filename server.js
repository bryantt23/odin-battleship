const express = require('express');
const cors = require('cors');

const app = express();
const GameEngine = require('./GameEngine'); // Path to your GameEngine class
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

let gameEngine;

app.post('/start-game', (req, res) => {
  gameEngine = new GameEngine();
  gameEngine.startGame();
  console.log('🚀 ~ file: server.js:16 ~ app.post ~ gameEngine:', gameEngine);
  res.json({ message: 'Game started', allData: gameEngine });
});

app.post('/game-state', (req, res) => {
  const playerCoordinates = req.body.coordinates;
  gameEngine
    .playGame(playerCoordinates)
    .then(gameState => res.json(gameState))
    .catch(error => res.status(500).json({ error: error.message }));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
