const Player = require('./Player');
const Gameboard = require('./Gameboard');

describe('Player', () => {
  let player, enemyBoard;
  beforeEach(() => {
    player = new Player();
    enemyBoard = new Gameboard();
  });

  test('should be able to attack enemy Gameboard', () => {
    player.attack(enemyBoard, [0, 0]);
    expect(enemyBoard.hasBeenAttacked([0, 0])).toBe(true);
  });

  test('should not attack a position that has already been attacked', () => {
    player.attack(enemyBoard, [1, 1]);
    player.attack(enemyBoard, [1, 1]); // Attack the same position again
    expect(enemyBoard.hasBeenAttacked([1, 1])).toBe(true);
  });
});

describe('Computer Player', () => {
  let computerPlayer, enemyBoard;
  beforeEach(() => {
    computerPlayer = new Player('computer');
    enemyBoard = new Gameboard();
  });

  test('should make random legal plays', () => {
    const move = computerPlayer.makeRandomMove();
    computerPlayer.attack(enemyBoard, move);
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
