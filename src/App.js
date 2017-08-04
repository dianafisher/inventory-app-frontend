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

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function loadJwtToken() {
  return localStorage.getItem('jwt_token');
}

function saveJwtToken(token) {
  localStorage.setItem('jwt_token', token);
}

class App extends Component {

  state = {
    alerts: [],
    token: '',
    user: null,
    loggedIn: false
  }

  componentDidMount() {
    console.log('App componentDidMount');
    // load the JWT token to see if we have a user logged in
    const token = loadJwtToken();
    console.log('token:', token);
    if (token) {
      const user = parseJwt(token);
      console.log(user);
      if (user) {
        this.setState({ token, user, loggedIn: true });
      }
    }
  }

  _closeAlert(idx) {

    // remove the alert at this index
    let alerts = this.state.alerts.filter((a, index) => {
      return idx !== index;
    });

    // update the state
    this.setState({ alerts });
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
    const token = this.state.token;
    InventoryAPI.upcLookup(upc, token)
      .then((response) => {
        console.log(response);
        // redirect to item details?
      })
      .catch((error) => {
        console.log('error ' + error);
      })
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
        const token = response.data.token;
        // save the token to local storage
        saveJwtToken(token);

        // parse the user from the token
        const user = parseJwt(token);
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
    // clear the JWT token
    saveJwtToken('');

    InventoryAPI.logout()
      .then((response) => {
        console.log(response);
        let alerts = [];
        // alerts.push({
        //   type: 'success',
        //   msg: response.data.message
        // });
        this.setState({ alerts, user: null, loggedIn: false, token: '' });
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
        <ListItems token={this.state.token}></ListItems>
      </div>
    )
  }

  _renderItemDetails = (obj) => {
    console.log(obj);
    return (
      <div>
        {this._renderHeaderAndNavbar()}
        <ItemDetails match={obj.match} token={this.state.token}></ItemDetails>
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

  _renderUPCLookup = () => {
    return (
      <div>
        {this._renderHeaderAndNavbar()}
        <UPCLookup onUPCLookup={this._upcLookup}></UPCLookup>
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
          <Route path='/upc' render={
            this._renderUPCLookup
          } />
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
