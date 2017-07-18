import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as InventoryAPI from './utils/InventoryAPI';

class App extends Component {

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    InventoryAPI.getItems().then((documents) => {
      console.log(documents);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome back to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
