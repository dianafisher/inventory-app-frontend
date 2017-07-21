import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import * as InventoryAPI from './utils/InventoryAPI';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ListItems from './components/ListItems';
import AddItem from './components/AddItem';
import UPCLookup from './components/UPCLookup';

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

  addItem = (item) => {
    InventoryAPI.addItem(item).then((item) => {

    });
  }

  upcLookup = (upc) => {
    InventoryAPI.upcLookup(upc).then((result) => {

    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <NavBar />
          <Route exact path='/' render={() => (
            <div className='row'>
              <ListItems items={this.state.items}></ListItems>
            </div>
          )} />
          <Route path='/add' render={({ history }) => (
            <AddItem onAddItem={this.addItem}></AddItem>
          )} />
          <Route path='/upc' render={( { history }) => (
            <UPCLookup onUPCLookup={this.upcLookup}></UPCLookup>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
