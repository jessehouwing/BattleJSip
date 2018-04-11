import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App selected={console.log.bind(console)} />, document.getElementById('app'));
