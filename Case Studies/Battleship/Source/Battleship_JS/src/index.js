import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { initializeBoard, initializeEnemyBoard, placeShip } from './game/board-service';

// Create enemy board (ships are already placed)
const enemyBoard = initializeEnemyBoard();

// Place my ships
const myBoard = initializeBoard();

myBoard.fleet.forEach(ship => {
  let currentPosition;

  function placeMyShip(param) {
    if (currentPosition) {
      currentPosition = param;
    } else {
      placeShip(myBoard, 0, currentPosition, param);
      currentPosition = undefined;
    }
  }

  const initializeGame = <App text={!!currentPosition ? `Select position for ${ship.name}` : 'Select direction for ship 1'}
       selected={placeMyShip}
       selectDirection={!!currentPosition}/>;

  ReactDOM.render(initializeGame, document.getElementById('app'));
});

function shoot(position) {
  console.log(`Shoot at position ${position}`);
}

ReactDOM.render(<App text="Play game" selected={shoot} />, document.getElementById('app'));
