import React from 'react';
import { NavLink } from 'react-router-dom';

// NavBar is a stateless functional component
function NavBar (props) {
  return (
    <nav className='navbar navbar-static-top yamm ms-navbar ms-navbar-primary'>
      <div className='container container-full'>
        <div className='navbar-header'>
          <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
              <li>
                <NavLink
                  activeClassName='active'
                  to='/items'
                  className='dropdown-toggle navlink'
                  data-toggle='dropdown'
                  data-hover='dropdown'
                  data-name='home'
                >My Items
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/upc'
                  className='dropdown-toggle navlink'
                  data-toggle='dropdown'
                  data-hover='dropdown'
                  data-name='add'
                >
                  Add Item
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
