export function makeFleet() {
  return [
    {
      name: 'Carrier',
      color: 'green',
      size: 2,
      positions: []
    }
  ];
}

export function initializeBoard() {
  return {
    fleet: makeFleet()
  };
}

export function initializeEnemyBoard() {
  const board = {
    fleet: makeFleet()
  };

  placeShip(board, 0, 'b3', 'left');

  return board;
}

export function isHit(board, position) {
  return board.fleet.some(ship => ship.positions.some(p => p === position))
}


export function getRelativePosition(position, direction) {
  const splitPosition = position.split('');
  switch (direction) {
    case 'right':
      return String.fromCharCode(splitPosition[0].charCodeAt(0) + 1) + splitPosition[1];
    case 'left':
      return String.fromCharCode(splitPosition[0].charCodeAt(0) - 1) + splitPosition[1];
    case 'up':
      return splitPosition[0] + (+splitPosition[1] - 1);
    case 'down':
      return splitPosition[0] + (+splitPosition[1] + 1);
    default:
      throw Error('invalid direction');
  }
}

export function placeShip(board, shipIndex, position, direction) {
  let ship = board.fleet[shipIndex];

  let currentPosition = position;
  for (let i = 0; i < ship.size; i++) {
    ship.positions.push(currentPosition);
    currentPosition = getRelativePosition(currentPosition, direction)
  }
}


