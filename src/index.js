import React from 'react';
import ReactDOM from 'react-dom';
import Game from './App';
import Clock from './components/Clock';

ReactDOM.render(
  <React.Fragment>
    <Clock />
    <Game />
  </React.Fragment>,
  document.getElementById('root')
);