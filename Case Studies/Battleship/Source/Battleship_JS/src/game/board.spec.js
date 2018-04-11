import { initializeBoard, initializeEnemyBoard, fleet, getRelativePosition, isHit, placeShip } from './board';

it('should get relative position', () => {
  expect(getRelativePosition('c5', 'right')).toBe('d5');
  expect(getRelativePosition('c5', 'left')).toBe('b5');
  expect(getRelativePosition('c5', 'up')).toBe('c4');
  expect(getRelativePosition('c5', 'down')).toBe('c6');
});


it('should place ships', () => {
  let board = initializeBoard();
  placeShip(board, 0, 'a1', 'down');
  expect(board).toEqual({

    fleet: [
      {
        color: 'cadet blue',
        name: 'Aircraft Carrier',
        positions: ['a1', 'a2', 'a3', 'a4', 'a5'],
        size: 5
      },
      {
        color: "red",
        name: "Battleship",
        positions: [],
        size: 4
      },
      {
        color: "chartreuse",
        name: "Submarine",
        positions: [],
        size: 3
      },
      {
        color: "yellow",
        name: "Patrol",
        positions: [],
        size: 3
      },
      {
        color: "orange",
        name: "Patrol Boat",
        positions: [],
        size: 2
      }
    ]
  });
});

it('should initialize an enemy board', () => {
  expect(initializeEnemyBoard()).toEqual({
    fleet: [
      {
        color: 'cadet blue',
        name: 'Aircraft Carrier',
        positions: ['b4', 'b5', 'b6', 'b7', 'b8'],
        size: 5
      },
      {
        color: "red",
        name: "Battleship",
        positions: ['e6', 'e7', 'e8', 'e9'],
        size: 4
      },
      {
        color: "chartreuse",
        name: "Submarine",
        positions: ['a3', 'b3', 'c3'],
        size: 3
      },
      {
        color: "yellow",
        name: "Patrol",
        positions: ['f8', 'g8', 'h8'],
        size: 3
      },
      {
        color: "orange",
        name: "Patrol Boat",
        positions: ['c5', 'c6'],
        size: 2
      }
    ]
  })
});

it('should check for hit or miss', () => {
  const enemyBoard = initializeEnemyBoard();
  expect(isHit(enemyBoard, 'b3')).toBe(true);
  expect(isHit(enemyBoard, 'b1')).toBe(false);
});
