import React, { useState, useContext } from "react";
import moment from "moment";

// React bootstrap components
import { Grid, Row, Col } from "react-bootstrap";

// Font Awesome components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

// Loading data component
import { LoadingData } from "../../components/Layout";

// Our custom dashboard components
import DeliveriesCard from "./components/DeliveriesCard/index";
import FollowUpsCard from "./components/FollowUpsCard/index";
import MappedGirlsCard from "./components/MappedGirlsCard/index";
import AgeGroupOfMappedGirlsBarChart from "./components/AgeGroupOfMappedGirlsBarChart/index";
import MappedGirlsPerSubcountyBarChart from "./components/MappedGirlsPerSubcountyBarChart/index";

// Get Data
import getData from "../../utils/getData";

// import context
import {GlobalContext} from '../../context/GlobalState';

import { fromInitialDate } from "../../utils/index";

// const startOfMonth = moment()
//   .subtract(1, "months")
//   .date(1)
//   .local()
//   .format("YYYY-MM-DD");

const todaysDate = moment()
  .local()
  .format("YYYY-MM-DD");

export default function Dashboard() {
  const { districtId } = useContext(GlobalContext);
  // State variables
  const [fromFilter, setFromFilter] = useState(fromInitialDate);
  const [toFilter, setToFilter] = useState(todaysDate);

  // Fetch data using our custom useGetData hook
  const [{ followups, deliveries, mappingEncountersStats, isLoading }] =
    getData(fromFilter, toFilter, districtId);

  // Memoize the data

  return (
    <React.Fragment>
      <div className='col-md-12'>
        <div className='col-md-12 title'>
          <h4 className='pull-left'>
            {" "}
            <span>
              <FontAwesomeIcon icon={faHome} />
            </span>{" "}
            Dashboard
          </h4>
          <form className='form-inline pull-right'>
            <div className='form-group'>
              <span className='label'>Filter</span>
            </div>
            <div className='form-group'>
              <label htmlFor='email'>From:</label>
              <input
                name='from'
                value={fromFilter}
                onChange={event => setFromFilter(event.target.value)}
                className='form-control'
                type='date'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>To:</label>
              <input
                name='to'
                value={toFilter}
                onChange={event => setToFilter(event.target.value)}
                className='form-control'
                type='date'
              />
            </div>
          </form>
          <br className='clear-both' />
          <br className='clear-both' />
        </div>

        {isLoading ? (
          <LoadingData text='Loading dashboard and data ....' />
        ) : (
          <>
            <div className='col-md-12 flex-row'>
              <MappedGirlsCard
                data={mappingEncountersStats && mappingEncountersStats}
              />
              <DeliveriesCard data={deliveries && deliveries} />
              <FollowUpsCard data={followups && followups} />
            </div>
            <Grid fluid>
              <Row>
                <Col md={4}>
                  <AgeGroupOfMappedGirlsBarChart
                    data={mappingEncountersStats && mappingEncountersStats}
                  />
                </Col>
                <Col md={8}>
                  <MappedGirlsPerSubcountyBarChart
                    data={mappingEncountersStats && mappingEncountersStats}
                  />
                </Col>
              </Row>
            </Grid>
          </>
        )}
      </div>
    </React.Fragment>
  );
}
