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
import Error from './components/Error';

class App extends Component {

  state = {
    items: [],
    errors: []
  }

  componentDidMount() {
    this.getItems();
  }

  closeAlert(idx) {
    console.log('closeAlert called');
    console.log(idx);
  }

  getItems = () => {
    InventoryAPI.getItems().then((items) => {
      console.log(items);
      this.setState({ items })
    });
  }

  addItem = (item) => {
    InventoryAPI.addItem(item)
    .then((item) => {

    })
    .catch((error) => {
      console.log('error: ' + error);
      if (error.response) {
        // console.log(error.response.headers);
        // console.log(error.response.status);
        console.log(error.response.data);
        const errors = error.response.data.errors;
        this.setState({ errors });
      }

    });
  }

  upcLookup = (upc) => {
    InventoryAPI.upcLookup(upc).then((result) => {

    });
  }

  render() {
    let errors = this.state.errors;

    return (
      <Router>
        <div className="App">
          <Header />
          <NavBar />
          { errors && (
            errors.map((error, idx) => (
              <Error
                key={idx}
                msg={error.msg}
                onCloseAlert={this.closeAlert.bind(this, idx)}
              ></Error>
            ))
          )}
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
