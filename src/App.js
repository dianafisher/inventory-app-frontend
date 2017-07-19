import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as InventoryAPI from './utils/InventoryAPI';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ListItems from './components/ListItems';

class App extends Component {

  state = {
    items: []
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    InventoryAPI.getItems().then((items) => {
      console.log(items);
      this.setState({ items })
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <div className='row'>
          <ListItems items={this.state.items}></ListItems>
        </div>
      </div>
    );
  }
}

export default App;
