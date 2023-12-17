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
    if (playerWins || computerWins) {
      if (playerWins) {
        this.winner = 'Player wins';
      } else {
        this.winner = 'Computer wins';
      }
      this.gameOver = true;
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

  playGame = async playerCoordinates => {
    return new Promise((resolve, reject) => {
      this.player.attack(playerCoordinates);
      if (this.isGameOver()) {
        resolve({
          gameOver: true,
          winner: this.winner,
          playerBoard: this.playerDefenseBoard.gameboardState(),

          computerBoard: this.playerAttackBoard.gameboardState(),
          playerDefenseBoardMissedAttacks:
            this.playerDefenseBoard.missedAttacks,
          playerAttackBoardMissedAttacks: this.playerAttackBoard.missedAttacks,
          allData: this
        });
      }

      this.computerTurn();
      if (this.isGameOver()) {
        resolve({
          gameOver: true,
          winner: this.winner,
          playerBoard: this.playerDefenseBoard.gameboardState(),
          computerBoard: this.playerAttackBoard.gameboardState(),
          playerDefenseBoardMissedAttacks:
            this.playerDefenseBoard.missedAttacks,
          playerAttackBoardMissedAttacks: this.playerAttackBoard.missedAttacks,
          allData: this
        });
      }

      resolve({
        gameOver: false,
        winner: this.winner,
        playerBoard: this.playerDefenseBoard.gameboardState(),
        computerBoard: this.playerAttackBoard.gameboardState(),
        playerDefenseBoardMissedAttacks: this.playerDefenseBoard.missedAttacks,
        playerAttackBoardMissedAttacks: this.playerAttackBoard.missedAttacks,
        allData: this
      });
    });
  };

  startGame = async () => {
    console.log('start game');
    let ship = new Ship(1);
    this.playerDefenseBoard.placeShip(ship, [0, 0], 'horizontal');
    ship = new Ship(1);
    this.playerAttackBoard.placeShip(ship, [0, 1], 'vertical');
  };
}

module.exports = GameEngine;
