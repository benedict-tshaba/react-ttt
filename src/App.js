import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            <code> {this.state.date.toLocaleTimeString() } </code>
          </h1>
          <a
            className="App-link"
            href="https://github.com/benedit-tshaba"
            target="_blank"
            rel="noopener noreferrer"
          >
            Benedict Tshaba
          </a>
        </header>
      </div>
    );
  }
}

export default App;
