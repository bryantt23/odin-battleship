function getRandomInt() {
  return Math.floor(Math.random() * 10); // 10 is the range (0-9)
}

class Player {
  attack = (enemyBoard, coordinates) => {
    enemyBoard.receiveAttack(coordinates);
  };
  makeRandomMove = () => {
    return [getRandomInt(), getRandomInt()];
  };
}

module.exports = Player;
