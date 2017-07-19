import React from 'react';

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
      </div>
    </header>
  )
}

export default Header;
