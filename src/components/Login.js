import React from 'react';


// stateless functional Component
function Login (props) {
  return (
    <div>
      <div className="ms-hero-page-override ms-hero-img-city ms-hero-bg-dark-light">
        <div className="container">
          {/* <div className="text-center">
            <span className="ms-logo ms-logo-lg ms-logo-white center-block mb-2 mt-2 animated zoomInDown animation-delay-5">M</span>
            <h1 className="no-m ms-site-title color-white center-block ms-site-title-lg mt-2 animated zoomInDown animation-delay-5">Material
              <span>Style</span>
            </h1>
            <p className="lead lead-lg color-white text-center center-block mt-2 mw-800 text-uppercase fw-300 animated fadeInUp animation-delay-7">Discover our projects and the
              <span className="color-warning">rigorous process</span> of creation. Our principles are creativity, design, experience and knowledge.</p>
          </div> */}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="card card-hero card-primary animated fadeInUp animation-delay-4">
              <div className="card-block">
                <h1 className="color-primary text-center">Login</h1>
                <form className="form-horizontal">
                  <fieldset>
                    <div className="form-group">
                      <label htmlFor="inputUsername" className="col-md-2 control-label">Username</label>
                      <div className="col-md-10">
                        <input type="username" className="form-control" id="inputUsername" placeholder="Username" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputPassword" className="col-md-2 control-label">Password</label>
                      <div className="col-md-10">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                      </div>
                    </div>
                  </fieldset>
                  <button className="btn btn-raised btn-primary btn-block">Login
                    <i className="zmdi zmdi-long-arrow-right no-mr ml-1"></i>
                  </button>
                </form>
                <div className="text-center mt-4">
                  <h3>Login with</h3>
                  <a href="javascript:void(0)" className="btn-circle btn-facebook">
                    <i className="zmdi zmdi-facebook"></i>
                  </a>
                  <a href="javascript:void(0)" className="btn-circle btn-twitter">
                    <i className="zmdi zmdi-twitter"></i>
                  </a>
                  <a href="javascript:void(0)" className="btn-circle btn-google">
                    <i className="zmdi zmdi-google"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
