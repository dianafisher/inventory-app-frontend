import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
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
import Logout from './components/Logout';
import Register from './components/Register';
import Landing from './components/Landing';

class App extends Component {

  state = {
    items: [],
    alerts: [],
    user: null,
    loggedIn: false
  }

  componentDidMount() {
    this._getItems();
  }

  _closeAlert(idx) {

    // remove the alert at this index
    let alerts = this.state.alerts.filter((a, index) => {
      return idx !== index;
    });

    // update the state
    this.setState({ alerts });
  }

  _getItems = () => {
    InventoryAPI.getItems().then((items) => {
      console.log(items);
      this.setState({ items })
    });
  }

  _addItem = (item) => {
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

  _upcLookup = (upc) => {
    InventoryAPI.upcLookup(upc).then((result) => {
    });
  }

  _registerUser = (user) => {
    InventoryAPI.registerUser(user)
    .then((response) => {
      console.log(response);
      const user = response.user;
      let alerts = [];
      alerts.push({
        type: 'success',
        msg: response.data.message
      });
      this.setState({ alerts, user, loggedIn: true });
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

  _loginUser = (user) => {
    InventoryAPI.login(user)
      .then((response) => {
        console.log(response);
        const user = response.user;
        let alerts = [];
        alerts.push({
          type: 'success',
          msg: response.data.message
        });
        this.setState({ alerts, user, loggedIn: true });
      })
      .catch((error) => {
        console.log('error: ' + error);
      })
  }

  _logout = () => {
    InventoryAPI.logout()
      .then((response) => {
        console.log(response);
        let alerts = [];
        // alerts.push({
        //   type: 'success',
        //   msg: response.data.message
        // });
        this.setState({ alerts, user: null, loggedIn: false });
      })
      .catch((error) => {
        console.log('error: ' + error);
      })

  }

  _renderHeaderAndNavbar = () => {
    let alerts = this.state.alerts;
    return (
      <div>
        <Header user={this.state.user} isLoggedIn={this.state.loggedIn} onLogout={this.logout}/>
        <NavBar />
        { alerts && (
          alerts.map((a, idx) => (
            <Alert
              key={idx}
              type={a.type}
              msg={a.msg}
              onCloseAlert={this._closeAlert.bind(this, idx)}
            ></Alert>
          ))
        )}
      </div>
    )
  }

  _renderItems = () => {
    return (
      <div>
        {this._renderHeaderAndNavbar()}
        <ListItems items={this.state.items}></ListItems>
      </div>
    )
  }

  _renderItemDetails = (obj) => {
    console.log(obj);
    return (
      <div>
        {this._renderHeaderAndNavbar()}
        <ItemDetails match={obj.match}></ItemDetails>
      </div>
    )
  }

  _renderLogout = () => {
    // render the logout page
    return (
      <div>
        {this._renderHeaderAndNavbar()}
        <Logout onLogout={this._logout}/>
      </div>
    )
  }

  render() {
    return (
      <Router>
        <div className="sb-site-container">
          <Route exact path='/' render={() => (
            this.state.loggedIn ? ( <Redirect to='/items' />) :
            ( <Landing></Landing> )
          )} />
          <Route exact path='/items' render={
            this._renderItems
          } />
          <Route path='/add' render={({ history }) => (
            <AddItem onAddItem={this._addItem}></AddItem>
          )} />
          <Route path='/upc' render={( { history }) => (
            <UPCLookup onUPCLookup={this._upcLookup}></UPCLookup>
          )} />
          <Route path='/item/:id' render={
            this._renderItemDetails
          } />
          <Route path='/login' render={( { history }) => (
            this.state.loggedIn ? ( <Redirect to="/items"/> ) :
            ( <Login onLoginUser={this._loginUser}></Login> )
          )} />
          <Route path='/logout' render={
            this._renderLogout
          } />
          <Route path='/register' render={( { history }) => (
            this.state.loggedIn ? ( <Redirect to="/items"/> ) :
            ( <Register onRegisterUser={this._registerUser}></Register> )
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
