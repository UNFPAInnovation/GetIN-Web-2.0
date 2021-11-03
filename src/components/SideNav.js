import React, { Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignRight,
  faStethoscope,
  faFemale,
  faSync,
  faHospital,
  faBaby,
  faUsers,
  faHome,
  faEnvelope,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import {GlobalContext} from '../context/GlobalState';

export default class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mini: false,
      show: true,
      district: ""
    };
    this.ToggleMenu = this.ToggleMenu.bind(this);
  }
  handleSidebar() {
    let sideNavBar = document.getElementById("sideNavBar");
    let detailComponent = document.getElementById("detailComponent");
    if (this.state.mini === false) {
      this.setState({
        mini: true
      });
      sideNavBar.classList.remove("col-md-2");
      sideNavBar.classList.add("col-md-1");
      detailComponent.classList.remove("col-md-10");
      detailComponent.classList.add("col-md-11");
    } else {
      this.setState({
        mini: false
      });
      sideNavBar.classList.remove("col-md-1");
      sideNavBar.classList.add("col-md-2");
      detailComponent.classList.remove("col-md-11");
      detailComponent.classList.add("col-md-10");
    }
  }
  ToggleMenu(e) {
    e.preventDefault();
    let stateX = this.state.show;
    if (stateX === false) {
      this.setState({
        show: true
      });
    } else {
      this.setState({
        show: false
      });
    }
  }
  activeMenu() {
    document.getElementById("girlsLink").classList.remove("active");
    document.getElementById("dashboardLink").classList.remove("active");
    document.getElementById("usersLink").classList.remove("active");
    document.getElementById("anc_visitsLink").classList.remove("active");
    document.getElementById("follow_upsLink").classList.remove("active");
    document.getElementById("messagesLink").classList.remove("active");
    document.getElementById("healthFacilitiesLink").classList.remove("active");
    document.getElementById("deliveriesLink").classList.remove("active");
    document.getElementById("settingsLink").classList.remove("active");

    if (window.location.pathname == "/dashboard") {
      document.getElementById("dashboardLink").classList.add("active");
    } else if (window.location.pathname == "/girls") {
      document.getElementById("girlsLink").classList.add("active");
    } else if (window.location.pathname == "/users") {
      document.getElementById("usersLink").classList.add("active");
    } else if (window.location.pathname == "/anc_visits") {
      document.getElementById("anc_visitsLink").classList.add("active");
    } else if (window.location.pathname == "/follow_ups") {
      document.getElementById("follow_upsLink").classList.add("active");
    } else if (window.location.pathname == "/deliveries") {
      document.getElementById("deliveriesLink").classList.add("active");
    } else if (window.location.pathname == "/health_facilities") {
      document.getElementById("healthFacilitiesLink").classList.add("active");
    } else if (window.location.pathname == "/messages") {
      document.getElementById("messagesLink").classList.add("active");
    }
     else if (window.location.pathname == "/settings") {
      document.getElementById("settingsLink").classList.add("active");
    }
  }
  componentDidUpdate(prevProps) {
    this.activeMenu();
  }
  componentDidMount() {
    this.activeMenu();
    let district = sessionStorage.getItem("district");
    this.setState({
      district: district
    });
  }

  static contextType = GlobalContext;

  render() {
    return (
      <div className={this.state.show ? "sideNav" : "sideNav hiddenMenu"}>
        <nav className="headerNav navbar navbar-default navbar-static-top">
          <div className="navbar-header">
            <a className="navbar-brand" href="/dashboard">
              <img alt="GETIN" src={require("../assets/images/Logo.png")} />
              <span className="brand">GetIN</span>
              <span className="district">{this.context.district}</span>
            </a>
            <button
              type="button"
              className="btn onMobile"
              onClick={this.ToggleMenu}
              id="handleSidebar"
            >
              <FontAwesomeIcon icon={faAlignRight} />
            </button>
          </div>
        </nav>
        <div id="listMenu" className="col-md-12">
          <ListGroup>
            <ListGroupItem id="dashboardLink">
              <Link to="/dashboard">
                {this.state.mini === false && "Dashboard & Reports"}{" "}
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </ListGroupItem>
            <ListGroupItem id="anc_visitsLink">
              <Link to="/anc_visits">
                {this.state.mini === false && "ANC Visits"}{" "}
                <FontAwesomeIcon icon={faStethoscope} />
              </Link>
            </ListGroupItem>
            <ListGroupItem id="girlsLink">
              <Link to="/girls">
                {this.state.mini === false && "Mapped Women"}{" "}
                <FontAwesomeIcon icon={faFemale} />
              </Link>
            </ListGroupItem>
            <ListGroupItem id="follow_upsLink">
              <Link to="/follow_ups">
                {this.state.mini === false && "Follow ups"}{" "}
                <FontAwesomeIcon icon={faSync} />
              </Link>
            </ListGroupItem>
            <ListGroupItem id="deliveriesLink">
              <Link to="/deliveries">
                {this.state.mini === false && "Deliveries"}{" "}
                <FontAwesomeIcon icon={faBaby} />
              </Link>
            </ListGroupItem>
            <ListGroupItem id="healthFacilitiesLink">
              <Link to="/health_facilities">
                {this.state.mini === false && "Health Facilities"}{" "}
                <FontAwesomeIcon icon={faHospital} />
              </Link>
            </ListGroupItem>
            <ListGroupItem id="usersLink">
              <Link to="/users">
                {this.state.mini === false && "Users"}{" "}
                <FontAwesomeIcon icon={faUsers} />
              </Link>
            </ListGroupItem>
            <ListGroupItem id="messagesLink">
              <Link to="/messages">
                {this.state.mini === false && "Messages"}{" "}
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
            </ListGroupItem>
            <ListGroupItem id="settingsLink">
              <Link to="/settings">
                {this.state.mini === false && "Settings"}{" "}
                <FontAwesomeIcon icon={faCog} />
              </Link>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    );
  }
}
