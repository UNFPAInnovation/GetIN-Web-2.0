import React from 'react';
import {Tabs, Tab, DropdownButton, MenuItem} from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';


const VHT = React.lazy(() => import("./VHT"));
const ChewModal = React.lazy(() => import("./Add/Vht"));
const Midwives = React.lazy(() => import("./Midwife"));
const MidwifeModal = React.lazy(() => import("./Add/Midwife"));
const AmbulanceDrivers = React.lazy(() => import("./Ambulance"));
const AmbulanceModal = React.lazy(() => import("./Add/Ambulance"));



export default class Users extends React.Component {
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
              <br className="clear-both" />
              <div className="pull-right">
                <DropdownButton
                  bsStyle={"primary"}
                  title={"Add user"}
                  key={4}
                  id={"add-user-btn"}
                >
                  <MenuItem
                    onClick={() => this.handleShow("chew")}
                    eventKey="1"
                  >
                    VHT
                  </MenuItem>
                  <MenuItem
                    onClick={() => this.handleShow("midwife")}
                    eventKey="2"
                  >
                    Midwives
                  </MenuItem>
                  <MenuItem
                    onClick={() => this.handleShow("ambulance")}
                    eventKey="3"
                  >
                    Ambulance
                  </MenuItem>
                </DropdownButton>
              </div>

              <br className="clear-both" />
              <br className="clear-both" />
            </div>
            <div className="col-md-12 bg-white-content">
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={(key) => this.setState({ key })}
              >
                <Tab eventKey="chews" title="VHTs">
                  <VHT />
                </Tab>
                <Tab eventKey="midwives" title="Midwives">
                  <Midwives />
                </Tab>
                <Tab eventKey="ambulances" title="Ambulance drivers">
                  <AmbulanceDrivers />
                </Tab>
              </Tabs>
            </div>
          </div>
          <ChewModal
            handleClose={(d) => this.handleClose(d)}
            show={this.state.chew}
          />
          <MidwifeModal
            handleClose={(d) => this.handleClose(d)}
            show={this.state.midwife}
          />
          <AmbulanceModal
            handleClose={(d) => this.handleClose(d)}
            show={this.state.ambulance}
          />
        </React.Fragment>
      );
    }
  }











