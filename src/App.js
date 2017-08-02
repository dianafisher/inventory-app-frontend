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
import Register from './components/Register';
import Landing from './components/Landing';

class App extends Component {

  state = {
    items: [],
    alerts: [],
    token: '',
    user: null,
    loggedIn: false
  }

  componentDidMount() {
    this.loadJwtToken();
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
    const token = this.loadJwtToken();
    InventoryAPI.getItems(token).then((items) => {
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
    const token = this.loadJwtToken();
    InventoryAPI.upcLookup(token, upc).then((result) => {
    });
  }

  loadJwtToken = () => {
    const token = localStorage.getItem('jwt_token');
    if (token.length > 0) {
      const user = this.parseJwt(token);
      this.setState({ token, user });
    }
  }

  parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

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
        const token = result.token;
        const user = this.parseJwt(token);
        console.log(token);
        let alerts = [];
        alerts.push({
          type: 'success',
          msg: result.message
        });
        this.setState({ alerts, token, user, loggedIn: true });
      })
      .catch((error) => {
        console.log('error: ' + error);
      })
  }

  logout = () => {
    InventoryAPI.logout();
    this.setState({ token: '', user: null });
  }

  render() {
    let alerts = this.state.alerts;

    return (
      <Router>
        <div className="App">
          <Header user={this.state.user} onLogout={this.logout}/>
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
            <Landing></Landing>
          )} />
          <Route exact path='/items' render={() => (
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
            this.state.loggedIn ? ( <Redirect to="/items"/> ) :
            ( <Login onLoginUser={this.loginUser}></Login> )
          )} />
          <Route path='/register' render={( { history }) => (
            this.state.loggedIn ? ( <Redirect to="/items"/> ) :
            ( <Register onRegisterUser={this.registerUser}></Register> )
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
