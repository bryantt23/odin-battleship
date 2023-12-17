const readline = require('readline');
const Gameboard = require('./Gameboard');
const Player = require('./Player');
const Ship = require('./Ship');
const SIZE = 2;

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
    console.log(
      '🚀 ~ file: GameEngine.js:64 ~ GameEngine ~ playerCoordinates:',
      playerCoordinates
    );
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
    let ship = new Ship(1);
    this.playerDefenseBoard.placeShip(ship, [0, 0], 'horizontal');
    ship = new Ship(1);
    this.playerAttackBoard.placeShip(ship, [0, 1], 'vertical');
  };
}

module.exports = GameEngine;
