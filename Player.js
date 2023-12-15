function getRandomInt() {
  return Math.floor(Math.random() * 10); // 10 is the range (0-9)
}

class Player {
  constructor(enemyBoard) {
    this.enemyBoard = enemyBoard;
  }
  attack = coordinates => {
    if (!this.isValidMove(coordinates)) {
      return 'invalid move';
    }
    const attack = this.enemyBoard.receiveAttack(coordinates);
    return attack ? 'hit' : 'miss';
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
  isValidMove = coordinates => {
    return !this.enemyBoard.hasBeenAttacked(coordinates);
  };
}

module.exports = Player;
