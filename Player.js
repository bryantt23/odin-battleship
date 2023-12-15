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
  computerAttack = () => {
    let r = getRandomInt(),
      c = getRandomInt();
    let curAttack = this.attack([r, c]);

    while (curAttack === 'invalid move') {
      r = getRandomInt();
      c = getRandomInt();
      curAttack = this.attack([r, c]);
    }
    return [r, c];
  };
  isValidMove = coordinates => {
    return !this.enemyBoard.hasBeenAttacked(coordinates);
  };
}

module.exports = Player;
