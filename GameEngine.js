const Gameboard = require('./Gameboard');
const Player = require('./Player');

class GameEngine {
  constructor() {
    this.playerGameboard = new Gameboard();
    this.computerGameboard = new Gameboard();
    this.isPlayerTurn = true;
    this.gameOver = false;
    this.player = new Player(this.computerGameboard);
    this.computer = new Player(this.playerGameboard);
  }
  isGameOver = () => {
    return this.gameOver;
  };
  takeTurn = () => {
    if (
      this.playerGameboard.allShipsSunk() ||
      this.computerGameboard.allShipsSunk()
    ) {
      this.gameOver = true;
      return;
    }
    if (this.isPlayerTurn) {
      this.playerTurn();
    } else {
      this.computerTurn();
    }
    this.isPlayerTurn = !this.isPlayerTurn;
  };
  playerTurn = coordinates => {
    this.player.attack(coordinates);
  };
  computerTurn = () => {
    const coordinates = this.computer.makeRandomMove();
    this.playerGameboard.receiveAttack(coordinates);
  };
  startGame = () => {
    while (!this.isGameOver()) {
      this.takeTurn();
    }
  };
}

module.exports = GameEngine;
