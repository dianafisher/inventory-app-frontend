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
import Alert from './components/Alert';
import ItemDetails from './components/ItemDetails';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {

  state = {
    items: [],
    alerts: []
  }

  componentDidMount() {
    this.getItems();
  }

  closeAlert(idx) {

    // remove the alert at this index
    let alerts = this.state.alerts.filter((a, index) => {
      return idx !== index;
    });

    // update the state
    this.setState({ alerts });
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
        // console.log(error.response.status);
        console.log(error.response.data);
        const errors = error.response.data.errors;
        let alerts = errors.map((error) => {
          error.type = 'error';
          return error;
        });
        console.log(alerts);
        this.setState({ alerts });
      }

    });
  }

  upcLookup = (upc) => {
    InventoryAPI.upcLookup(upc).then((result) => {

    });
  }

  registerUser = (user) => {
    InventoryAPI.registerUser(user)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log('error: ' + error);
      if (error.response) {
        console.log(error.response.data);
        let alerts = [];
        alerts.push({
          type: 'error',
          msg: error.response.data.message
        });
        console.log(alerts);
        this.setState({ alerts });
      }
    });
  }

  loginUser = (user) => {
    InventoryAPI.login(user)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log('error: ' + error);
      })
  }

  render() {
    let alerts = this.state.alerts;

    return (
      <Router>
        <div className="App">
          <Header />
          <NavBar />
          { alerts && (
            alerts.map((a, idx) => (
              <Alert
                key={idx}
                type={a.type}
                msg={a.msg}
                onCloseAlert={this.closeAlert.bind(this, idx)}
              ></Alert>
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
          <Route path='/item/:id' component={ItemDetails} />
          <Route path='/login' render={( { history }) => (
            <Login onLoginUser={this.loginUser}></Login>
          )} />
          <Route path='/register' render={( { history }) => (
            <Register onRegisterUser={this.registerUser}></Register>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
