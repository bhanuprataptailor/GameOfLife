import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import'./index.css'
import Grid from './components/grid'
import Buttons from './components/buttons'
import Front from './components/front'

class App extends Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.colu = 50;

    this.state = {
      gridFull: Array(this.rows).fill().map(() => Array(this.column).fill(false))
    }
  }

  selectBox = (row, col) => {
    let gridCopy = arraySim(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  }

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalId);
  }

  clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.colu).fill(false));
    this.setState({
      gridFull: grid
    });
  }



  play = () => {
    let g = this.state.gridFull;
    let g2 = arraySim(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.colu; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.colu - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.colu - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.colu - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2
    });

  }

  componentDidMount() {
    this.pauseButton();
    //this.playButton();
    
  
  }

  render() {
    return (
      <div>
        <Front/>
        <h2>Game of Life</h2>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.colu}
          selectBox={this.selectBox}
        />
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          clear={this.clear}
        />
      </div>
    );
  }
}

function arraySim(arr) {
  return JSON.parse(JSON.stringify(arr));
}


export default App;
