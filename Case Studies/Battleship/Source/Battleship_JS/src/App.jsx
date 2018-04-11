import React, { Component, Fragment } from 'react';
import {
  getRandomPosition,
  initializeBoard,
  initializeEnemyBoard,
  isHit,
  placeShip
} from './game/board-service';

function getSequence(length) {
  return Array.from({ length })
    .fill(0)
    .map((e, i) => i);
}

function getLetter(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i);
}

const boardSize = 8;

const Board = ({ selected }) => {
  return (
    <table>
      <thead>
        <tr>
          <th />
          {getSequence(boardSize).map(i => <th key={i}>{getLetter(i)}</th>)}
        </tr>
      </thead>
      <tbody>
        {getSequence(boardSize).map(i => (
          <tr key={i}>
            <td>
              <strong>{i}</strong>
            </td>
            {getSequence(boardSize).map(j => (
              <td key={j}>
                <button onClick={() => selected(getLetter(j) + i)}>
                  {getLetter(j) + i}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const DirectionSelector = ({ selected }) => (
  <table>
    <tbody>
      <tr>
        <td />
        <td>
          <button onClick={() => selected('up')}>▲</button>
        </td>
        <td />
      </tr>
      <tr>
        <td>
          <button onClick={() => selected('left')}>◀</button>
        </td>
        <td />
        <td>
          <button onClick={() => selected('right')}>▶</button>
        </td>
      </tr>
      <tr>
        <td />
        <td>
          <button onClick={() => selected('down')}>▼</button>
        </td>
        <td />
      </tr>
    </tbody>
  </table>
);

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      currentPosition: undefined,
      currentShipIndex: 0,
      enemyBoard: initializeEnemyBoard(),
      myBoard: initializeBoard()
    };
  }

  setCurrentPosition = position => {
    this.setState({
      currentPosition: position
    });
  };

  placeMyShip = direction => {
    const { myBoard, currentPosition, currentShipIndex } = this.state;

    if (currentPosition) {
      placeShip(myBoard, currentShipIndex, currentPosition, direction);

      this.setState({
        currentPosition: undefined,
        currentShipIndex: currentShipIndex + 1,
        myBoard
      });
    }
  };

  shoot = position => {
    alert(
      `Shoot at ${position}: ${
        isHit(this.state.enemyBoard, position) ? 'Hit!' : 'Miss!'
      }`
    );
    const counterAttack = getRandomPosition(8,8);
    alert(`Enemy shoots at ${counterAttack}: ${isHit(this.state.myBoard, counterAttack) ? 'Hit!' : 'Miss!'}`)
  };

  render() {
    const { currentPosition, currentShipIndex, myBoard } = this.state;
    const ship = myBoard.fleet[currentShipIndex];
    let text;

    if (ship) {
      if (!!currentPosition) {
        text = `Select direction for ${ship.name}`;
      } else {
        text = `Select position for ${ship.name}`;
      }
    } else {
      text = `Shoot!`;
    }

    return (
      <Fragment>
        <h1>{text}</h1>
        {!!currentPosition ? (
          <DirectionSelector selected={this.placeMyShip} />
        ) : (
          <Board selected={ship ? this.setCurrentPosition : this.shoot} />
        )}
      </Fragment>
    );
  }
}
