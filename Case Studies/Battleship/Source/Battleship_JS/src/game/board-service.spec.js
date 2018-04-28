import {
  initializeBoard,
  initializeEnemyBoard,
  getRelativePosition,
  isHit,
  placeShip
} from './board-service';

describe('the board service', () => {
  it('should get relative position', () => {
    expect(getRelativePosition('C5', 'right')).toBe('D5');
    expect(getRelativePosition('C5', 'left')).toBe('B5');
    expect(getRelativePosition('C5', 'up')).toBe('C4');
    expect(getRelativePosition('C5', 'down')).toBe('C6');
  });

  it('should place ships', () => {
    let board = initializeBoard();
    placeShip(board, 0, 'A1', 'down');
    expect(board).toEqual({
      fleet: [
        {
          color: 'cadet blue',
          name: 'Aircraft Carrier',
          positions: ['A1', 'A2', 'A3', 'A4', 'A5'],
          size: 5
        },
        {
          color: 'red',
          name: 'Battleship',
          positions: [],
          size: 4
        },
        {
          color: 'chartreuse',
          name: 'Submarine',
          positions: [],
          size: 3
        },
        {
          color: 'yellow',
          name: 'Patrol',
          positions: [],
          size: 3
        },
        {
          color: 'orange',
          name: 'Patrol Boat',
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
          positions: ['B4', 'B5', 'B6', 'B7', 'B8'],
          size: 5
        },
        {
          color: 'red',
          name: 'Battleship',
          positions: ['E6', 'E7', 'E8', 'E9'],
          size: 4
        },
        {
          color: 'chartreuse',
          name: 'Submarine',
          positions: ['A3', 'B3', 'C3'],
          size: 3
        },
        {
          color: 'yellow',
          name: 'Patrol',
          positions: ['F8', 'G8', 'H8'],
          size: 3
        },
        {
          color: 'orange',
          name: 'Patrol Boat',
          positions: ['C5', 'C6'],
          size: 2
        }
      ]
    });
  });

  it('should check for hit or miss', () => {
    const enemyBoard = initializeEnemyBoard();
    expect(isHit(enemyBoard, 'B3')).toBe(true);
    expect(isHit(enemyBoard, 'B1')).toBe(false);
  });
});
