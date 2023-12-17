const Gameboard = require('./Gameboard');
const Ship = require('./Ship');

describe('Gameboard', () => {
  let gameboard;
  const SIZE = 10;

  beforeEach(() => {
    gameboard = new Gameboard(SIZE);
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

  test('should correctly identify a location with a ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.getShipAt([0, 0])).toBe(ship);
    expect(gameboard.getShipAt([0, 1])).toBe(ship); // Check adjacent horizontal location
  });

  test('should correctly identify a location with a ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [3, 3], 'vertical');
    expect(gameboard.getShipAt([3, 3])).toBe(ship);
    expect(gameboard.getShipAt([5, 3])).toBe(ship); // Check adjacent horizontal location
  });

  test('should correctly identify a location without a ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.getShipAt([1, 1])).toBeNull(); // Check a vertical location next to the ship
    expect(gameboard.getShipAt([4, 4])).toBeNull(); // Check a location far from the ship
  });

  test('should handle vertical ship placement correctly', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'vertical');
    expect(gameboard.getShipAt([0, 0])).toBe(ship);
    expect(gameboard.getShipAt([1, 0])).toBe(ship); // Check adjacent vertical location
    expect(gameboard.getShipAt([2, 0])).toBe(ship); // Check another adjacent vertical location
    expect(gameboard.getShipAt([1, 1])).toBeNull(); // Check a horizontal location next to the ship
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

  test('should return true for a spot that has been attacked', () => {
    gameboard.receiveAttack([1, 1]);
    expect(gameboard.hasBeenAttacked([1, 1])).toBe(true);
  });

  test('should return false for a spot that has not been attacked', () => {
    expect(gameboard.hasBeenAttacked([2, 2])).toBe(false);
  });

  test('should return true for a spot that has been attacked and contains a ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.hasBeenAttacked([0, 0])).toBe(true);
  });

  test('should return false for a spot next to an attacked spot', () => {
    gameboard.receiveAttack([2, 2]);
    expect(gameboard.hasBeenAttacked([2, 3])).toBe(false);
  });

  test('should return true for multiple attacked spots', () => {
    gameboard.receiveAttack([3, 3]);
    gameboard.receiveAttack([4, 4]);
    expect(gameboard.hasBeenAttacked([3, 3])).toBe(true);
    expect(gameboard.hasBeenAttacked([4, 4])).toBe(true);
  });

  test('should return false for spots in a different row or column from an attacked spot', () => {
    gameboard.receiveAttack([5, 5]);
    expect(gameboard.hasBeenAttacked([5, 4])).toBe(false);
    expect(gameboard.hasBeenAttacked([4, 5])).toBe(false);
  });

  test('should not allow placing a ship that overlaps with another ship', () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(4);
    gameboard.placeShip(ship1, [0, 0], 'horizontal');
    const result = gameboard.placeShip(ship2, [0, 1], 'horizontal');
    expect(result).toBe(false); // Expect the second ship placement to fail due to overlap
  });

  test('gameboardState should return the correct initial state', () => {
    const initialState = gameboard.gameboardState();
    const expectedState = Array.from({ length: SIZE }, () =>
      Array(SIZE).fill(null)
    );
    expect(initialState).toEqual(expectedState);
  });

  test('gameboardState should reflect ship placement', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    const state = gameboard.gameboardState();
    expect(state[0][0]).toBe(ship);
    expect(state[0][1]).toBe(ship);
    expect(state[0][2]).toBe(ship);
    expect(state[0][3]).toBe(null);
  });

  test('gameboardState should reflect a hit on a ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.receiveAttack([0, 0]);
    const state = gameboard.gameboardState();
    expect(state[0][0].hits).toBe(1);
  });

  test('gameboardState should reflect a missed attack', () => {
    gameboard.receiveAttack([1, 1]);
    const state = gameboard.gameboardState();
    expect(state[1][1]).toBe(null);
  });
});
