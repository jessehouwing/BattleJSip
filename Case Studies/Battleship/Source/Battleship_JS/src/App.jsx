import React, {Fragment} from 'react';

function getSequence(length) {
  return Array.from({length}).fill(0).map((e, i) => i);
}

function getLetter(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i);
}

const boardSize = 8;

const Board = ({selected}) => {
  return (
    <table>
      <thead>
      <tr>
        <th></th>
        {getSequence(boardSize).map(i => <th>{getLetter(i)}</th>)}
      </tr>
      </thead>
      <tbody>
      {getSequence(boardSize).map((i) => <tr>
        <td><strong>{i}</strong></td>
        {
          getSequence(boardSize).map((j) => <td>
            <button onClick={() => selected(getLetter(j) + i)}>{getLetter(j) + i}</button>
          </td>)
        }</tr>)}
      </tbody>
    </table>
  );
}

const DirectionSelector = ({selected}) => (
  <table>
    <tbody>
    <tr>
      <td></td>
      <td>
        <button onClick={() => selected('up')}>▲</button>
      </td>
      <td></td>
    </tr>
    <tr>
      <td>
        <button onClick={() => selected('left')}>◀</button>
      </td>
      <td></td>
      <td>
        <button onClick={() => selected('right')}>▶</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td>
        <button onClick={() => selected('down')}>▼</button>
      </td>
      <td></td>
    </tr>
    </tbody>
  </table>);

export default function App({text, selectDirection, selected}) {
  return <Fragment>
    <h1>{text}</h1>
    {selectDirection ? <DirectionSelector {...{selected}}/> : <Board {...{selected}} />}
  </Fragment>
}
