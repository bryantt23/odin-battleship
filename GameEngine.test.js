const GameEngine = require('./GameEngine');
const Gameboard = require('./Gameboard');
const Player = require('./Player');

jest.mock('./Gameboard');
jest.mock('./Player');

describe('GameEngine', () => {
  let gameEngine;

  beforeEach(() => {
    gameEngine = new GameEngine();
  });

  test('should initialize game with two gameboards', () => {
    expect(Gameboard).toHaveBeenCalledTimes(2);
  });

  test('should start with player turn', () => {
    expect(gameEngine.isPlayerTurn).toBe(true);
  });

  test('should toggle turns between player and computer', () => {
    // Assuming playerTurn and computerTurn methods toggle the isPlayerTurn flag
    gameEngine.playerTurn();
    expect(gameEngine.isPlayerTurn).toBe(false);
    gameEngine.computerTurn();
    expect(gameEngine.isPlayerTurn).toBe(true);
  });

  test('game continues while no player has all ships sunk', () => {
    Gameboard.prototype.allShipsSunk
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    gameEngine.startGame();
    expect(gameEngine.isGameOver()).toBe(true);
  });

  test('game ends when a player has all ships sunk', () => {
    Gameboard.prototype.allShipsSunk
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    gameEngine.startGame();
    expect(gameEngine.isGameOver()).toBe(true);
  });

  // Add more tests as needed...
});
