import React from 'react';


// stateless functional Component
function Register (props) {
  return (
    <div>
      <div className="ms-hero-page-override ms-hero-img-room ms-bg-fixed ms-hero-bg-dark-light">
        <div className="container">
          <div className="text-center">
            <h1 className="no-m ms-site-title color-white center-block ms-site-title-lg mt-2 animated zoomInDown animation-delay-5">Create Account</h1>
            {/* <p className="lead lead-lg color-light text-center center-block mt-2 mw-800 text-uppercase fw-300 animated fadeInUp animation-delay-7">Do not wait more register now! Access our great community and benefit from
            <span className="color-info">exclusive membership</span> conditions.</p> */}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card card-primary card-hero animated fadeInUp animation-delay-4">
          <div className="card-block">
            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <label for="inputUser" className="col-md-2 control-label">Username</label>
                  <div className="col-md-9">
                    <input type="text" className="form-control" id="inputUser" placeholder="Username" />
                  </div>
                </div>
                <div className="form-group">
                  <label for="inputEmail" className="col-md-2 control-label">Email</label>
                  <div className="col-md-9">
                    <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                  </div>
                </div>
                <div className="form-group">
                  <label for="inputPassword" className="col-md-2 control-label">Password</label>
                  <div className="col-md-9">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                  </div>
                </div>
                <div className="form-group">
                  <label for="inputPassword2" className="col-md-2 control-label">Again</label>
                  <div className="col-md-9">
                    <input type="password" className="form-control" id="inputPassword2" placeholder="Password" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 col-md-offset-8">
                    <button className="btn btn-raised btn-primary btn-block mt-4">Register Now</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
