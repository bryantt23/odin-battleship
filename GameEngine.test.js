const GameEngine = require('./GameEngine');
const Gameboard = require('./Gameboard');
const Player = require('./Player');

jest.mock('./Gameboard', () => {
  return jest.fn().mockImplementation(() => {
    return {
      allShipsSunk: jest.fn()
      // Mock other methods as necessary
    };
  });
});

jest.mock('./Player');

describe('GameEngine', () => {
  let gameEngine;

  beforeEach(() => {
    // Reset and setup mocks for each test
    jest.resetAllMocks();

    // Initialize GameEngine
    gameEngine = new GameEngine();

    // Mocking GameEngine's internal methods
    gameEngine.playerTurn = jest.fn();
    gameEngine.computerTurn = jest.fn();
    gameEngine.isGameOver = jest.fn();
  });

  test('should initialize game with two gameboards', () => {
    expect(Gameboard).toHaveBeenCalledTimes(2);
  });

  test('should start with player turn', () => {
    expect(gameEngine.isPlayerTurn).toBe(true);
  });

  test('should toggle turns between player and computer', () => {
    gameEngine.isPlayerTurn = true;
    gameEngine.takeTurn();
    expect(gameEngine.playerTurn).toHaveBeenCalled();
    expect(gameEngine.computerTurn).not.toHaveBeenCalled();

    gameEngine.isPlayerTurn = false;
    gameEngine.takeTurn();
    expect(gameEngine.computerTurn).toHaveBeenCalled();
    expect(gameEngine.playerTurn).toHaveBeenCalledTimes(1); // playerTurn was called in the first takeTurn
  });

  test('takeTurn should toggle isPlayerTurn', () => {
    gameEngine.isPlayerTurn = true;
    gameEngine.takeTurn();
    expect(gameEngine.isPlayerTurn).toBe(false);

    gameEngine.takeTurn();
    expect(gameEngine.isPlayerTurn).toBe(true);
  });

  test('startGame should run the game loop until the game is over', () => {
    gameEngine.isGameOver
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true);

    gameEngine.startGame();

    expect(gameEngine.isGameOver).toHaveBeenCalledTimes(3);
    expect(gameEngine.playerTurn).toHaveBeenCalled();
    expect(gameEngine.computerTurn).toHaveBeenCalled();
  });

  test('game continues while no player has all ships sunk', () => {
    gameEngine.playerBoard.allShipsSunk.mockReturnValue(false);
    gameEngine.computerBoard.allShipsSunk.mockReturnValue(false);
    gameEngine.startGame();
    expect(gameEngine.isGameOver()).toBe(true);
  });

  test('game ends when a player has all ships sunk', () => {
    gameEngine.playerBoard.allShipsSunk.mockReturnValue(false);
    gameEngine.computerBoard.allShipsSunk.mockReturnValue(true);
    gameEngine.startGame();
    expect(gameEngine.isGameOver()).toBe(true);
  });

  // Add more tests as needed...
});
