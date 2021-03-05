import {
  initializeBoard,
  initializeEnemyBoard,
  getRelativePosition,
  isHit,
  placeShip,
  STATE,
  getRandomPosition
} from './board-service';

function getTopAndLeft(position) {
  const splitPosition = position.split('');
  const character = splitPosition[0];
  const number = splitPosition[1];

  const top = parseInt(number);
  const left = character.charCodeAt(0) - 65;

  return {
    top,
    left
  };
}

describe('the board service', () => {
  it('should get relative position', () => {
    expect(getRelativePosition('C5', 'right')).toBe('D5');
    expect(getRelativePosition('C5', 'left')).toBe('B5');
    expect(getRelativePosition('C5', 'up')).toBe('C4');
    expect(getRelativePosition('C5', 'down')).toBe('C6');
  });

  it('should place ships', () => {
    let board = initializeBoard();
    placeShip(board, 0, 'H0', 'down');
    expect(board.fleet).toEqual([
      {
        color: 'cadet blue',
        name: 'Aircraft Carrier',
        positions: ['H0', 'H1', 'H2', 'H3', 'H4'],
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
    ]);
  });

  it('should initialize an enemy board', () => {
    expect(initializeEnemyBoard().fleet).toEqual([
      {
        color: 'cadet blue',
        name: 'Aircraft Carrier',
        positions: ['H0', 'H1', 'H2', 'H3', 'H4'],
        size: 5
      },
      {
        color: 'red',
        name: 'Battleship',
        positions: ['F0', 'F1', 'F2', 'F3'],
        size: 4
      },
      {
        color: 'chartreuse',
        name: 'Submarine',
        positions: ['D0', 'D1', 'D2'],
        size: 3
      },
      {
        color: 'yellow',
        name: 'Patrol',
        positions: ['B0', 'B1', 'B2'],
        size: 3
      },
      {
        color: 'orange',
        name: 'Patrol Boat',
        positions: ['B7', 'B6'],
        size: 2
      }
    ]);
  });

  it('should check for hit or miss', () => {
    const enemyBoard = initializeEnemyBoard();

    expect(isHit(enemyBoard, 'H0')).toBe(true);
    expect(isHit(enemyBoard, 'G0')).toBe(false);
  });

  it('should check if ship is sunk', () => {
    const enemyBoard = initializeEnemyBoard();

    const positions = ['H0', 'H1', 'H2', 'H3', 'H4'];

    positions.forEach(p => {
      expect(isHit(enemyBoard, p)).toBe(true);
    });
    positions.forEach(p => {
      expect(enemyBoard.state[p]).toBe(STATE.SUNK);
    });
  });

  it('should contain all ships in the state', () => {
    const enemyBoard = initializeEnemyBoard();
    enemyBoard.fleet.forEach(ship => {
      ship.positions.forEach(shipPosition => {
        expect(enemyBoard.state[shipPosition]).toBe(STATE.SHIP);
      });
    });
  });

  it('should only return random fields within the map', (done) => {
    const size = 8;

    for (let i = 0; i < 100; i++) {
      const randomPosition = getRandomPosition(size, size);
      const { top, left } = getTopAndLeft(randomPosition);
      expect(top).toBeGreaterThanOrEqual(0);
      expect(top).toBeLessThan(size);
      expect(left).toBeGreaterThanOrEqual(0);
      expect(left).toBeLessThan(size);
    }

    done();
  });
});
