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
});
