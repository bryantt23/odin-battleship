const Gameboard = require('./Gameboard');
const Ship = require('./Ship');

describe('Gameboard', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('should be able to place a ship at specific coordinates', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0]); // Assuming [0, 0] is the starting coordinate
    expect(gameboard.getShipAt([0, 0])).toBe(ship);
  });

  test('receiveAttack should correctly hit a ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0]);
    gameboard.receiveAttack([0, 0]);
    expect(ship.hits).toBe(1);
  });

  test('receiveAttack should record missed shots', () => {
    gameboard.receiveAttack([1, 1]);
    expect(gameboard.missedAttacks).toContainEqual([1, 1]);
  });

  test('should track missed attacks', () => {
    gameboard.receiveAttack([1, 1]);
    gameboard.receiveAttack([2, 2]);
    expect(gameboard.missedAttacks).toEqual(
      expect.arrayContaining([
        [1, 1],
        [2, 2]
      ])
    );
  });

  test('should report if all ships have been sunk', () => {
    const ship1 = new Ship(1);
    gameboard.placeShip(ship1, [0, 0]);
    ship1.hit();
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
