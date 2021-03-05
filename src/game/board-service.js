export const STATE = {
  SHIP: 1,
  HIT: 2,
  MISS: 3,
  SUNK: 4
};

export function makeFleet() {
  return [
    {
      name: 'Aircraft Carrier',
      color: 'cadet blue',
      size: 5,
      positions: []
    },
    {
      name: 'Battleship',
      color: 'red',
      size: 4,
      positions: []
    },
    {
      name: 'Submarine',
      color: 'chartreuse',
      size: 3,
      positions: []
    },
    {
      name: 'Patrol',
      color: 'yellow',
      size: 3,
      positions: []
    },
    {
      name: 'Patrol Boat',
      color: 'orange',
      size: 2,
      positions: []
    }
  ];
}

export function initializeBoard() {
  return {
    fleet: makeFleet(),
    state: {}
  };
}

export function initializeEnemyBoard() {
  const board = initializeBoard();

  placeShip(board, 0, 'H0', 'down');
  placeShip(board, 1, 'F0', 'down');
  placeShip(board, 2, 'D0', 'down');
  placeShip(board, 3, 'B0', 'down');
  placeShip(board, 4, 'B7', 'up');

  return board;
}

export function initializeOwnBoard() {
  const board = initializeBoard();

  placeShip(board, 0, 'A0', 'down');
  placeShip(board, 1, 'C0', 'down');
  placeShip(board, 2, 'E0', 'down');
  placeShip(board, 3, 'G0', 'down');
  placeShip(board, 4, 'G7', 'up');

  return board;
}

export function isHit(board, position) {
  const isHit = board.fleet.some(ship => ship.positions.some(p => p === position));
  if (isHit) {
    if (board.state[position] !== STATE.SUNK) {
      board.state[position] = STATE.HIT;
      checkSunk(board, position);
    }
  } else {
    board.state[position] = STATE.MISS;
  }
  board.state = {
    ...board.state
  };
  return isHit;
}

export function checkSunk(board, position) {
  board.fleet.forEach(ship => {
    ship.positions.forEach(shipPosition => {
      if (shipPosition === position) {
        const isSunk = ship.positions
          .map(p => board.state[p] === STATE.HIT)
          .reduce((acc, val) => acc && val);
        if (isSunk) {
          ship.positions.forEach(p => {
            board.state[p] = STATE.SUNK;
          });
        }
      }
    });
  });
}

export function getRelativePosition(position, direction) {
  const splitPosition = position.split('');
  switch (direction) {
    case 'right':
      return (
        String.fromCharCode(splitPosition[0].charCodeAt(0) + 1) +
        splitPosition[1]
      );
    case 'left':
      return (
        String.fromCharCode(splitPosition[0].charCodeAt(0) - 1) +
        splitPosition[1]
      );
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
    board.state[currentPosition] = STATE.SHIP;
    currentPosition = getRelativePosition(currentPosition, direction);
  }
}

export function getRandomPosition(columnCount, rowCount) {
  const column = String.fromCharCode(
    65 + Math.round(Math.random() * (rowCount - 1))
  );
  const row = Math.round(Math.random() * (columnCount - 1)).toString();
  return column + row;
}

export function getRandomBoardPosition(board, columnCount, rowCount) {
  let boardPosition = null;
  while (!boardPosition) {
    const randomPosition = getRandomPosition(columnCount, rowCount);
    if (
      board.state[randomPosition] === undefined ||
      board.state[randomPosition] === STATE.SHIP
    ) {
      boardPosition = randomPosition;
    }
  }
  return boardPosition;
}
