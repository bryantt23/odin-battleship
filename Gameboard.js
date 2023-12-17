const Ship = require('./Ship');

class Gameboard {
  constructor(SIZE) {
    const matrix = [];
    const alreadyAttackedTemp = [];
    for (let i = 0; i < SIZE; i++) {
      matrix.push(new Array(SIZE).fill(null));
      alreadyAttackedTemp.push(new Array(SIZE).fill(false));
    }
    this.gameboard = matrix;
    this.missedAttacks = [];
    this.alreadyAttacked = alreadyAttackedTemp;
    this.size = SIZE;
  }

  canPlaceShip = (r, c, shipLength, orientation) => {
    if (orientation === 'horizontal') {
      const shipEnd = c + shipLength;
      if (shipEnd > this.size) {
        return false;
      }
      for (let i = 0; i < shipLength; i++) {
        if (this.getShipAt([r, c + i]) !== null) {
          return false;
        }
      }
    } else {
      const shipEnd = r + shipLength;
      if (shipEnd > this.size) {
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

  randomlyPlaceShip = shipSize => {
    const maxAttempts = 100; // Limit the number of attempts to avoid infinite loops
    let attempts = 0;

    while (attempts < maxAttempts) {
      // Randomly choose orientation
      const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';

      // Randomly choose a starting position
      let r, c;
      if (orientation === 'horizontal') {
        r = Math.floor(Math.random() * this.size);
        c = Math.floor(Math.random() * (this.size - shipSize + 1));
      } else {
        r = Math.floor(Math.random() * (this.size - shipSize + 1));
        c = Math.floor(Math.random() * this.size);
      }

      // Attempt to place the ship
      const ship = new Ship(shipSize); // Assuming you have a Ship class
      if (this.placeShip(ship, [r, c], orientation)) {
        return true; // Ship placed successfully
      }

      attempts++;
    }

    return false; // Ship placement failed after max attempts
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
  receiveAttack = ([r, c]) => {
    this.alreadyAttacked[r][c] = true;
    const spot = this.gameboard[r][c];
    if (spot !== null) {
      //is a ship
      spot.hit();
      return true;
    } else {
      this.missedAttacks.push([r, c]);
      return false;
    }
  };
  hasBeenAttacked = ([r, c]) => {
    return this.alreadyAttacked[r][c];
  };
  allShipsSunk = () => {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const spot = this.gameboard[i][j];
        if (spot !== null) {
          if (!spot.isSunk()) {
            return false;
          }
        }
      }
      return true;
    }
  };
  gameboardState = () => {
    return this.gameboard;
  };
}

module.exports = Gameboard;
