function getRandomInt(boardSize) {
  return Math.floor(Math.random() * boardSize); // 10 is the range (0-9)
}

class Player {
  constructor(enemyBoard, boardSize) {
    this.enemyBoard = enemyBoard;
    this.boardSize = boardSize; // Store the board size
  }
  attack = coordinates => {
    if (!this.isValidMove(coordinates)) {
      return 'invalid move';
    }
    const attack = this.enemyBoard.receiveAttack(coordinates);
    return attack ? 'hit' : 'miss';
  };
  computerAttack = () => {
    let r = getRandomInt(this.boardSize),
      c = getRandomInt(this.boardSize);
    let curAttack = this.attack([r, c]);

    while (curAttack === 'invalid move') {
      r = getRandomInt(this.boardSize);
      c = getRandomInt(this.boardSize);
      curAttack = this.attack([r, c]);
    }
    console.log(
      `Computer attacked coordinates: [${r}, ${c}] - Result: ${curAttack}`
    );
    return [r, c];
  };

  isValidMove = coordinates => {
    return !this.enemyBoard.hasBeenAttacked(coordinates);
  };
}

module.exports = Player;
