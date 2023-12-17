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
    return this.gameOver;
  };
  takeTurn = async () => {
    const computerWins = this.playerDefenseBoard.allShipsSunk(),
      playerWins = this.playerAttackBoard.allShipsSunk();
    if (playerWins || computerWins) {
      if (playerWins) {
        this.winner = 'Player wins';
      } else {
        this.winner = 'Computer wins';
      }
      this.gameOver = true;
      return;
    }
    if (this.isPlayerTurn) {
      await this.playerTurn();
    } else {
      this.computerTurn();
    }
    this.isPlayerTurn = !this.isPlayerTurn;
  };
  getCoordinatesFromPlayer = () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log('getCoordinatesFromPlayer');

    return new Promise(resolve => {
      rl.question('Enter coordinates (row, column): ', answer => {
        // Convert input to coordinates
        const [r, c] = answer.split(',').map(num => parseInt(num.trim()));
        rl.close();

        // Validate coordinates (you can add more validation as needed)
        if (!isNaN(r) && !isNaN(c)) {
          resolve([r, c]);
        } else {
          console.log('Invalid input, try again.');
          resolve(this.getCoordinatesFromPlayer());
        }
      });
    });
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
    if (this.isGameOver()) {
      return {
        gameOver: true,
        winner: this.winner,
        playerBoard: this.playerDefenseBoard.gameboardState(),
        computerBoard: this.playerAttackBoard.gameboardState(),
        allData: this
      };
    }

    if (this.playerTurn) {
      await this.player.attack(playerCoordinates);
    } else {
      this.computerTurn();
    }

    this.isPlayerTurn = !this.isPlayerTurn;

    return {
      gameOver: false,
      winner: this.winner,
      playerBoard: this.playerDefenseBoard.gameboardState(),
      computerBoard: this.playerAttackBoard.gameboardState(),
      allData: this
    };
  };

  startGame = async () => {
    console.log('start game');
    let ship = new Ship(2);
    this.playerDefenseBoard.placeShip(ship, [0, 0], 'horizontal');
    ship = new Ship(2);
    this.playerAttackBoard.placeShip(ship, [0, 1], 'vertical');
    // await this.playGame();
  };
}

module.exports = GameEngine;
