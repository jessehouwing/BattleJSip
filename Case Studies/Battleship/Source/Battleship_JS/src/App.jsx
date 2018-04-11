import React from 'react';

function getSequence(length) {
  return Array.from({length}).fill(0).map((e, i) => i);
}

function getLetter(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i);
}

const boardSize = 8;

export default function App({selectDirection, selected}) {
  return (
    <table>
      <thead>
      <tr>
      <th></th>
      {getSequence(boardSize).map(i => <th>{getLetter(i)}</th>)}
      </tr>
      </thead>
      <tbody>
      {getSequence(boardSize).map((i) => <tr><td><strong>{i}</strong></td>{
        getSequence(boardSize).map((j) => <td><button onClick={() => selected(getLetter(j) + i)}>{getLetter(j) + i}</button></td>)
      }</tr>)}
      </tbody>
    </table>
  );
}
