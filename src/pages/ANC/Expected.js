/* eslint-disable */
import React, { Component } from "react";
import {
  fromInitialDate,
  endOfDay,
  dateFormatter,
  enumFormatter,
  getData,
  trimesterFormatter,
  chewFormatter,
  nameFormatter,
  hideRowIfRecordExists
} from "../../utils/index";
import moment from "moment";
import _ from "underscore";
import Check from "../../components/Check";
import ExpandableTable from "./ExpandableTable";
import { NavDropdown, MenuItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
const Fuse = require("fuse.js");

export default class ExpectedAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      appointments_copy: [],
      isLoaded: false,
      loadingText: "Loading ..",
      status: "Expected",
      from: fromInitialDate,
      to: moment(endOfDay)
        .local()
        .format("YYYY-MM-DD"),
      showCoords: true,
      search: null,
      manageColomns: {
        name: false,
        vht: true,
        trimester: false,
        //  remaining_visits:false,
        date: false
      },
      // remote pagination
      currentPage: 1,
      sizePerPage: 20,
      totalDataSize: 0
    };
    this.updateTable = this.updateTable.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.search = this.search.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.isExpandableRow = this.isExpandableRow.bind(this);
    this.expandComponent = this.expandComponent.bind(this);
  }
  isExpandableRow(row) {
    let girls = _.filter(this.state.appointments, function(appointment) {
      return appointment.girl.id === row.girl.id && appointment.id !== row.id;
    });
    if (girls.length > 0) return true;
    else return false;
  }

  expandComponent(row) {
    let girls = _.filter(this.state.appointments, function(appointment) {
      return appointment.girl.id === row.girl.id && appointment.id !== row.id;
    });
    return <ExpandableTable data={girls} />;
  }
  expandColumnComponent({ isExpandableRow, isExpanded }) {
    let content = "";

    if (isExpandableRow) {
      content = isExpanded ? (
        <FontAwesomeIcon icon={faCaretUp} />
      ) : (
        <FontAwesomeIcon icon={faCaretDown} />
      );
    } else {
      content = " ";
    }
    return <div> {content} </div>;
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    const thisApp = this;
    getData(
      {
        name: "Appointments",
        status: this.state.status,
        from: this.state.from,
        to: this.state.to
      },
      function(error, response) {
        if (error) {
          thisApp.setState({
            isLoaded: true
          });
        } else {
          thisApp.setState({
            isLoaded: true,
            appointments: response.results,
            appointments_copy: response.results
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
  handleInputChange(event) {
    const thisApp = this;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
        isLoaded: false
      },
      () => thisApp.loadData()
    );
  }
  search(event) {
    this.setState({ search: event.target.value });
    if (event.target.value.length <= 0) {
      this.setState({
        appointments: this.state.appointments_copy
      });
    } else {
      let options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "girl.first_name",
          "girl.last_name",
          "girl.phone_number",
          "girl.trimester",
          "girl.next_of_kin_last_name",
          "girl.next_of_kin_first_name",
          "girl.next_of_kin_phone_number",
          "user.first_name",
          "user.last_name",
          "user.gender",
          "user.village",
          "user.role",
          "user.phone"
        ]
      };

      var fuse = new Fuse(this.state.appointments_copy, options); // "list" is the item array
      var result = fuse.search(event.target.value);
      this.setState({
        appointments: result
      });
    }
  }
  onFilterChange(filter) {
    let results = [];
    this.setState(
      {
        appointments: this.state.appointments_copy
      },
      function() {
        if (filter && filter.trimester && filter.trimester.value) {
          this.state.appointments.forEach(function(element) {
            if (
              element.girl.trimester.toString() ===
              filter.trimester.value.toString()
            ) {
              results.push(element);
            }
          });
          this.setState({
            appointments: results
          });
        } else {
          this.setState({
            appointments: this.state.appointments_copy
          });
        }
      }
    );
  }

  render() {
    let data_table = this.state.appointments;
    const trimesterType = {
      "1": "1st",
      "2": "2nd",
      "3": "3rd"
    };

    const options = {
      page: 1, // which page you want to show as default
      // onPageChange: this.onPageChange,
      // onSortChange: this.onSortChange,
      onFilterChange: this.onFilterChange,
      //   sizePerPageList: xxx, // you can change the dropdown list for size per page
      sizePerPage: 20, // which size per page you want to locate as default  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 10,
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "First", // First page button text
      paginationPosition: "bottom", // default is bottom, top and both is all available
      expandRowBgColor: "rgb(255, 255, 255,0.1)"
    };

    return (
      <div>
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
            <div className='form-group'>
              <label htmlFor='email'>From:</label>
              <input
                name='from'
                value={this.state.from}
                onChange={this.handleInputChange}
                className='form-control'
                type='date'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>To:</label>
              <input
                name='to'
                value={this.state.to}
                onChange={this.handleInputChange}
                className='form-control'
                type='date'
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
                onClick={(e, vht) => this.updateTable("vht")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.vht} /> VHT
              </MenuItem>
              <MenuItem
                onClick={(e, trimester) => this.updateTable("trimester")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.trimester} /> Trimester
              </MenuItem>
              {/* <MenuItem onClick={(e, remaining_visits) => this.updateTable("remaining_visits")} eventKey={3.1}> <Check state={this.state.manageColomns.remaining_visits} /> Remaining Visits</MenuItem>              */}
              <MenuItem
                onClick={(e, date) => this.updateTable("date")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.date} /> Date
              </MenuItem>
            </NavDropdown>
          </form>
          <div className='padding-top content-container col-md-12'>
            {this.state.isLoaded === true ? (
              <BootstrapTable
                data={data_table}
                trClassName={row =>
                  hideRowIfRecordExists(row, this.state.appointments)
                }
                striped
                hover
                csvFileName={
                  "Expected_Appointments" +
                  moment(Date.now())
                    .local()
                    .format("YYYY_MM_DD_HHmmss") +
                  ".csv"
                }
                ref='table'
                remote={false}
                headerContainerClass='table-header'
                tableContainerClass='table-responsive table-onScreen'
                fetchInfo={{ dataTotalSize: data_table.length }}
                pagination={true}
                options={options}
                exportCSV
                pagination
                expandableRow={this.isExpandableRow}
                expandComponent={this.expandComponent}
                expandColumnOptions={{
                  expandColumnVisible: true,
                  expandColumnComponent: this.expandColumnComponent,
                  columnWidth: 50
                }}
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
                  width='300px'
                  hidden={this.state.manageColomns.name}
                  dataSort={true}
                  dataFormat={nameFormatter}
                  csvFormat={nameFormatter}
                  dataField='name'
                >
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.vht}
                  dataSort={true}
                  dataFormat={chewFormatter}
                  csvFormat={chewFormatter}
                  dataField='vht'
                  width='300px'
                >
                  VHT
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.trimester}
                  // dataSort={true}
                  filterFormatted
                  dataFormat={enumFormatter}
                  csvFormat={trimesterFormatter}
                  dataFormat={trimesterFormatter}
                  filter={{ type: "SelectFilter", options: trimesterType }}
                  dataField='trimester'
                >
                  Trimester
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.date}
                  dataSort={true}
                  csvFormat={dateFormatter}
                  dataFormat={dateFormatter}
                  dataField='date'
                >
                  Date
                </TableHeaderColumn>
              </BootstrapTable>
            ) : (
              <span>Loading</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
