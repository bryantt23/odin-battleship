function getRandomInt() {
  return Math.floor(Math.random() * 10); // 10 is the range (0-9)
}

class Player {
  constructor(enemyBoard) {
    this.enemyBoard = enemyBoard;
  }
  attack = coordinates => {
    this.enemyBoard.receiveAttack(coordinates);
  };
  makeRandomMove = () => {
    let r = getRandomInt(),
      c = getRandomInt();
    while (this.enemyBoard.hasBeenAttacked([r, c])) {
      r = getRandomInt();
      c = getRandomInt();
    }
    return [r, c];
  };
}

module.exports = Player;
