const readline = require('readline');
const Gameboard = require('./Gameboard');
const Player = require('./Player');
const Ship = require('./Ship');

class GameEngine {
  constructor() {
    this.playerDefenseBoard = new Gameboard();
    this.playerAttackBoard = new Gameboard();
    this.isPlayerTurn = true;
    this.gameOver = false;
    this.player = new Player(this.playerAttackBoard);
    this.computer = new Player(this.playerDefenseBoard);
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
    console.log('playerTurn');
    const coordinates = await this.getCoordinatesFromPlayer();
    console.log(
      '🚀 ~ file: GameEngine.js:47 ~ GameEngine ~ coordinates:',
      coordinates
    );
    console.log('playerTurn coordinates:', coordinates); // Add this line
    this.player.attack(coordinates);
  };

  computerTurn = () => {
    console.log('computerTurn');
    const coordinates = [0, 0]; //this.computer.makeRandomMove();
    console.log(
      '🚀 ~ file: GameEngine.js:53 ~ GameEngine ~ coordinates:',
      coordinates
    );
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
    console.log('start game');
    let ship = new Ship(1);
    this.playerDefenseBoard.placeShip(ship, [0, 0], 'horizontal');
    ship = new Ship(1);
    this.playerAttackBoard.placeShip(ship, [0, 1], 'vertical');
  };
}

module.exports = GameEngine;
