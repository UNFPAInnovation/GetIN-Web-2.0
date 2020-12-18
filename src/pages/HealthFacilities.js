import React, { Component } from "react";
import { NavDropdown, MenuItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { fromInitialDate, endOfDay, getData } from "../utils/index";
const Fuse = require("fuse.js");

export default class HealthFacilities extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      health_facilities: [],
      health_facilities_copy: [],
      search: null,
      isLoaded: false,
      loadingText: "Loading ..",
      from: fromInitialDate,
      to: moment(endOfDay)
        .local()
        .format("YYYY-MM-DD"),
      showCoords: true,
      manageColomns: {
        name: false,
        subcounty: false,
        midwives: false,
        vhts: false,
        level: false,
        av_deliveries: false,
        ambulances: false
      },
      // remote pagination
      currentPage: 1,
      sizePerPage: 20,
      totalDataSize: 0
    };
    this.updateTable = this.updateTable.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
        isLoaded: false
      },
      () => this.getData()
    );
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  loadData() {
    const thisApp = this;
    getData(
      {
        name: "getHealthFacilities"
      },
      function(error, response) {
        if (error) {
          thisApp.setState({
            isLoaded: true
          });
        } else {
          thisApp.setState({
            isLoaded: true,
            health_facilities: response.results,
            health_facilities_copy: response.results
          });
        }
      }
    );
  }
  updateTable(colomn) {
    //make a copy of state
    let manageColomns = this.state.manageColomns;

    if (this.state.manageColomns[colomn] === true) {
      manageColomns[colomn] = false;
      this.setState({
        manageColomns: manageColomns
      });
    } else {
      manageColomns[colomn] = true;
      this.setState({
        manageColomns: manageColomns
      });
    }
  }
  getHealthFacilities(cell, row){
    if(row.facility_level == null) return ;
    return row.facility_level
  }
  getSubCountyName(cell,row, item){
    return row.sub_county &&
    row.sub_county[item]
  }
  getMidwives(cell,row){
    return row.midwife
  }
  getChews(cell, row){
    return row.chew
  }
  getAmbulances(cell, row){
    return row.ambulance
  }
  getAverageDeliveries(cell,row){
    return row.average_deliveries
  }
  search(event) {
    this.setState({ search: event.target.value });
    if (event.target.value.length <= 0) {
      this.setState({
        health_facilities: this.state.health_facilities_copy
      });
    } else {
      let options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["name", "parish"]
      };

      var fuse = new Fuse(this.state.health_facilities_copy, options); // "list" is the item array
      var result = fuse.search(event.target.value);
      this.setState({
        health_facilities: result
      });
    }
  }
  render() {
    let data_table = this.state.health_facilities;
    const options = {
      page: 1, // which page you want to show as default
      // onPageChange: this.onPageChange,
      // onSortChange: this.onSortChange,
      // onFilterChange: this.onFilterChange,
      //   sizePerPageList: xxx, // you can change the dropdown list for size per page
      sizePerPage: 20, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 10,
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "First", // First page button text
      paginationPosition: "bottom" // default is bottom, top and both is all available
    };

    return (
      <React.Fragment>
        <div className='col-md-12'>
          <div className='col-md-12 title'>
            <h4 className='pull-left'>
              {" "}
              <span>
                <FontAwesomeIcon icon={faHospital} />
              </span>{" "}
              Health Facilities
            </h4>
            <br className='clear-both' />
            <br className='clear-both' />
          </div>
          <div className='col-md-12 bg-white-content'>
            <div className='col-md-12'>
              <br className='clear-both' />
              <form className='form-inline pull-right'>
                <div className='form-group'>
                  <label htmlFor='email'>Search:</label>
                  <input
                    name='from'
                    value={this.state.search}
                    onChange={this.search}
                    placeholder='Type something here'
                    className='search form-control'
                    type='text'
                  />
                </div>

                <NavDropdown
                  eventKey={3}
                  className='pull-right'
                  title='Manage columns'
                  id='basic-nav-dropdown'
                >
                  <MenuItem
                    onClick={(e, name) => this.updateTable("name")}
                    eventKey={3.1}
                  >
                    {" "}
                    <Check state={this.state.manageColomns.name} /> Name
                  </MenuItem>
                  <MenuItem
                    onClick={(e, subcounty) => this.updateTable("subcounty")}
                    eventKey={3.1}
                  >
                    {" "}
                    <Check state={this.state.manageColomns.subcounty} />{" "}
                    Subcounty
                  </MenuItem>
                  <MenuItem
                    onClick={(e, midwives) => this.updateTable("midwives")}
                    eventKey={3.1}
                  >
                    {" "}
                    <Check state={this.state.manageColomns.midwives} /> Midwives
                  </MenuItem>
                  <MenuItem
                    onClick={(e, vhts) => this.updateTable("vhts")}
                    eventKey={3.1}
                  >
                    {" "}
                    <Check state={this.state.manageColomns.vhts} /> Chews
                  </MenuItem>
                  <MenuItem
                    onClick={(e, level) => this.updateTable("level")}
                    eventKey={3.1}
                  >
                    {" "}
                    <Check state={this.state.manageColomns.level} /> Level
                  </MenuItem>
                  <MenuItem
                    onClick={(e, av_deliveries) =>
                      this.updateTable("av_deliveries")
                    }
                    eventKey={3.1}
                  >
                    {" "}
                    <Check
                      state={this.state.manageColomns.av_deliveries}
                    />{" "}
                    GETIN Average deliveries
                  </MenuItem>
                  <MenuItem
                    onClick={(e, ambulances) => this.updateTable("ambulances")}
                    eventKey={3.1}
                  >
                    {" "}
                    <Check state={this.state.manageColomns.ambulances} />{" "}
                    Ambulances
                  </MenuItem>
                </NavDropdown>
              </form>
              <div className='padding-top content-container col-md-12'>
                {this.state.isLoaded === true ? (
                  <BootstrapTable
                    data={data_table}
                    striped
                    hover
                    csvFileName={
                      "Health_Facilities_" +
                      moment(Date.now())
                        .local()
                        .format("YYYY_MM_DD_HHmmss") +
                      ".csv"
                    }
                    ref='table'
                    remote={false}
                    headerContainerClass='table-header'
                    tableContainerClass='table-responsive table-onScreen'
                    pagination={true}
                    options={options}
                    exportCSV
                    pagination
                  >
                    <TableHeaderColumn
                      isKey={true}
                      hidden={true}
                      dataSort={true}
                      dataField='id'
                    >
                      #
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      hidden={this.state.manageColomns.name}
                      dataSort={true}
                      dataField='name'
                    >
                      Name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      hidden={this.state.manageColomns.subcounty}
                      dataFormat={(cell, row, item)=>this.getSubCountyName(cell, row, 'name')}
                      csvFormat={(cell, row, item)=>this.getSubCountyName(cell, row, 'name')}
                      dataSort={true}
                      dataField='sub_county'
                    >
                      Subcounty
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      hidden={this.state.manageColomns.midwives}
                      dataSort={true}
                      dataField='midwives'
                      dataFormat={(cell,row)=>this.getMidwives(cell, row)}
                      csvFormat={(cell,row)=>this.getMidwives(cell, row)}
                    >
                      Midwives
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      hidden={this.state.manageColomns.vhts}
                      dataSort={true}
                      dataField='vhts'
                      dataFormat={(cell, row)=>this.getChews(cell,row)}
                      csvFormat={(cell,row)=>this.getChews(cell,row)}
                    >
                      Chews
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      hidden={this.state.manageColomns.level}
                      dataSort={true}
                      dataFormat={(cell,row)=>this.getHealthFacilities(cell, row)}
                      csvFormat={(cell,row)=>this.getHealthFacilities(cell,row)}
                      dataField='facility_level'
                    >
                      Level
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      hidden={this.state.manageColomns.av_deliveries}
                      dataSort={true}
                      dataField='av_deliveries'
                      dataFormat={(cell,row)=>this.getAverageDeliveries(cell,row)}
                      csvFormat={(cell,row)=>this.getAverageDeliveries(cell,row)}
                    >
                      GETIN Average deliveries
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      hidden={this.state.manageColomns.ambulances}
                      dataSort={true}
                      dataField='ambulances'
                      dataFormat={(cell,row)=>this.getAmbulances(cell, row)}
                      csvFormat={(cell,row)=>this.getAmbulances(cell,row)}
                    >
                      Ambulances
                    </TableHeaderColumn>
                  </BootstrapTable>
                ) : (
                  <span>Loading</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Check extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <div className='checkboxWrapper'>
          <div className='disabler'></div>
          {this.props.state === false ? (
            <input type='checkbox' checked={true} />
          ) : (
            <input type='checkbox' checked={false} />
          )}
        </div>
      </React.Fragment>
    );
  }
}
