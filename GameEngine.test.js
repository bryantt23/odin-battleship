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

  test('should initialize game with two gameboards', () => {
    // Expect the Gameboard mock constructor to have been called twice
    expect(Gameboard).toHaveBeenCalledTimes(2);
  });

  test('should start with player turn', () => {
    expect(gameEngine.isPlayerTurn).toBe(true);
  });

  test('should toggle turns between player and computer', () => {
    gameEngine.isPlayerTurn = true;
    gameEngine.takeTurn();
    expect(gameEngine.isPlayerTurn).toBe(false);

    gameEngine.takeTurn();
    expect(gameEngine.isPlayerTurn).toBe(true);
  });

  test('game continues while no player has all ships sunk', () => {
    gameEngine.playerGameboard.allShipsSunk.mockReturnValue(false);
    gameEngine.computerGameboard.allShipsSunk.mockReturnValue(false);

    for (let i = 0; i < 10; i++) {
      gameEngine.takeTurn();
    }

    expect(gameEngine.playerGameboard.allShipsSunk).toHaveBeenCalled();
    expect(gameEngine.computerGameboard.allShipsSunk).toHaveBeenCalled();
  });

  test('game ends when a player has all ships sunk', () => {
    gameEngine.playerGameboard.allShipsSunk
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    gameEngine.computerGameboard.allShipsSunk.mockReturnValue(false);

    gameEngine.takeTurn();
    gameEngine.takeTurn();

    expect(gameEngine.isGameOver()).toBe(true);
  });

  test('playerTurn should make an attack on the computer gameboard', () => {
    const attackCoordinates = [1, 1];
    // Mock the getCoordinatesFromPlayer function to return attackCoordinates
    gameEngine.getCoordinatesFromPlayer = jest
      .fn()
      .mockReturnValue(attackCoordinates);

    gameEngine.player.attack = jest.fn().mockImplementation(coords => {
      console.log('player.attack called with:', coords);
      expect(coords).toEqual(attackCoordinates);
    });

    // Call playerTurn
    gameEngine.playerTurn();

    // Ensure that getCoordinatesFromPlayer is called before the attack
    expect(gameEngine.getCoordinatesFromPlayer).toHaveBeenCalled();
    expect(gameEngine.player.attack).toHaveBeenCalledWith(attackCoordinates);
    expect(gameEngine.computerGameboard.receiveAttack).toHaveBeenCalledWith(
      attackCoordinates
    );
  });

  test('computerTurn should make a random attack on the player gameboard', () => {
    const randomMove = [2, 2];
    gameEngine.computer.makeRandomMove.mockReturnValue(randomMove);
    gameEngine.computerTurn();

    expect(gameEngine.computer.makeRandomMove).toHaveBeenCalled();
    expect(gameEngine.playerGameboard.receiveAttack).toHaveBeenCalledWith(
      randomMove
    );
  });

  // Additional tests can be added as needed...
});
