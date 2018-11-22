import React, { Component } from 'react';

import './App.css';
import HistoryList from './components/HistoryList';
import Board from './components/Board';

class Game extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      huPlayer: 'O',
      aiPlayer: 'X',
      xIsNext: true,
      aiTurn: true,
      stepNumber: 0,
      location: [{col: 0, row: 0}], //Display the location for each move in the format (col, row)
    };
  }

  componentDidMount() {
    if (this.state.aiTurn) {
      this.aiTurn();
    }
  }

  componentDidUpdate() {
    if (this.state.aiTurn) {
      this.aiTurn();
    }
  }

  aiTurn() {

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const location = this.state.location.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    const moves = this.availMoves(squares);

    if (moves.length === 0 || gameState(squares).over) {
      return;
    }
    
    let randMove = (Math.random()*moves.length).toFixed();
    //console.log("Playing: "+moves[randMove]);
    if(moves[randMove]) {//play the move if its not undefined
      squares[moves[randMove]] = this.state.aiPlayer;
    } else { //otherwise play the first available move
      squares[moves[0]] = this.state.aiPlayer;
    }
    //console.log(squares);

    this.setState({ 
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      aiTurn: !this.state.aiTurn,
      location: location.concat([
        getLocations(randMove)
      ]),
    });
  }
  
  handleClick(i) {

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const location = this.state.location.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const gameStats = gameState(squares);
    
    if( gameStats.over || squares[i]) {
      //console.log(gameStats);
      return;
    }

    //if next player is X but the player is not
    //stop the play
    if (this.state.xIsNext && this.state.huPlayer !== 'X') {
      return;
    }
    
    //squares[i] = this.state.xIsNext ? 'X' : 'O';
    squares[i] = this.state.huPlayer;
    
    this.setState({ 
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      aiTurn: !this.state.aiTurn,
      location: location.concat([
        getLocations(i)
      ]),
    });

  }
  
  jumpTo(step) {
    //console.log(step);
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      aiTurn: false,
    });
  }
  
  sortList(hist) {
    //console.log(hist);
    this.setState({
      history: hist.reverse(),
      location: this.state.location.reverse(),
    });
  }

  isTerminal(board) {
    if(gameState(board).over) {
      return true;
    }
    return false;
  }

  selectSign(evt) {
    if (this.state.player) {
      return;
    }
    this.setState({
      huPlayer: evt.target.value,
      aiPlayer: (evt.target.value === 'X') ? 'O' : 'X',
    });
  }

  availMoves(board) {
    let moves;
    moves = board.map( (element, index) => {
                if( element === null) {
                    return index;
                }
                return null;
            }).filter(item => item !== null );
    //console.log(moves);
    return moves;
  }
    
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const gameStats = gameState(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move  ('+this.state.location[move].col+','+this.state.location[move].row+')' : 'Start';
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
          <div className="game-info">
            <label className="status success">Play As</label><br/>
              <input onClick={ (event) => this.selectSign(event) } type="radio" value="X" name="playas" />X<br/>
              <input onClick={ (event) => this.selectSign(event) } type="radio" value="O" name="playas" defaultChecked={true}/>O<br/>
          </div>
          <ol>{ moves }</ol>
          <div>
            <button onClick={ (history) => this.sortList(this.state.history) } className="ctrl">Sort History</button>
          </div>
        </div>
      </div>
    );
  }
}

/**
* Utility Functions
*/
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

function getLocations(index) {
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

  return locations[index];
}

/**
* End Utility Functions
*/

export default Game;