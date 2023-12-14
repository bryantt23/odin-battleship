const SIZE = 10;
class Gameboard {
  constructor() {
    const matrix = [];
    const alreadyAttackedTemp = [];
    for (let i = 0; i < SIZE; i++) {
      matrix.push(new Array(SIZE).fill(null));
      alreadyAttackedTemp.push(new Array(SIZE).fill(false));
    }
    this.gameboard = matrix;
    this.missedAttacks = [];
    this.alreadyAttacked = alreadyAttackedTemp;
  }

  canPlaceShip = (r, c, shipLength, orientation) => {
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
    }
    return true;
  };

  placeShip = (ship, [r, c], orientation) => {
    const shipLength = ship.length;
    if (!this.canPlaceShip(r, c, shipLength, orientation)) {
      return false;
    }

    if (orientation === 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        this.gameboard[r][c + i] = ship;
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        this.gameboard[r + i][c] = ship;
      }
    }
    return true;
  };
  getShipAt = ([r, c]) => this.gameboard[r][c];
}

module.exports = Gameboard;
