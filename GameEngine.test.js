const GameEngine = require('./GameEngine');
const Gameboard = require('./Gameboard');
const Player = require('./Player');

jest.mock('./Gameboard', () => {
  return jest.fn().mockImplementation(() => ({
    allShipsSunk: jest.fn()
    // Add other methods and properties as needed
  }));
});

jest.mock('./Player');

describe('GameEngine', () => {
  let gameEngine;

  beforeEach(() => {
    jest.resetAllMocks();
    gameEngine = new GameEngine();
    // Assign the mock functions to the GameEngine instance
    gameEngine.playerGameboard.allShipsSunk = jest.fn();
    gameEngine.computerGameboard.allShipsSunk = jest.fn();
    gameEngine.playerTurn = jest.fn();
    gameEngine.computerTurn = jest.fn();
  });

  test('should initialize game with two gameboards', () => {
    expect(Gameboard).toHaveBeenCalledTimes(2);
  });

  test('should start with player turn', () => {
    expect(gameEngine.isPlayerTurn).toBe(true);
  });

  test('should toggle turns between player and computer', () => {
    gameEngine.playerGameboard.allShipsSunk.mockReturnValue(false);
    gameEngine.computerGameboard.allShipsSunk.mockReturnValue(false);

    gameEngine.isPlayerTurn = true;
    gameEngine.takeTurn();
    expect(gameEngine.playerTurn).toHaveBeenCalled();
    expect(gameEngine.computerTurn).not.toHaveBeenCalled();

    gameEngine.isPlayerTurn = false;
    gameEngine.takeTurn();
    expect(gameEngine.computerTurn).toHaveBeenCalled();
    expect(gameEngine.playerTurn).toHaveBeenCalledTimes(1);
  });

  test('takeTurn should toggle isPlayerTurn', () => {
    gameEngine.playerGameboard.allShipsSunk.mockReturnValue(false);
    gameEngine.computerGameboard.allShipsSunk.mockReturnValue(false);

    gameEngine.isPlayerTurn = true;
    gameEngine.takeTurn();
    expect(gameEngine.isPlayerTurn).toBe(false);

    gameEngine.takeTurn();
    expect(gameEngine.isPlayerTurn).toBe(true);
  });

  test('game continues while no player has all ships sunk', () => {
    gameEngine.playerGameboard.allShipsSunk.mockReturnValue(false);
    gameEngine.computerGameboard.allShipsSunk.mockReturnValue(false);

    for (let i = 0; i < 5; i++) {
      gameEngine.takeTurn();
    }

    expect(gameEngine.playerTurn).toHaveBeenCalledTimes(3); // Assuming player starts first
    expect(gameEngine.computerTurn).toHaveBeenCalledTimes(2);
  });

  test('game ends when a player has all ships sunk', () => {
    gameEngine.playerGameboard.allShipsSunk.mockReturnValue(false);
    gameEngine.computerGameboard.allShipsSunk
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    gameEngine.takeTurn(); // Player turn
    gameEngine.takeTurn(); // Computer turn, all ships are now sunk

    expect(gameEngine.computerGameboard.allShipsSunk).toHaveBeenCalled();
    expect(gameEngine.gameOver).toBe(true);
  });
});
