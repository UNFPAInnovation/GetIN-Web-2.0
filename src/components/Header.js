import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { MenuItem, NavDropdown } from "react-bootstrap";
import { capitalizeFirstLetter } from "../utils/index";
import {GlobalContext} from '../context/GlobalState';
const alertifyjs = require("alertifyjs");
const sessionStorage = window.sessionStorage;
const service = require('../api/services');
const PasswordChangeModal = React.lazy(()=> import("../pages/Settings/Update/ChangePassword"));

export default function Header(){

  const [loggedInAs, setLoggedInAs] = useState('');
  const [districts,setDistricts] = useState([]);
  const {updateDistrict, updateDistrictId} = useContext(GlobalContext);
  const [showModal,setShowModal] = useState(false)

  const logout = ()=>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("district");
    sessionStorage.removeItem("role");
    alertifyjs.message("Logging out", 5);
    window.location.href = "/";
  }

  const getdistricts = ()=>{
    service.getDistricts(function(error,response){
      if(error){
        return "Failed to load districts";
      }
      else{
        setDistricts(response.results);
      }
    })
  
  }

  const openModal = ()=>{
    setShowModal(true);
  }

  const closeModal = ()=>{
    setShowModal(false);
  }

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    setLoggedInAs(username);
    getdistricts();  
  }, [])

  let role = sessionStorage.getItem('role');

  return (
    <nav className='headerNav navbar navbar-default navbar-static-top'>
      <div className='container-fluid'>
        <div data-testid="test-navbar" id='navbar' className='top-navbar' style={{justifyContent: `${role}` === 'manager'?'space-between':'flex-end'}}>
          {role === 'manager' && (<div id="district-nav">
            <NavDropdown data-testid="district-filter" eventKey={1} title="Filter by district" id="district-nav-dropdown">
              <MenuItem eventKey={1.1} onClick={()=>{updateDistrict("All Districts");updateDistrictId('')}}>All Districts</MenuItem>
              {districts?districts.map((district)=>{
                return <MenuItem key={district.id} eventKey={district.id} onClick={()=>{updateDistrict(district.name);updateDistrictId(district.id)}}>{district.name}</MenuItem>
              }
              ):<MenuItem eventKey={1.2}>Loading...</MenuItem>}
            </NavDropdown>
          </div>)
          }
          <ul className='profileNav nav navbar-nav navbar-right'>
            <button type='button' className='btn pull-left'>
              <FontAwesomeIcon icon={faUser} />
            </button>
            <NavDropdown
              eventKey={3}
              title={capitalizeFirstLetter(loggedInAs)}
              id='basic-nav-dropdown'
            >
              <MenuItem onClick={openModal} eventKey={3.4}>
                Reset Password
              </MenuItem>
              <MenuItem onClick={logout} eventKey={3.4}>
                Logout
              </MenuItem>
            </NavDropdown>
          </ul>
        </div>
        <PasswordChangeModal
          show={showModal}
          handleClose={()=> closeModal()}
        />
      </div>
    </nav>
  );
}