import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Logout extends Component {

  componentDidMount() {
    // log out the current user
    this.props.onLogout();
  }

  render() {
    return (
        // <div className='bg-full-page bg-primary back-fixed'>
          <div className='mw-500 absolute-center' style={styles.card}>
            <div className='card animated zoomInUp animation-delay-5 color-primary withripple'>
              <div className='card-block'>
                <div className='text-center color-dark'>
                  <h1 className='color-primary text-big'>Signed Out</h1>
                  <h2>You are now signed out.</h2>
                </div>
              </div>
            </div>
          </div>
        // </div>
    )
  }
}

const styles = {
  card: {
    top: '100%'
  }

}

export default Logout;
