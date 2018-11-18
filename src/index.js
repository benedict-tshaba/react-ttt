import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';

function Square(props) {
  let className = "square";
  if( props.winner.indexOf(props.index) !== -1 ) {
    className = "highlight";
  }
  return (
    <button 
      className={ className } 
      onClick={ props.onClick }
    >
    { props.value }
    </button>
  );
}

function HistoryList(props) {
  let className = "";
  if(props.currentMove === props.step) {
    className = "ctrl current-move";
  }
  return (
    <li>
      <button onClick = { props.onClick } id={ props.id } className={ className }>{ props.desc }</button> 
    </li>
  );
}

class Board extends Component {
    
  renderSquare(i) {
    return (
      <Square 
        value={ this.props.squares[i] }
        onClick ={ () => this.props.onClick(i) }
        winner={ this.props.winner }
        index={ i }
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      location: [{col: 0, row: 0}], //Display the location for each move in the format (col, row)
    };
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const location = this.state.location.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const gameStats = gameState(squares);
    
    const locations = [
        {col: 1, row: 1},
        {col: 2, row: 1},
        {col: 3, row: 1},
        {col: 1, row: 2},
        {col: 2, row: 2},
        {col: 3, row: 2},
        {col: 1, row: 3},
        {col: 2, row: 3},
        {col: 3, row: 3},
    ];
    
    if( gameStats.over || squares[i] ) {
        //console.log(gameStats);
        return;
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    
    this.setState({ 
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      location: location.concat([
        locations[i]
      ]),
    });
  }
  
  jumpTo(step) {
    //console.log(step);
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  sortList(hist) {
    //console.log(hist);
    this.setState({
      history: hist.reverse(),
    });
  }
    
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const gameStats = gameState(current.squares);
    
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move +' ('+this.state.location[move].col+','+this.state.location[move].row+')' : 'Start';
      return (
        <HistoryList
          key={ move }
          currentMove = { move }
          step = { this.state.stepNumber }
          id={ move }
          desc={ desc }
          onClick = { () => this.jumpTo(move) }
        />
      );
    });
    
    let status;
    
    if(gameStats.over) {
      if(gameStats.winner !== '') {
        status = gameStats.winner+' Wins!';
      } else if(gameStats.draw) {
        status = "Its A Draw!";
      }
    } else {
      status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = { current.squares }
            winner = { gameStats.winningLine }
            onClick = { (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div className="status success">{ status }</div>
          <ol>{ moves }</ol>
          <div>
            <button onClick={ (history) => this.sortList(this.state.history) } className="ctrl">Sort History</button>
          </div>
        </div>
      </div>
    );
  }
}

function gameState(board) {
  const state = {
    over: false,
    draw: false,
    winner: '',
    winningLine: []
  };
  
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if( board[a] && board[a] === board[b] && board[a] === board[c] ) {
      state.winner = board[a];
      state.winningLine = [a,b,c];
      state.over = true;
      return state;
    }
  }
  
  if( _isDraw(board) ) {
    state.draw = true;
    state.over = true;
    return state;
  }
  
  return state;
}

function _isDraw(squares) {
  let draw = squares.filter( (square) => square === null  );
  //console.log(draw);
  return (draw.length === 0);
}

function isTerminal(board) {
  if(gameState(board).over) {
    return true;
  }
  return false;
}

function availMoves(board) {
  let moves;
  moves = board..map( (element, index) => {
              if( i === null) {
                  return idx
              }
          }).filter(item => item != undefined );
  //console.log(moves);
  return moves;
}

// ========================================

ReactDOM.render(
    /*<App />*/
  <React.Fragment>
  <Game />
  </React.Fragment>,
  document.getElementById('root')
);
