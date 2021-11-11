import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab } from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

const HealthFacility = React.lazy(() => import("./HealthFacility"));
const Home = React.lazy(() => import("./Home"));



export default class Deliveries extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "health_facility"
    };
  }
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12">
          <div className="col-md-12 title">
            <h4 className="pull-left">
              {" "}
              <span>
                <FontAwesomeIcon icon={faBaby} />
              </span>{" "}
              Deliveries
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
              <Tab eventKey="health_facility" title="Health Facility Births">
                <HealthFacility />
              </Tab>
              <Tab eventKey="home" title="Home births">
              <Home />
              </Tab>
             
            </Tabs>
          </div>
        </div>
      </React.Fragment>
    );
  }
}






