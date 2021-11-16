import React, { Component } from 'react';
import '../styles/Login.scss';
import Logo from '../assets/images/Logo.png';
const alertifyjs = require('alertifyjs');

const service = require('../api/services');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  login(e) {
    e.preventDefault();
    //const thisApp = this;
    alertifyjs.message('Signing in ..', 2, function() {
     
    });
    let data = {
      username: this.state.username,
      password: this.state.password
    };
    service.login(data, function(error, token) {
      if (error) {
        console.log(error);
        alertifyjs.error(
          'Email / password combination is not valid.',
          5,
          function() {
            
          }
        );
      } else {
        alertifyjs.success('Signed Successfully', 5, function() {
         
        });
        window.location.href = '/dashboard';
      }
    });
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 bg-login'></div>
          <div className='col-md-6 full-height bg-white'>
            <form
              onSubmit={e => this.login(e)}
              className='col-md-6 col-md-offset-2 form-signin'
            >
              <br />
              <div className='col-md-12'>
                <img
                  className='text-center loginLogo'
                  src={Logo}
                  alt="GetIn logo"
                />
              </div>

              <h1 className='h1 text-center'>GetIN Mobile</h1>
              <h1 className='h1 text-center'>Dashboard</h1>
              <h5 className='text-center'>Please sign in to your account</h5>
              <br />
              <br />
              <label htmlFor='inputEmail' className='sr-only'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='form-control'
                onChange={this.handleChange}
                value={this.state.username}
                name='username'
                placeholder='Username :'
                required
                autoFocus={true}
              />
              <br />
              <label htmlFor='inputPassword' className='sr-only'>
                Password
              </label>
              <input
                autoComplete='true'
                type='password'
                id='password'
                onChange={this.handleChange}
                value={this.state.password}
                name='password'
                className='form-control'
                placeholder='Password'
                required
              />
              <br />
              <button
                className='btn btn-lg btn-primary full-width'
                type='submit'
              >
                Sign in
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
