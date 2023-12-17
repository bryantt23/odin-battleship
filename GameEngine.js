const readline = require('readline');
const Gameboard = require('./Gameboard');
const Player = require('./Player');
const SIZE = 3;

class GameEngine {
  constructor() {
    this.playerDefenseBoard = new Gameboard(SIZE);
    this.playerAttackBoard = new Gameboard(SIZE);
    this.isPlayerTurn = true;
    this.gameOver = false;
    this.player = new Player(this.playerAttackBoard, SIZE);
    this.computer = new Player(this.playerDefenseBoard, SIZE);
    this.winner;
  }

  isGameOver = () => {
    const computerWins = this.playerDefenseBoard.allShipsSunk(),
      playerWins = this.playerAttackBoard.allShipsSunk();

    this.gameOver = playerWins || computerWins;
    if (this.gameOver) {
      this.winner = playerWins ? 'Player wins' : 'Computer wins';
    }

    return this.gameOver;
  };

  playerTurn = async () => {
    const coordinates = await this.getCoordinatesFromPlayer();
    this.player.attack(coordinates);
  };

  computerTurn = () => {
    console.log('computerTurn');
    const coordinates = this.computer.computerAttack();
    this.playerDefenseBoard.receiveAttack(coordinates);
  };

  getGameState = () => {
    return {
      gameOver: this.gameOver,
      winner: this.winner,
      playerBoard: this.playerDefenseBoard.gameboardState(),
      computerBoard: this.playerAttackBoard.gameboardState(),
      playerDefenseBoardMissedAttacks: this.playerDefenseBoard.missedAttacks,
      playerAttackBoardMissedAttacks: this.playerAttackBoard.missedAttacks,
      allData: this
    };
  };

  playGame = async playerCoordinates => {
    this.player.attack(playerCoordinates);

    if (this.isGameOver()) {
      return this.getGameState();
    }

    this.computerTurn();

    if (this.isGameOver()) {
      return this.getGameState();
    }
  };

  startGame = () => {
    this.playerDefenseBoard.randomlyPlaceShip(2);
    this.playerDefenseBoard.randomlyPlaceShip(1);
    this.playerAttackBoard.randomlyPlaceShip(2);
    this.playerAttackBoard.randomlyPlaceShip(1);
  };
}

module.exports = GameEngine;
