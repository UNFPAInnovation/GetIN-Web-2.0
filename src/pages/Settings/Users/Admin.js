import React, { Component } from "react";
import { fromInitialDate, endOfDay, getData } from "../../../utils/index";
import moment from "moment";
import Check from "../../../components/Check";
import { NavDropdown, MenuItem, Button } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
const Fuse = require("fuse.js");
const UserModal = React.lazy(() => import("../Add/User"));

export default class VHT extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      users: [],
      users_copy: [],
      search: null,
      isLoaded: false,
      loadingText: "Loading ..",
      role: "manager",
      from: fromInitialDate,
      to: moment(endOfDay).local().format("YYYY-MM-DD"),
      showCoords: true,
      manageColomns: {
        email: false,
        name: false,
        phone: false,
        gender: false,
        village: false,
        username: false,
        sub_county: false,
      },
      // remote pagination
      currentPage: 1,
      sizePerPage: 20,
      totalDataSize: 0,
    };
    this.updateTable = this.updateTable.bind(this);
    this.search = this.search.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(modal) {
    this.setState({ [modal]: false });
  }

  handleShow(modal) {
    this.setState({ [modal]: true });
  }

  componentDidMount() {
    this.loadData();
  }
  loadData() {
    const thisApp = this;
    getData(
      {
        name: "users",
        role: this.state.role,
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
        keys: ["first_name", "last_name", "phone", "email", "phone"],
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
  nameFormatter(cell, row) {
    return row.first_name + " " + row.last_name;
  }
  villageFormatter(cell, row) {
    return row.village && row.village.name;
  }
  subCountyFormatter(cell, row) {
    return (
      row.village && row.village.parish && row.village.parish.sub_county.name
    );
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
          <div className="form-inline pull-right search-flex">
            <div className="form-group">
              <input
                name="from"
                value={this.state.search}
                onChange={this.search}
                placeholder="Search users..."
                className="search form-control"
                type="text"
              />
            </div>
            <NavDropdown
              eventKey={3}
              className=""
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
                onClick={(e, gender) => this.updateTable("gender")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.gender} /> Gender
              </MenuItem>
              <MenuItem
                onClick={(e, village) => this.updateTable("village")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.village} /> Village
              </MenuItem>
              <MenuItem
                onClick={(e, sub_county) => this.updateTable("sub_county")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.sub_county} /> Sub County
              </MenuItem>
              <MenuItem
                onClick={(e, username) => this.updateTable("username")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.username} /> Username
              </MenuItem>
            </NavDropdown>
            <div className="form-group">
              <Button
                className="btn-primary"
                onClick={() => this.handleShow("modal")}
                eventKey="1"
              >
                Add Users
              </Button>
            </div>
          </div>

          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable
                data={users}
                striped
                hover
                csvFileName={
                  "VHT_USERS_" +
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
                pagination
              >
                <TableHeaderColumn
                  hidden={this.state.manageColomns.name}
                  dataFormat={this.nameFormatter}
                  csvFormat={this.nameFormatter}
                  dataSort={true}
                  dataField="Name"
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
                  hidden={this.state.manageColomns.gender}
                  dataField="gender"
                >
                  Gender
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.village}
                  dataFormat={this.villageFormatter}
                  csvFormat={this.villageFormatter}
                  dataField="village"
                >
                  Village
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
        <UserModal
          handleClose={(d) => this.handleClose(d)}
          show={this.state.modal}
        />
      </div>
    );
  }
}
