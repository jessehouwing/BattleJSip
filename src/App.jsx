import React, {Component, Fragment} from 'react';
import {
  getRandomPosition,
  initializeOwnBoard,
  initializeEnemyBoard,
  isHit,
  placeShip,
  initializeBoard,
  STATE
} from './game/board-service';
import './App.css';

function getSequence(length) {
  return [
    ...Array.from({length})
      .fill(0)
      .map((e, i) => i)
  ];
}

function getLetter(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i);
}

function getNumberFromLetter(letter) {
  return letter.charCodeAt() - 65;
}

function getSquareCss(fleet, gameState, row, cell, isMyBoard) {
  const cellState = gameState[getLetter(cell) + row];
  let css = ' ';
  if (cellState === STATE.SHIP) {
    css += 'ship';
  } else if (cellState === STATE.HIT) {
    css += 'hit';
  } else if (cellState === STATE.MISS) {
    css += 'water';
  } else if (cellState === STATE.SUNK) {
    css += 'sunk';
  }
  if (!isMyBoard) {
    return css;
  }
  const isShip = fleet.find(({positions}) => {
    const pos = positions.find(coord => {
      return row === parseInt(coord[1], 10) && cell === parseInt(getNumberFromLetter(coord[0]), 10);
    });
    return pos ? true : false;
  });
  const shippCss = isShip ? ' is-ship' : '';
  css += shippCss;
  return css;
}

function getBorderCss(i, j) {
  const classNames = [];
  if (i === 0) {
    classNames.push('top');
  }
  if (j === 0) {
    classNames.push('left');
  }
  if (i === boardSize - 1) {
    classNames.push('bottom');
  }
  if (j === boardSize - 1) {
    classNames.push('right');
  }
  return classNames.join(' ');
}

const boardSize = 8;

const Board = ({fleet, gameState, selected, isMyBoard, forceUpdateHandler}) => {
  return (
    <div className="board-container">
      <div className="board-headline">{isMyBoard ? 'Your grid' : 'Opponents grid'}</div>
      <table className="board">
        <thead>
          <tr>
            <th />
            {getSequence(boardSize).map(i => (
              <th key={i}>{getLetter(i)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getSequence(boardSize).map(i => (
            <tr key={i}>
              <td className="row">
                <strong>{i + 1}</strong>
              </td>
              {getSequence(boardSize).map(j => (
                <td key={j} className={getBorderCss(i, j)}>
                  <div className="square">
                    <div className={'square-content activated-cell ' + getSquareCss(fleet, gameState, i, j, isMyBoard)}>
                      <button onClick={() => (forceUpdateHandler() && selected(getLetter(j) + i))}>
                        {getLetter(j) + i}
                      </button>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
};

const DirectionSelector = ({selected}) => (
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

const MessageBox = ({text}) => (
  <div className="message-box">{text}</div>
);
export default class App extends Component {
  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const debug = urlParams.get('debug');
    this.state = {
      currentPosition: undefined,
      currentShipIndex: debug ? 10 : 0,
      enemyBoard: initializeEnemyBoard(),
      myBoard: debug ? initializeOwnBoard() : initializeBoard()
    };
  }

  setCurrentPosition = position => {
    this.setState({
      currentPosition: position
    });
  };

  placeMyShip = direction => {
    const {myBoard, currentPosition, currentShipIndex} = this.state;

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
      `Shoot at ${position}: ${isHit(this.state.enemyBoard, position) ? 'Hit!' : 'Miss!'
      }`
    );
    const counterAttack = getRandomPosition(8, 8);
    alert(
      `Enemy shoots at ${counterAttack}: ${isHit(this.state.myBoard, counterAttack) ? 'Hit!' : 'Miss!'
      }`
    );
  };

  setStateToRender() {
    let num = this.state.num || 0;
    num++;
    this.setState({...this.state, num});
    return true;
  }

  render() {
    const {currentPosition, currentShipIndex, myBoard} = this.state;
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
        {!!currentPosition ? (
          <DirectionSelector selected={this.placeMyShip} />
        ) : (
            <div className="game-layout">
              <div>
                <div className="hidden">Ships</div>
              </div>
              <div>
                <Board forceUpdateHandler={() => this.setStateToRender()} isMyBoard={true} fleet={this.state.myBoard.fleet} gameState={this.state.myBoard.state} selected={ship ? this.setCurrentPosition : this.shoot} />
              </div>
              <div>
                <div>&nbsp;</div>
              </div>
              <div className="second-board">
                <Board forceUpdateHandler={() => this.setStateToRender()} isMyBoard={false} fleet={this.state.enemyBoard.fleet} gameState={this.state.enemyBoard.state} selected={ship ? this.setCurrentPosition : this.shoot} />
              </div>
              <div>
                <div className="hidden">Ships</div>
              </div>
              <div className="x">
                <div>
                  <MessageBox text={text} />
                </div>
                <div className="interaction-buttons hidden">
                  <div>New Game</div>
                  <div>End Game</div>
                </div>
              </div>
            </div>
          )}
      </Fragment>
    );
  }
}
