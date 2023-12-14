const SIZE = 10;
class Gameboard {
  constructor() {
    const matrix = [];
    for (let i = 0; i < SIZE; i++) {
      matrix.push(new Array(SIZE).fill(null));
    }
    this.gameboard = matrix;
    this.missedAttacks = [];
  }
  placeShip = (ship, [r, c], orientation) => {
    const shipLength = ship.length;
    if (orientation === 'horizontal') {
      const shipEnd = c + shipLength;
      if (shipEnd >= SIZE) {
        return false;
      }
      for (let i = 0; i < shipLength; i++) {
        if (this.getShipAt([r, c + i]) !== null) {
          return false;
        }
      }
      for (let i = 0; i < shipLength; i++) {
        this.gameboard[r][c + i] = ship;
      }
    } else {
      const shipEnd = r + shipLength;
      if (shipEnd >= SIZE) {
        return false;
      }
      for (let i = 0; i < shipLength; i++) {
        if (this.getShipAt([r + i, c]) !== null) {
          return false;
        }
      }
      for (let i = 0; i < shipLength; i++) {
        this.gameboard[r + i][c] = ship;
      }
    }
    return true;
  };
  getShipAt = ([r, c]) => this.gameboard[r][c];
}

module.exports = Gameboard;
