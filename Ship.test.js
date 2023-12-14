const Ship = require('./Ship');

describe('Ship', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(3); // Assuming length of the ship is 3
  });

  test('should initialize with given length', () => {
    expect(ship.length).toBe(3);
  });

  test('hit function should increase the hit count', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('isSunk should return false when hits are less than length', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk should return true when hits equal length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
