import React from 'react';

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

export default HistoryList;