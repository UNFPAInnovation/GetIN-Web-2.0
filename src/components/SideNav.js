import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faStethoscope, faFemale, faSync, faHospital, faBaby, faUsers, faHome, faEnvelope, faCog} from '@fortawesome/free-solid-svg-icons'
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
export default class SideNav extends Component{
    constructor(props){
      super(props);
      this.state = {
        mini:false,
        show:true
      }
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
    ToggleMenu(e){
        e.preventDefault();
        let stateX = this.state.show;
        if(stateX ===false){
          this.setState({
            show:true
          });
        }
        else{
          this.setState({
            show:false
          });
        }
        
      }
    render(){
        return(
    <div className={this.state.show ?("sideNav"):("sideNav hiddenMenu")}>
          <nav className="headerNav navbar navbar-default navbar-static-top">
        <div className="navbar-header">
                     <a className="navbar-brand" href="#">GetIN</a>
          <button type="button" className="btn onMobile" onClick={this.ToggleMenu} id="handleSidebar">
          <FontAwesomeIcon icon={faAlignRight}/>
          </button>
      </div>
    </nav>
<div id="listMenu" className="col-md-12">
<ListGroup>
  <ListGroupItem id="dashboardLink"><Link to="/dashboard">{this.state.mini === false && "Dashboard"}   <FontAwesomeIcon icon={faHome} /></Link></ListGroupItem>
  <ListGroupItem id="anc_visitsLink"><Link to="/anc_visits">{ this.state.mini ===false && "ANC Visits"} <FontAwesomeIcon icon={faStethoscope}/></Link></ListGroupItem>
  <ListGroupItem id="girlsLink"><Link to="/girls">{ this.state.mini ===false && "Mapped girls"} <FontAwesomeIcon icon={faFemale}/></Link></ListGroupItem>
  <ListGroupItem id="spLink"><Link to="/follow_ups">{ this.state.mini ===false && "Follow ups"} <FontAwesomeIcon icon={faSync}/></Link></ListGroupItem>
  <ListGroupItem id="follow_upsLink"><Link to="/deliveries">{ this.state.mini ===false && "Deliveries"} <FontAwesomeIcon icon={faBaby}/></Link></ListGroupItem>
  <ListGroupItem id="dumpsLink"><Link to="/health_facilities">{ this.state.mini ===false && "Health Facilities"} <FontAwesomeIcon icon={faHospital}/></Link></ListGroupItem>
  <ListGroupItem id="health_facilitiesLink"><Link to="/users">{ this.state.mini ===false && "Users"} <FontAwesomeIcon icon={faUsers}/></Link></ListGroupItem>
  <ListGroupItem id="messagesLink"><Link to="/messages">{ this.state.mini ===false && "Messages"} <FontAwesomeIcon icon={faEnvelope}/></Link></ListGroupItem>
  <ListGroupItem id="settingsLink"><Link to="/settings">{ this.state.mini ===false && "Settings"} <FontAwesomeIcon icon={faCog}/></Link></ListGroupItem>
</ListGroup>
</div>
    </div>
        );
    }


}
