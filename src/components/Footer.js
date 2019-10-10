import React, { Component } from 'react';
import {Link} from 'react-router-dom';

/* Assets Import */
// import {ReactComponent as Facebook} from '../../assets/social/facebook-app-symbol.svg';

/* Assets Import */
import '../styles/Footer.scss';
/* External requirements */

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
