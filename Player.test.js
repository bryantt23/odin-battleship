const Player = require('./Player');
const Gameboard = require('./Gameboard');

describe('Player', () => {
  let player, enemyBoard;
  beforeEach(() => {
    enemyBoard = new Gameboard();
    player = new Player(enemyBoard);
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
});

describe('Computer Player', () => {
  let computerPlayer, enemyBoard;
  beforeEach(() => {
    enemyBoard = new Gameboard();
    computerPlayer = new Player(enemyBoard);
  });

  test('should make random legal plays', () => {
    const move = computerPlayer.makeRandomMove();
    computerPlayer.attack(move);
    expect(enemyBoard.hasBeenAttacked(move)).toBe(true);
  });

  test('random move should avoid already attacked positions', () => {
    // Simulate a scenario with some attacked positions
    for (let i = 0; i < 5; i++) {
      enemyBoard.receiveAttack([i, i]);
    }

    let isUnique = true;
    for (let i = 0; i < 100; i++) {
      // Try multiple times to ensure randomness
      let move = computerPlayer.makeRandomMove();
      if (enemyBoard.hasBeenAttacked(move)) {
        isUnique = false;
        break;
      }
    }

    expect(isUnique).toBe(true);
  });
});
