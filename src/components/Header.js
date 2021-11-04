/* eslint-disable */
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, MenuItem, NavDropdown } from "react-bootstrap";
import { capitalizeFirstLetter } from "../utils/index";
import {GlobalContext} from '../context/GlobalState';
const alertifyjs = require("alertifyjs");
const sessionStorage = window.sessionStorage;
const service = require('../api/services');

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInAs: "",
      show: true
    };
  }

  static contextType = GlobalContext;

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("district");
    alertifyjs.message("Logging out", 5);
    window.location.href = "/";
  }

  getdistricts(){
    service.getDistricts(function(error,response){
      if(error){
        return "Failed to load districts";
      }
      else{
        sessionStorage.setItem('districts',JSON.stringify(response.results));
      }
    })
  
  }

  componentDidMount() {
    let username = sessionStorage.getItem("username");
    this.setState({
      loggedInAs: username
    });
    this.getdistricts();
  }

  render() {
    let districts = JSON.parse(sessionStorage.getItem('districts'));
    return (
      <nav className='headerNav navbar navbar-default navbar-static-top'>
        <div className='container-fluid'>
          <div id='navbar' className='top-navbar'>
            <div id="district-nav">
              <NavDropdown eventKey={1} title="Filter by district" id="district-nav-dropdown">
                <MenuItem eventKey={1.1} onClick={()=>{this.context.updateDistrict("All Districts")}}>All Districts</MenuItem>
                {districts?districts.map((district)=>{
                  return <MenuItem key={district.id} eventKey={district.id} onClick={()=>{this.context.updateDistrict(district.name)}}>{district.name}</MenuItem>
                }
                ):<MenuItem eventKey={1.2}>Loading...</MenuItem>}
              </NavDropdown>
            </div>
            <ul className='profileNav nav navbar-nav navbar-right'>
              <button type='button' className='btn pull-left'>
                <FontAwesomeIcon icon={faUser} />
              </button>
              <NavDropdown
                eventKey={3}
                title={capitalizeFirstLetter(this.state.loggedInAs)}
                id='basic-nav-dropdown'
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
