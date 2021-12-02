import React, { Component } from "react";
import moment from "moment";
import Check from "../../components/Check";
import { NavDropdown, MenuItem} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import service from '../../api/services';
const alertifyjs = require("alertifyjs");

export default class VHT extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      district: null,
      districts: [],
      districts_copy:[],
      isLoaded: false,
      loadingText: "Loading ..",
      showCoords: true,
      manageColomns: {
        name: false,
        status: false,
        id:true
      },
      // remote pagination
      currentPage: 1,
      sizePerPage: 20,
      totalDataSize: 0,
    };
    this.updateTable = this.updateTable.bind(this);
    this.actionsFormatter = this.actionsFormatter.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidMount() {
    this.getDistricts();
  }

  getDistricts() {
    const thisApp = this;

    service.getAllDistricts(
      function (error, response) {
        if (error) {
          thisApp.setState({
            isLoaded: true,
          });
        } else {
          thisApp.setState({
            isLoaded: true,
            districts: response.results,
            districts_copy: response.results,
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
    return row.name;
  }

  statusFormatter(cell, row) {
    return row.active?'Active':'Inactive';
  }

  idFormatter(cell, row) {
    return row.id;
  }

  updateDistrict(e,districtId,data){
    e.preventDefault();
    const thisApp = this;
    thisApp.setState({
      isLoaded: false,
    });
    alertifyjs.message("Updating District..", 2, function () {});
    service.updateDistrict(
      districtId,
      data,
      function (error, response) {
        if (error) {
          thisApp.setState({
            isLoaded: true,
          });
          alertifyjs.error("Request failed, try again ", function () {});
        } else {
          thisApp.setState({
            isLoaded: true,
          });
          alertifyjs.success("Updated successfully", 2, function () {});
          window.location.reload();
        }
      }
    );

  }

  actionsFormatter(cell, row) {

    if(row.active){
        return (
            <button
              className="btn btn-xs btn-danger"
              onClick={(e)=>this.updateDistrict(e,row.id,{active:false})}
            >
              Deactivate
            </button>
          );
    }
    else{
        return (
            <button
              className="btn btn-xs btn-success"
              onClick={(e)=>this.updateDistrict(e,row.id,{active:true})}
            >
              Activate
            </button>
          );
    }
    
  }

  onFilterChange(filter) {
    let results = [];
    this.setState(
      {
        districts: this.state.districts_copy,
        isLoaded:false
      },
      function() {
        if (filter && filter.active && filter.active.value) {
          this.state.districts.forEach(function(element) {
            if (
              element.active.toString() ===
              filter.active.value.toString()
            ) {
              results.push(element);
            }
          });
          this.setState({
            districts: results,
            isLoaded:true
          });
        }
        else {
          this.setState({
            districts: this.state.districts_copy,
            isLoaded:true
          });
        }
      }
    );
  }

  render() {
    let districts = this.state.districts;

    const actionType = {
        true: 'Active',
        false: 'Inactive'
    }

    const options = {
      page: 1, // which page you want to show as default
      onFilterChange: this.onFilterChange,
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
                onClick={(e, status) => this.updateTable("status")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.status} /> Status
              </MenuItem>
            </NavDropdown>
          </div>

          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable
                data={districts}
                striped
                hover
                csvFileName={
                  "Districts" +
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
                  hidden={this.state.manageColomns.id}
                  isKey
                  dataFormat={this.idFormatter}
                  dataSort={true}
                  dataField="id"
                >
                  Id
                </TableHeaderColumn>
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
                  hidden={this.state.manageColomns.status}
                  dataFormat={this.statusFormatter}
                  csvFormat={this.statusFormatter}
                  filter={{ type: "SelectFilter", options: actionType }}
                  dataSort={true}
                  dataField="active"
                >
                  Status
                </TableHeaderColumn>
                <TableHeaderColumn dataFormat={this.actionsFormatter}>
                  Actions
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
