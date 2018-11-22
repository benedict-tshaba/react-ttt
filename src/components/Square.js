import React from 'react';

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

export default Square;