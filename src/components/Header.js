import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Nav,
  NavItem,
  DropdownButton,
  MenuItem,
  NavDropdown
} from "react-bootstrap";
const alertifyjs = require("alertifyjs");
const sessionStorage = window.sessionStorage;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInAs: "",
      show: true
    };
  }
  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("district");
    alertifyjs.message("Logging out", 5);
    window.location.href = "/";
  }
  componentDidMount() {
    let username = sessionStorage.getItem("username");
    this.setState({
      loggedInAs: username
    });
  }
  render() {
    return (
      <nav className="headerNav navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div id="navbar" className="">
            <ul className="profileNav nav navbar-nav navbar-right">
              <button type="button" className="btn pull-left">
                <FontAwesomeIcon icon={faUser} />
              </button>
              <NavDropdown
                eventKey={3}
                title={this.state.loggedInAs}
                id="basic-nav-dropdown"
              >
                <MenuItem onClick={this.logout} eventKey={3.4}>
                  Logout
                </MenuItem>
              </NavDropdown>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
