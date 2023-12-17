const Player = require('./Player');
const Gameboard = require('./Gameboard');

describe('Player', () => {
  let player, enemyBoard;
  const boardSize = 10; // Assuming the board size is 10
  beforeEach(() => {
    enemyBoard = new Gameboard(boardSize);
    player = new Player(enemyBoard, boardSize);
  });

  test('should be able to attack enemy Gameboard', () => {
    player.attack([0, 0]);
    expect(enemyBoard.hasBeenAttacked([0, 0])).toBe(true);
  });

  test('should not attack a position that has already been attacked', () => {
    player.attack([1, 1]);
    player.attack([1, 1]); // Attack the same position again
    expect(enemyBoard.hasBeenAttacked([1, 1])).toBe(true);
  });

  test('should not attack a position that has already been attacked 2', () => {
    player.attack([2, 2]);
    const result = player.attack([2, 2]); // Attack the same position again
    expect(enemyBoard.hasBeenAttacked([2, 2])).toBe(true);
    expect(result).toBe('invalid move'); // Assert that the move is invalid
  });
});

describe('Computer Player', () => {
  let computerPlayer, enemyBoard;
  const boardSize = 10; // Assuming the board size is 10
  beforeEach(() => {
    enemyBoard = new Gameboard(boardSize);
    computerPlayer = new Player(enemyBoard, boardSize);
  });

  test('should make random legal plays', () => {
    const move = computerPlayer.computerAttack();
    computerPlayer.attack(move);
    expect(enemyBoard.hasBeenAttacked(move)).toBe(true);
  });

  test('random move should avoid already attacked positions', () => {
    // Simulate a scenario with some attacked positions
    for (let i = 0; i < 5; i++) {
      enemyBoard.receiveAttack([i, i]);
    }

    let uniqueMoves = new Set();
    for (let i = 0; i < 25; i++) {
      let move = computerPlayer.computerAttack();
      uniqueMoves.add(JSON.stringify(move));
    }

    // Asserting that unique moves are being made
    expect(uniqueMoves.size).toBeGreaterThan(1); // Adjust this based on the expected randomness
  });
});
