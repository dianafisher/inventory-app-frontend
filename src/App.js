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

  constructor(props) {
    super(props);
    console.log('App constructor');

    this._initializeState();
  }

  _initializeState = () => {
    // load the JWT token to see if we have a user logged in
    const token = loadJwtToken();
    console.log('token:', token);
    let user;
    let loggedIn = false;
    if (token) {
      user = parseJwt(token);
      loggedIn = true
    }
    this.state = {
      alerts: [],
      token: token,
      items: [],
      pages: 0,
      page: 0,
      item: {},
      user: user,
      loggedIn: loggedIn
    }
  }

  componentDidMount() {
    console.log('App componentDidMount');
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

  _editItem = (itemId, data) => {
    const token = this.state.token;
    InventoryAPI.editItem(itemId, token, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('error ' + error);
      })
  }

  _deleteItem = (itemId) => {
    const token = this.state.token;
    InventoryAPI.deleteItem(itemId, token)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('error ' + error);
      })
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
        this.setState({ alerts, user, token, loggedIn: true });
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

  _getItem = (itemId) => {
    const token = this.state.token;
    InventoryAPI.getItem(itemId, token)
      .then((response) => {
        if (response.status === 403) {
          this._showAuthenticationAlert();
        } else {
          const item = response.data;
          console.log(item);
          this.setState( { item } );
        }
      })
      .catch(error => {
        console.log('error:' + error);
      });
  }

  _getItems = (page) => {
    // get the token from our state
    const token = this.state.token;
    console.log('_getItems, token:', token);
    InventoryAPI.getItems(token, page)
      .then((response) => {
        if (response.status === 403) {
          // need to log in again..
          this._showAuthenticationAlert();
        } else {
          const data = response.data;
          console.log(data);
          // const items = response.data.items;
          // console.log(items);
          // const page = data.page;
          // const pageCount = data.pages;
          // this.setState({ items, page, pageCount })
          this.setState({ ...data });  //object spread
        }

      })
      .catch(error => {
        console.log(error);
      })
  }

  _showAuthenticationAlert = () => {
    let alerts = [];
    alerts.push({
      type: 'error',
      msg: 'Please login again'
    });
    this.setState({ alerts, user: null, loggedIn: false, token: '' });
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
        <ListItems
          getItems={this._getItems}
          items={this.state.items}
          page={this.state.page}
          pages={this.state.pages}
        ></ListItems>
      </div>
    )
  }

  _renderItemDetails = (obj) => {
    console.log(obj);
    return (
      <div>
        {this._renderHeaderAndNavbar()}
        <ItemDetails
          id={obj.match.params.id}
          getItem={this._getItem}
          item={this.state.item}
          editItem={this._editItem}
          deleteItem={this._deleteItem}
        ></ItemDetails>
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
