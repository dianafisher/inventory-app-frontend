import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    const loggedIn = this.props.isLoggedIn;
    console.log(this.props);
    return (
      <header className='ms-header ms-header-primary'>
        <div className='container container-full'>
          <div className='ms-title'>
            <Link to='/'>
              <span className='ms-logo animated zoomInDown animation-delay-5'>I</span>
              <h1 className='animated fadeInRight animation-delay-6'>Inventory
                <span>App</span>
              </h1>
            </Link>
          </div>
          <div className='header-right'>
            {!loggedIn &&
              <div>
                <Link
                  className='btn-circle btn-circle-primary no-focus animated zoomInDown animation-delay-4'
                  to='/login'
                >
                  <i className="zmdi zmdi-account"></i>
                </Link>
                <Link
                  className='btn-circle btn-circle-primary no-focus animated zoomInDown animation-delay-4'
                  to='/register'
                >
                  <i className="zmdi zmdi-account-add"></i>
                </Link>
              </div>
            }

            { this.props.user &&
              <div className='row'>
                Logged in as { this.props.user.name }
                <Link
                  className='btn-circle btn-circle-primary no-focus animated zoomInDown animation-delay-4'
                  style={styles.logout}
                  to="/logout"
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                </Link>
              </div>
            }
          </div>


        </div>
      </header>
    )
  }
}

const styles = {
  logout: {
    marginLeft: '10px'
  },
}

export default Header;
