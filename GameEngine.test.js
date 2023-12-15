const GameEngine = require('./GameEngine');
const Gameboard = require('./Gameboard');
const Player = require('./Player');

// Mock Gameboard and Player outside of describe block
jest.mock('./Gameboard', () =>
  jest.fn(() => ({
    allShipsSunk: jest.fn(),
    receiveAttack: jest.fn()
  }))
);

jest.mock('./Player', () =>
  jest.fn(() => ({
    makeRandomMove: jest.fn(),
    attack: jest.fn()
  }))
);

describe('GameEngine', () => {
  let gameEngine;

  beforeEach(() => {
    jest.clearAllMocks();
    gameEngine = new GameEngine();
  });

  test('should initialize the game with two gameboards', () => {
    // Expect the Gameboard mock constructor to have been called twice
    expect(Gameboard).toHaveBeenCalledTimes(2);
  });

  test('should start with player turn', () => {
    expect(gameEngine.isPlayerTurn).toBe(true);
  });

  test('should toggle turns between player and computer', () => {
    const initialTurn = gameEngine.isPlayerTurn;
    gameEngine.takeTurn();
    expect(gameEngine.isPlayerTurn).toBe(!initialTurn);

    gameEngine.takeTurn();
    expect(gameEngine.isPlayerTurn).toBe(initialTurn);
  });

  test('should end the game when a player has all ships sunk', () => {
    gameEngine.playerGameboard.allShipsSunk = jest.fn().mockReturnValue(true);
    gameEngine.takeTurn();
    expect(gameEngine.isGameOver()).toBe(true);
  });

  test('playerTurn should call player.attack and computerGameboard.receiveAttack', () => {
    gameEngine.playerTurn();
  });

  test('computerTurn should call computer.makeRandomMove and playerGameboard.receiveAttack', () => {
    const randomMove = [2, 2];
    gameEngine.computer.makeRandomMove = jest.fn().mockReturnValue(randomMove);

    gameEngine.computerTurn();

    expect(gameEngine.computer.makeRandomMove).toHaveBeenCalled();
    expect(gameEngine.playerGameboard.receiveAttack).toHaveBeenCalledWith(
      randomMove
    );
  });

  test('startGame should end the game when all ships are sunk', () => {
    gameEngine.playerGameboard.allShipsSunk = jest.fn().mockReturnValue(true);
    gameEngine.startGame();
    expect(gameEngine.isGameOver()).toBe(true);
  });

  it('should return "Player wins" when player wins', () => {
    const gameEngine = new GameEngine();

    // Set up the game to make the player win
    gameEngine.playerGameboard.allShipsSunk = jest.fn(() => false);
    gameEngine.computerGameboard.allShipsSunk = jest.fn(() => true);

    gameEngine.startGame();

    expect(gameEngine.isGameOver()).toBe(true);
    expect(gameEngine.startGame()).toBe('Player wins');
  });

  it('should return "Computer wins" when computer wins', () => {
    const gameEngine = new GameEngine();

    // Set up the game to make the computer win
    gameEngine.playerGameboard.allShipsSunk = jest.fn(() => true);
    gameEngine.computerGameboard.allShipsSunk = jest.fn(() => false);

    gameEngine.startGame();

    expect(gameEngine.isGameOver()).toBe(true);
    expect(gameEngine.startGame()).toBe('Computer wins');
  });
  // Additional tests can be added as needed...
});
