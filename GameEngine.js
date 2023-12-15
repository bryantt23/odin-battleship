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
    this.winner;
  }
  isGameOver = () => {
    return this.gameOver;
  };
  takeTurn = () => {
    const playerLost = this.playerGameboard.allShipsSunk(),
      computerLost = this.computerGameboard.allShipsSunk();
    if (playerLost || computerLost) {
      if (playerLost) {
        this.winner = 'Computer wins';
      } else {
        this.winner = 'Player wins';
      }
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
  getCoordinatesFromPlayer = () => {
    //TODO get r & c from player
    /*
while(this.computerGameboard.hasBeenAttacked(r, c)){
    // get r & c from player
  }
  return [r, c]
*/
  };
  playerTurn = () => {
    const coordinates = this.getCoordinatesFromPlayer() || [1, 1];
    console.log('playerTurn coordinates:', coordinates); // Add this line
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
    return this.winner;
  };
}

module.exports = GameEngine;
