import React from 'react';

// Header is a stateless functional component
function NavBar (props) {
  return (
    <nav className='navbar navbar-static-top yamm ms-navbar ms-navbar-primary'>
      <div className='container container-full'>
        <div className='navbar-header'>
          <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
              <li className='dropdown active'>
                <a
                  className='dropdown-toggle animated fadeIn animation-delay-4'
                  data-toggle='dropdown'
                  data-hover='dropdown'
                  data-name='home'
                >
                  Home
                </a>
              </li>
              <li className='dropdown'>
                <a
                  className='dropdown-toggle animated fadeIn animation-delay-4'
                  data-toggle='dropdown'
                  data-hover='dropdown'
                  data-name='add'
                >
                  Add Item
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
