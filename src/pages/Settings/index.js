import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import {Tabs, Tab} from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';


const AdminUsers = React.lazy(() => import("./Users/Admin"));
const GetInUsers = React.lazy(() => import("./Users/GetIN/Users"));



export default class Users extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        key: "getInUsers",

        users: false,
        getInUsers: false,
        healthFacility: false,

        userType: "",
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

    componentDidMount(){
      //this.getChews();
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
              <h4 className="pull-left">
                {" "}
                <span>
                  <FontAwesomeIcon icon={faCog} />
                </span>{" "}
                Settings
              </h4>

              <br className="clear-both" />
              <br className="clear-both" />
            </div>
            <div className="col-md-12 bg-white-content">
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={(key) => this.setState({ key })}
              >
                <Tab eventKey="getInUsers" title="GetIn Users">
                  <GetInUsers />
                </Tab>
                <Tab eventKey="users" title="Admin Users">
                  <AdminUsers />
                </Tab>
              </Tabs>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }











