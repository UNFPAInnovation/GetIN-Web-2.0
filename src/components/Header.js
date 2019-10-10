import React, { Component } from 'react';
// import {ReactComponent as MenuOverLayIcon} from '../../assets/MenuOverLayIcon.svg';
import '../styles/Header.scss'
;
export default class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      show:false
    };
    this.ToggleMenu = this.ToggleMenu.bind(this);
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
  render() {

    let links = [
      {
        name:"-",
        type:"icon",
        link:"#",
        class:"border-right",
        onClick:this.openMenu
      }
    ];
    let linksMenu = links.map((item, key)=>
      <li key={key} className={key===0 ?"on-mobile nav-item "+item.class: item.class+" nav-item"}>
          <a className={item.link === window.location.pathname  ? "active "+item.class: item.class } href={item.link}>{item.name}</a>
          <ul className="list">
      { item.list && item.list.map((item_, key_)=>
        <li key={key_}><a href={item_.link}>{item_.name}</a></li>     
        )}
          </ul>
          </li>
    );
    return (
      <nav className="header navbar navbar-default">
  <div className="container-fluid">
  <ul className="nav navbar-nav menuBar">
    <li className="nav-item" >
            <a onClick={(e)=>this.ToggleMenu(e)} href="#">{this.state.show ===true ? <React.Fragment><span>CLOSE</span></React.Fragment>:<React.Fragment><span>MENU</span> </React.Fragment>} </a>
    </li>
    </ul>
    <ul className={this.state.show === true ? "open nav navbar-nav listNav": "nav navbar-nav listNav"}>
      {linksMenu}
    </ul>
    <div className="navbar-header pull-right">
      <a className="navbar-brand" href="/">GetIN</a>
    </div>
  </div>
</nav>
    );
  }
}