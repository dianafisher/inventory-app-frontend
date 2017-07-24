import React from 'react';
import { Link } from 'react-router-dom';

// Header is a stateless functional component
function Header (props) {
  return (
    <header className='ms-header ms-header-primary'>
      <div className='container container-full'>
        <div className='ms-title'>
          <a href='index.html'>
            <span className='ms-logo animated zoomInDown animation-delay-5'>I</span>
            <h1 className='animated fadeInRight animation-delay-6'>Inventory
              <span>App</span>
            </h1>
          </a>
        </div>
        <div className='header-right'>
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
      </div>
    </header>
  )
}

export default Header;
