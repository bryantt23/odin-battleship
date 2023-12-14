const Gameboard = require('./Gameboard');
const Ship = require('./Ship');

describe('Gameboard', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('should be able to place a ship at specific coordinates with orientation', () => {
    const ship = new Ship(3);
    const result = gameboard.placeShip(ship, [0, 0], 'horizontal'); // Include orientation
    expect(result).toBe(true);
    expect(gameboard.getShipAt([0, 0])).toBe(ship);
  });

  test('should return false when trying to place a ship off the board', () => {
    const ship = new Ship(3);
    const result = gameboard.placeShip(ship, [8, 8], 'horizontal'); // Check for invalid placement
    expect(result).toBe(false);
  });
  /*
  test('should correctly identify a location with a ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.getShipAt([0, 0])).toBe(ship);
    expect(gameboard.getShipAt([1, 0])).toBe(ship); // Check adjacent horizontal location
  });

  test('should correctly identify a location without a ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.getShipAt([0, 1])).toBeNull(); // Check a vertical location next to the ship
    expect(gameboard.getShipAt([4, 4])).toBeNull(); // Check a location far from the ship
  });

  test('should handle vertical ship placement correctly', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'vertical');
    expect(gameboard.getShipAt([0, 0])).toBe(ship);
    expect(gameboard.getShipAt([0, 1])).toBe(ship); // Check adjacent vertical location
    expect(gameboard.getShipAt([0, 2])).toBe(ship); // Check another adjacent vertical location
    expect(gameboard.getShipAt([1, 0])).toBeNull(); // Check a horizontal location next to the ship
  });

  test('should not allow overlapping ship placement', () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(2);
    gameboard.placeShip(ship1, [0, 0], 'horizontal');
    const result = gameboard.placeShip(ship2, [0, 1], 'vertical'); // Attempt to overlap
    expect(result).toBe(false);
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
  */
});
