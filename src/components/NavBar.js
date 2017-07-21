import React from 'react';
import { Link } from 'react-router-dom';

// Header is a stateless functional component
function NavBar (props) {
  return (
    <nav className='navbar navbar-static-top yamm ms-navbar ms-navbar-primary'>
      <div className='container container-full'>
        <div className='navbar-header'>
          <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
              <li className='dropdown active'>
                <Link
                  to='/'
                  className='dropdown-toggle animated fadeIn animation-delay-4'
                  data-toggle='dropdown'
                  data-hover='dropdown'
                  data-name='home'
                >Home</Link>

              </li>
              <li className='dropdown'>
                <Link
                  to='/add'
                  className='dropdown-toggle animated fadeIn animation-delay-4'
                  data-toggle='dropdown'
                  data-hover='dropdown'
                  data-name='add'
                >
                  Add Item
                </Link>
              </li>
              <li className='dropdown'>
                <Link
                  to='/upc'
                  className='dropdown-toggle animated fadeIn animation-delay-4'
                  data-toggle='dropdown'
                  data-hover='dropdown'
                  data-name='add'
                >
                  UPC Lookup
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
