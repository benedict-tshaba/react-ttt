import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  
  componentDidMount() {
    this.timerID = setInterval(
        () => { this.tick() } , 1000
    );  
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);  
  }
  
  tick() {
    this.setState({
       date: new Date() 
    }); 
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>
            <code> {this.state.date.toLocaleTimeString() } </code>
          </h3>
        </header>
      </div>
    );
  }
}

export default Clock;
