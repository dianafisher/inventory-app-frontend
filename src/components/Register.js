import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.props.onRegisterUser(values);
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
        <div className="bg-full-page ms-hero-img-robots ms-hero-bg-primary">
          <div className="mw-500 absolute-center center">
            <div className="card card-primary card-hero animated fadeInUp animation-delay-4">
              <div className="card-block">
                <h1 className='color-primary text-center'>Create Account</h1>
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
                  </fieldset>
                  <button className="btn btn-raised btn-primary btn-block">CREATE ACCOUNT
                    <i className="zmdi zmdi-long-arrow-right no-mr ml-1"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  onRegisterUser: PropTypes.func.isRequired
}

export default Register;
