import React from 'react';
import ReactDOM from 'react-dom';
import Game from './App';
import Clock from './components/Clock';

ReactDOM.render(
  <React.Fragment>
    <Clock />
    <Game />
    <div> Created by
      <a
        className="App-link"
        href="https://github.com/benedit-tshaba"
        target="_blank"
        rel="noopener noreferrer"
        > Benedict Tshaba
      </a>
    </div>
  </React.Fragment>,
  document.getElementById('root')
);