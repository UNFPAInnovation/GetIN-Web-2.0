import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Card from "../components/Card";
import { Bar } from "react-chartjs-2";
import {
  faFemale,
  faBaby,
  faSync,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import MappedGirlsBySubCounty from "../components/Charts/MappedGirlsBySubCounty";
import Deliveries from "../components/Charts/DeliveriesPerSubCounty";
import FamilyPlanning from "../components/Charts/FamilyPlaning";
const alertifyjs = require("alertifyjs");
const service = require("../api/services");

let order = "desc";
let startOFDay = new Date();
startOFDay.setHours(0, 0, 0, 0);
let prevMonthFirstDay = moment()
  .subtract(1, "months")
  .date(1)
  .local()
  .format("YYYY-MM-DD");

var endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

const data = {
  labels: ["15 - 19", "20 -24", "25 -30"],
  datasets: [
    {
      label: '',
      data: [400, 150, 250, 0, 500],
      backgroundColor: ["#4CC4D4", "#4BD4B8", "#5561D5"],
      hoverBackgroundColor: ["#7cddea", "#4BD4B8", "#7480ed"]
    }
  ]
};

export default class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoaded: false,
      from: prevMonthFirstDay,
      to: moment(endOfDay)
        .local()
        .format("YYYY-MM-DD")
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
                <FontAwesomeIcon icon={faHome} />
              </span>{" "}
              Dashboard
            </h4>
            <form className="form-inline pull-right">
              <div className="form-group">
                <span className="label">Filter</span>
              </div>
              <div className="form-group">
                <label htmlFor="email">From:</label>
                <input
                  name="from"
                  value={this.state.from}
                  onChange={this.handleInputChange}
                  className="form-control"
                  type="date"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">To:</label>
                <input
                  name="to"
                  value={this.state.to}
                  onChange={this.handleInputChange}
                  className="form-control"
                  type="date"
                />
              </div>
            </form>
            <br className="clear-both" />
            <br className="clear-both" />
          </div>
          <div className="col-md-12 flex-row">
            <Card
              title="Mapped girls"
              icon={faFemale}
              rate="30%"
              direction="up"
              amount={1200}
              color="card-purple"
            />
            <Card
              title="Deliveries"
              icon={faBaby}
              rate="60%"
              direction="up"
              amount={400}
              color="card-blue"
            />
            <Card
              title="Follow ups"
              icon={faSync}
              rate="5%"
              direction="down"
              amount={500}
              color="card-orange"
            />
          </div>
          <br className="clear-both" />
          <br className="clear-both" />
          <div className="col-md-12 bg-white-content">
            <div className="col-md-4 ">
              <h5>Age group of mapped girls</h5>
              <div className="col-md-12">
                <Bar
                  data={data}
                  width={100}
                  height={400}
                  options={{
                    maintainAspectRatio: false
                  }}
                />
              </div>
            </div>
            <div className="col-md-8">
            
              <h5>Mapped Girls per subcounty</h5>
              <div className="col-md-12">
              <MappedGirlsBySubCounty />
              </div>
            </div>
            <br className="clear-both" />
            <br className="clear-both" />
            <div className="col-md-12">
              <h5>Deliveries per subcounty</h5>
              <div className="col-md-12">
              <Deliveries />
              </div>
            </div>
            <br className="clear-both" />
            <br className="clear-both" />
            <div className="col-md-12">
              <h5>Family Planning Methods used in Arua District</h5>
              <div className="col-md-12">
              <FamilyPlanning /></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
