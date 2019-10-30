import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import moment from "moment";

// Font Awesome components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

// Our custom components
import DeliveriesCard from "./components/DeliveriesCard/index";
import FollowUpsCard from "./components/FollowUpsCard/index";
import MappedGirlsCard from "./components/MappedGirlsCard/index";

// Get Data
import getData from "../../utils/getData";

// Variables
const startOfMonth = moment()
  .startOf("month")
  .format("YYYY-MM-DD");

const todaysDate = moment()
  .local()
  .format("YYYY-MM-DD");

export default function Dashboard() {
  // State variables
  const [fromFilter, setFromFilter] = useState(startOfMonth);
  const [toFilter, setToFilter] = useState(todaysDate);

  // Fetch data using our custom useGetData hook
  const [{ followups, mappedGirls, deliveries, isLoading }] = getData(
    fromFilter,
    toFilter
  );

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
                value={fromFilter}
                onChange={event => setFromFilter(event.target.value)}
                className="form-control"
                type="date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">To:</label>
              <input
                name="to"
                value={toFilter}
                onChange={event => setToFilter(event.target.value)}
                className="form-control"
                type="date"
              />
            </div>
          </form>
          <br className="clear-both" />
          <br className="clear-both" />
        </div>
        <div className="col-md-12 flex-row">
          <MappedGirlsCard data={mappedGirls && mappedGirls} />
          <DeliveriesCard />
          <FollowUpsCard />
        </div>
        <br className="clear-both" />
        <br className="clear-both" />
        <div className="col-md-12 bg-white-content">
          <div className="col-md-4 ">
            <h5>Age group of mapped girls</h5>
            {/* <div className="col-md-12">
              <Bar
                data={data}
                width={100}
                height={400}
                options={{
                  maintainAspectRatio: false
                }}
              />
            </div> */}
          </div>
          <div className="col-md-8">
            <h5>Mapped Girls per subcounty</h5>
            {/* <div className="col-md-12">
              <MappedGirlsBySubCounty />
            </div> */}
          </div>
          <br className="clear-both" />
          <br className="clear-both" />
          <div className="col-md-12">
            <h5>Deliveries per subcounty</h5>
            {/* <div className="col-md-12">
              <Deliveries />
            </div> */}
          </div>
          <br className="clear-both" />
          <br className="clear-both" />
          <div className="col-md-12">
            <h5>Family Planning Methods used in Arua District</h5>
            {/* <div className="col-md-12">
              <FamilyPlanning />
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
