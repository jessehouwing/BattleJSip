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

export const enemyBoard = {
  ships: [
    {
      name: 'Carrier',
      color: 'green',
      size: 2,
      positions: ['a1', 'a2']
    }
  ]
};


export function initializeBoard() {
  return {
    ships: makeFleet()
  };
}


export function isHit(board, position) {
  return board.ships.some(ship => ship.positions.some(p => p === position))
}


export function getRelativePosition(position, direction) {
  const splitPosition = position.split('');
  switch (direction) {
    case 'right':
      return splitPosition[0] + (+splitPosition[1] + 1);
    case 'left':
      return splitPosition[0] + (+splitPosition[1] - 1);
    case 'up':
      return String.fromCharCode(splitPosition[0].charCodeAt(0) - 1) + splitPosition[1];
    case 'down':
      return String.fromCharCode(splitPosition[0].charCodeAt(0) + 1) + splitPosition[1];
    default:
      throw Error('invalid direction');
  }
}

export function placeShip(board, shipIndex, position, direction) {
  let ship = board.ships[shipIndex];

  let currentPosition = position;
  for (let i = 0; i < ship.size; i++) {
    ship.positions.push(currentPosition);
    currentPosition = getRelativePosition(currentPosition, direction)
  }
}


