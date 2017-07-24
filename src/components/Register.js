import React, { Component } from 'react';

import serializeForm from 'form-serialize';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    console.log(values);
    // this.props.onUPCLookup(values);
  }

  handleInputChange = (e) => {
    const target = e.target;
    console.log(target.type);
    const name = target.name;
    console.log(name);
  }

  render() {
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
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="inputEmail" className="col-md-2 control-label">Email</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Email"
                        name='email'
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputName" className="col-md-2 control-label">Name</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        placeholder="Name"
                        name='name'
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword" className="col-md-2 control-label">Password</label>
                    <div className="col-md-9">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Password"
                        name='password'
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 col-md-offset-8">
                      <button
                        className="btn btn-raised btn-primary btn-block mt-4"
                        type='submit'
                      >Register Now</button>
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
}

export default Register;
