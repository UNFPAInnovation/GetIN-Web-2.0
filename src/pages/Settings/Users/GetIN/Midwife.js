import React, { Component } from "react";
import { fromInitialDate, endOfDay, getData } from "../../../../utils/index";
import moment from "moment";
import Check from "../../../../components/Check";
import { NavDropdown, MenuItem } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { GlobalContext } from "../../../../context/GlobalState";
const Fuse = require("fuse.js");

export default class Midwives extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      users_copy: [],
      search: null,
      isLoaded: false,
      loadingText: "Loading ..",
      status: "All",
      role: "midwife",
      from: fromInitialDate,
      to: moment(endOfDay).local().format("YYYY-MM-DD"),
      showCoords: true,
      manageColomns: {
        email: true,
        name: false,
        phone: false,
        gender: false,
        username: false,
        health_facility: false,
        sub_county: true,
        district: true,
      },
      // remote pagination
      currentPage: 1,
      sizePerPage: 20,
      totalDataSize: 0,
    };
    this.updateTable = this.updateTable.bind(this);
    this.search = this.search.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    if (this.context.change) {
      this.setState({ isLoaded: false });
      this.loadData();
      this.context.contextChange(false);
    }
  }

  loadData() {
    const thisApp = this;
    getData(
      {
        name: "users",
        role: this.state.role,
        districtId: this.context.districtId,
      },
      function (error, response) {
        if (error) {
          thisApp.setState({
            isLoaded: true,
          });
        } else {
          thisApp.setState({
            isLoaded: true,
            users: response.results,
            users_copy: response.results,
          });
        }
      }
    );
  }
  search(event) {
    this.setState({ search: event.target.value });
    if (event.target.value.length <= 0) {
      this.setState({
        users: this.state.users_copy,
      });
    } else {
      let options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["first_name", "last_name", "phone_number", "email", "phone"],
      };

      var fuse = new Fuse(this.state.users_copy, options); // "list" is the item array
      var result = fuse.search(event.target.value);
      this.setState({
        users: result,
      });
    }
  }

  updateTable(colomn) {
    //make a copy of state
    let manageColomns = this.state.manageColomns;

    if (this.state.manageColomns[colomn] === true) {
      manageColomns[colomn] = false;
      this.setState({
        manageColomns: manageColomns,
      });
    } else {
      manageColomns[colomn] = true;
      this.setState({
        manageColomns: manageColomns,
      });
    }
  }
  healthFormatter(cell, row) {
    if (row.health_facility == null) return;
    return row.health_facility.name;
  }
  nameFormatter(cell, row) {
    return row.first_name + " " + row.last_name;
  }
  subCountyFormatter(cell, row) {
    return (
      row.village && row.village.parish && row.village.parish.sub_county.name
    );
  }
  districtFormatter(cell, row) {
    return row?.village?.parish?.sub_county?.county?.district?.name;
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
        isLoaded: false,
      },
      () => this.loadData()
    );
  }
  render() {
    let users = this.state.users;

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
      paginationPosition: "bottom", // default is bottom, top and both is all available
    };

    return (
      <div>
        <div className="col-md-12">
          <br className="clear-both" />
          <form className="form-inline pull-right">
            <div className="form-group">
              <label htmlFor="email">Search:</label>
              <input
                name="from"
                value={this.state.search}
                onChange={this.search}
                placeholder="Type something here"
                className="search form-control"
                type="text"
              />
            </div>

            <NavDropdown
              eventKey={3}
              className="pull-right"
              title="Manage columns"
              id="basic-nav-dropdown"
            >
              <MenuItem
                onClick={(e, name) => this.updateTable("name")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.name} /> Name
              </MenuItem>
              <MenuItem
                onClick={(e, phone) => this.updateTable("phone")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.phone} /> Phone
              </MenuItem>
              <MenuItem
                onClick={(e, email) => this.updateTable("email")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.email} /> Email
              </MenuItem>
              <MenuItem
                onClick={(e, health_facility) =>
                  this.updateTable("health_facility")
                }
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.health_facility} />{" "}
                Health facility
              </MenuItem>
              <MenuItem
                onClick={(e, sub_county) => this.updateTable("sub_county")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.sub_county} /> Sub County
              </MenuItem>
              <MenuItem
                onClick={(e, district) => this.updateTable("district")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.district} /> District
              </MenuItem>
              <MenuItem
                onClick={(e, gender) => this.updateTable("gender")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.gender} /> Gender
              </MenuItem>
              <MenuItem
                onClick={(e, username) => this.updateTable("username")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.username} /> Username
              </MenuItem>
            </NavDropdown>
          </form>

          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable
                data={users}
                striped
                hover
                csvFileName={
                  "Midwives_users" +
                  moment(Date.now()).local().format("YYYY_MM_DD_HHmmss") +
                  ".csv"
                }
                ref="table"
                remote={false}
                headerContainerClass="table-header"
                tableContainerClass="table-responsive table-onScreen"
                pagination={true}
                options={options}
                exportCSV
              >
                <TableHeaderColumn
                  width="200px"
                  hidden={this.state.manageColomns.name}
                  dataFormat={this.nameFormatter}
                  csvFormat={this.nameFormatter}
                  dataSort={true}
                  dataField="first_name"
                >
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.phone}
                  dataSort={true}
                  dataField="phone"
                >
                  Phone
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.email}
                  dataSort={true}
                  dataField="email"
                >
                  Email
                </TableHeaderColumn>
                <TableHeaderColumn
                  width="200px"
                  hidden={this.state.manageColomns.health_facility}
                  dataFormat={this.healthFormatter}
                  csvFormat={this.healthFormatter}
                  dataSort={true}
                  dataField="health_facility"
                >
                  Health facility
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.sub_county}
                  dataFormat={this.subCountyFormatter}
                  csvFormat={this.subCountyFormatter}
                  dataField="sub_county"
                >
                  Sub county
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.district}
                  dataFormat={this.districtFormatter}
                  csvFormat={this.districtFormatter}
                  dataField="district"
                >
                  District
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.gender}
                  dataField="gender"
                >
                  Gender
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.username}
                  isKey
                  dataField="username"
                >
                  Username
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
