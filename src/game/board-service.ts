export interface Ship {
  name: string;
  color: string;
  size: number;
  positions: string[];
}

export type Fleet = Ship[];
export type Position = string;

type Strategy = (boardSize: number) => Position;

export interface Board {
  fleet: Fleet;
}

export function makeFleet(): Fleet {
  return [
    {
      name: 'Aircraft Carrier',
      color: 'cadet blue',
      size: 5,
      positions: [],
    },
    {
      name: 'Battleship',
      color: 'red',
      size: 4,
      positions: [],
    },
    {
      name: 'Submarine',
      color: 'chartreuse',
      size: 3,
      positions: [],
    },
    {
      name: 'Patrol',
      color: 'yellow',
      size: 3,
      positions: [],
    },
    {
      name: 'Patrol Boat',
      color: 'orange',
      size: 2,
      positions: [],
    },
  ];
}

export function initializeBoard(): Board {
  return {
    fleet: makeFleet(),
  };
}

export function initializeEnemyBoard(): Board {
  const board: Board = {
    fleet: makeFleet(),
  };

  placeShip(board, 0, 'B4', 'down');
  placeShip(board, 1, 'E6', 'down');
  placeShip(board, 2, 'A3', 'right');
  placeShip(board, 3, 'F8', 'right');
  placeShip(board, 4, 'C5', 'down');

  return board;
}

export function isHit(board: Board, position: Position) {
  return board.fleet.some((ship) => ship.positions.some((p) => p === position));
}

export function getRelativePosition(position: Position, direction: string) {
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

export function placeShip(board: Board, shipIndex: number, position: Position, direction: string) {
  const ship = board.fleet[shipIndex];

  let currentPosition = position;
  for (let i = 0; i < ship.size; i++) {
    ship.positions.push(currentPosition);
    currentPosition = getRelativePosition(currentPosition, direction);
  }
}

export function getRandomPosition(columnCount: number, rowCount: number) {
  const column = String.fromCharCode(65 + Math.round(Math.random()) * rowCount);
  const row = (Math.round(Math.random()) * columnCount).toString();
  return column + row;
}

export const randomStrategy: Strategy = (boardSize) => getRandomPosition(boardSize, boardSize);

let i = 0;
const positions = ['a0', 'b5', 'e4'];
export const staticStrategy: Strategy = () => {
  const result = positions[i % positions.length];
  i++;
  return result;
};
