const GameEngine = require('./GameEngine');
const Gameboard = require('./Gameboard');
const Player = require('./Player');
const Ship = require('./Ship');

jest.mock('./Gameboard', () => {
  return jest.fn().mockImplementation(size => ({
    size,
    allShipsSunk: jest.fn(),
    receiveAttack: jest.fn(),
    placeShip: jest.fn(),
    gameboardState: jest.fn()
    // Add other methods and properties as needed
  }));
});

jest.mock('./Player', () => {
  return jest.fn().mockImplementation((enemyBoard, size) => ({
    enemyBoard,
    boardSize: size,
    attack: jest.fn(),
    computerAttack: jest.fn()
    // Add other methods and properties as needed
  }));
});

describe('GameEngine', () => {
  let gameEngine;
  const SIZE = 2;

  beforeEach(() => {
    jest.clearAllMocks();
    gameEngine = new GameEngine();
  });

  test('should initialize the game with two gameboards', () => {
    expect(Gameboard).toHaveBeenCalledTimes(2);
  });

  test('should start with player turn', () => {
    expect(gameEngine.isPlayerTurn).toBe(true);
  });

  test('playGame should manage turns and game state', async () => {
    gameEngine.playGame([0, 0]);
    expect(gameEngine.player.attack).toHaveBeenCalledWith([0, 0]);
    expect(gameEngine.computer.computerAttack).toHaveBeenCalled();
  });

  test('should indicate game is over when all ships are sunk', async () => {
    jest.spyOn(gameEngine, 'isGameOver').mockReturnValue(true);
    await gameEngine.playGame([0, 0]);
    expect(gameEngine.isGameOver()).toBe(true);
    gameEngine.isGameOver.mockRestore();
  });

  test('should indicate game is not over when ships are still afloat', async () => {
    jest.spyOn(gameEngine, 'isGameOver').mockReturnValue(false);
    await gameEngine.playGame([0, 0]);
    expect(gameEngine.isGameOver()).toBe(false);
    gameEngine.isGameOver.mockRestore();
  });

  // Additional tests can be added as needed...
});
