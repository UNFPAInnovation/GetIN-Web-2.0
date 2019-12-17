import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab } from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

const MissedAppointments = React.lazy(() => import("./Missed"));
const ExpectedAppointments = React.lazy(() => import("./Expected"));
const AttendedAppointments = React.lazy(() => import("./Attended"));
const CompletedAppointments = React.lazy(() => import("./Completed"));


export default class AncVisits extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "missedAppointments"
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
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12">
          <div className="col-md-12 title">
            <h4 className="pull-left">
              {" "}
              <span>
                <FontAwesomeIcon icon={faStethoscope} />
              </span>{" "}
              ANC Visits
            </h4>
            <br className="clear-both" />
            <br className="clear-both" />
          </div>
          <div className="col-md-12 bg-white-content">
            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={key => this.setState({ key })}
            >
              <Tab eventKey="missedAppointments" title="Missed Appointments">
                <MissedAppointments />
              </Tab>
              <Tab
                eventKey="expectedAppointments"
                title="Expected Appointments"
              >
                <ExpectedAppointments />
              </Tab>
              <Tab
                eventKey="attendedAppointments"
                title="Attended Appointments"
              >
                <AttendedAppointments />
              </Tab>
              <Tab
                eventKey="completedAppointments"
                title="Completed Appointments"
              >
                <CompletedAppointments />
              </Tab>
            </Tabs>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
