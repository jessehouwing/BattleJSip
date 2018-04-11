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
        name: 'Carrier',
        color: 'green',
        size: 2,
        positions: ['a1', 'a2']
      }
    ]
  });
});

it('should initialize an enemy board', () => {
  expect(initializeEnemyBoard()).toEqual({
    fleet: [{
      color: 'green',
      name: 'Carrier',
      positions: ['b3', 'b2'],
      size: 2
    }]
  })
});

it('should check for hit or miss', () => {
  const enemyBoard = initializeEnemyBoard();
  expect(isHit(enemyBoard, 'b3')).toBe(true);
  expect(isHit(enemyBoard, 'b1')).toBe(false);
});
