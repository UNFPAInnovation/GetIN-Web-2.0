import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
        <div className="col-md-6 col-md-offset-3 text-center">
        <h1 className="page-header text-center">
             NOT FOUND
          </h1>
          <p className="text-center">
            We are sorry the page you are looking for was not found
          </p>
          <Link to="/" className="text-center btn btn-lg btn-primary">BACK TO HOME</Link>
        </div>
    );
  }
}
export default NotFound;