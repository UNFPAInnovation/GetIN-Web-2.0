import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../styles/Footer.scss';

export default class Footer extends Component {
  render() {
    let todate = new Date();
    let year = todate.getFullYear();
    return (
      <div className="footer container-fluid">
              <Link to="#">GetIN © {year}</Link>
      </div>
    );
  }
}
