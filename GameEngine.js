const Gameboard = require('./Gameboard');
const Player = require('./Player');

class GameEngine {
  constructor() {
    this.player = new Gameboard();
    this.computer = new Gameboard();
    this.playerTurn = true;
    this.isGameOver = false;
  }
}

module.exports = GameEngine;
