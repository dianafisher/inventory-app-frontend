import React, { Component } from 'react';
import PropTypes from 'prop-types';
import serializeForm from 'form-serialize';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      hasFocus: 'none'
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
    const name = target.name;
    // console.log(name);
    const value = target.value;
    // console.log(value);
    this.setState({[name] : value});
  }

  _onFocus = (e) => {
    const target = e.target;
    // console.log(target);
    const name = target.name;
    // console.log(name, 'has focus');
    this.setState({ 'hasFocus': name });
  }

  _onBlur = (e) => {
    const target = e.target;
    const name = target.name;
    // console.log(name, 'lost focus');
    this.setState({ 'hasFocus': 'none' })
  }

  _renderEmailField = () => {
    let className = this._classNameForField('email');

    return (
      <div className={className}>
        <label className="control-label" htmlFor="inputEmail">Email</label>
        <input
          className="form-control"
          id="inputEmail"
          type="text"
          name='email'
          required="required"
          onChange={this.handleInputChange}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
        ></input>
        <p className="help-block">Please provide a valid email address.</p>
      </div>
    )
  }

  _renderNameField = () => {
    let className = this._classNameForField('name');

    return (
      <div className={className}>
        <label htmlFor="inputName" className="control-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          name='name'
          required="required"
          onChange={this.handleInputChange}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
        />
        <p className="help-block">Please provide a name.</p>
      </div>
    )
  }

  _renderPasswordField = () => {
    let className = this._classNameForField('password');

    return (
      <div className={className}>
        <label htmlFor="inputPassword" className="control-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          name='password'
          required="required"
          onChange={this.handleInputChange}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
        />
        <p className="help-block">Please provide a password.</p>
      </div>
    )
  }

  _classNameForField = (name)  => {
    let value = this.state[name];
    let className = 'form-group label-floating';
    if (value.length === 0) {
      className = 'form-group label-floating is-empty';
    }
    if (this.state.hasFocus === name) {
      className = 'form-group label-floating is-focused';
    }
    return className;
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
                  <fieldset style={styles.fieldset}>
                    { this._renderEmailField() }
                    { this._renderNameField() }
                    { this._renderPasswordField() }
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

const styles = {
  fieldset: {
    marginBottom: '40px'
  },
}

export default Register;
