import { initializeBoard, fleet, getRelativePosition, isHit, placeShip} from './board';

it('should run' , () => {
  expect(isHit(enemyBoard, 'a1')).toBe(true);
  expect(isHit(enemyBoard, 'b1')).toBe(false);
});

it('should get relative position', () => {
  expect(getRelativePosition('c5', 'right')).toBe('c6');
  expect(getRelativePosition('c5', 'left')).toBe('c4');
  expect(getRelativePosition('c5', 'up')).toBe('b5');
  expect(getRelativePosition('c5', 'down')).toBe('d5');
});


fit('should place ships', () => {
  let board = initializeBoard();
  placeShip(board, 0, 'a1', 'right');
  expect(board).toEqual({
    ships: [
      {
        name: 'Carrier',
        color: 'green',
        size: 2,
        positions: ['a1', 'a2']
      }
    ]
  });
});