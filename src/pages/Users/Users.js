import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import {Tabs, Tab} from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';


const VHT = React.lazy(() => import("./VHT"));
const Midwives = React.lazy(() => import("./Midwife"));
const AmbulanceDrivers = React.lazy(() => import("./Ambulance"));



export default class Users extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        key: 'chews',

        chew: false,
        midwife: false,
        ambulance:false,

        userType:"",

      };
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
    handleClose(modal) {
        this.setState({ [modal]: false });
      }
    
      handleShow(modal) {
        this.setState({ [modal]: true });
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
        <React.Fragment>
      
          <div className="col-md-12">
          <div className="col-md-12 title">
              <h4 className="pull-left"> <span><FontAwesomeIcon icon={faUsers} /></span> Users</h4>
              <br className="clear-both"/>
              <br className="clear-both"/>
            </div>
            <div className="col-md-12 bg-white-content">
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="chews" title="VHTs">
            <VHT />
          </Tab>
          <Tab eventKey="midwives" title="Midwives">
          <Midwives/>
          </Tab>
          <Tab eventKey="ambulances" title="Ambulance drivers">
          <AmbulanceDrivers />
          </Tab>
        </Tabs>
        </div>
        </div>
        </React.Fragment>
      );
    }
  }











