import React from 'react';
import { Link } from 'react-router-dom';

// Landing is a stateless functional component
function Landing (props) {
  return (
    <div className="intro-full ms-hero-img-robots ms-hero-bg-primary color-white ms-bg-fixed" style={{height: '100%'}}>
      <div className="intro-full-content index-1">
        <div className="container">
          <div className="text-center mb-4">
            <span className="ms-logo ms-logo-lg ms-logo-white center-block mb-2 mt-2" role="img" aria-label="robot emoji">🤖</span>
            <h1 className="no-m ms-site-title color-white center-block ms-site-title-lg mt-2">Collectables
              <span>.Fun</span>
            </h1>
            <p className="lead lead-lg color-white text-center center-block mt-2 mw-800 text-uppercase fw-300">Keep track of your collectables. Use the
              <span className="color-warning"> companion app</span> to scan UPC barcodes for quick and easy cataloging.</p>
          </div>
          <div className="text-center mb-2">
            <Link className="btn btn-xlg btn-raised btn-primary" to='/login'>
              <i className="zmdi zmdi-account"></i>Login
            </Link>
            <Link className="btn btn-xlg btn-raised btn-warning" to='/register'>
              <i className="zmdi zmdi-account-add"></i>Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;
