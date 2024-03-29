import React, { Component } from "react";
import { NavDropdown, MenuItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFemale } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import Check from "../components/Check";
import {
  fromInitialDate,
  endOfDay,
  dateFormatter,
  enumFormatter,
  getData,
  nameFormatter,
  getDistrict
} from "../utils/index";
// import context
import {GlobalContext} from '../context/GlobalState';

const Fuse = require("fuse.js");

export default class MappedGirls extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);

    this.state = {
      girls: [],
      girls_copy: [],
      isLoaded: false,
      loadingText: "Loading ..",
      status: "All",
      from: fromInitialDate,
      to: moment(endOfDay).local().format("YYYY-MM-DD"),
      showCoords: true,
      manageColomns: {
        dob: false,
        created_at: false,
        phone_number: false,
        village: true,
        vht: true,
        name: false,
        redeemed_service: true,
        trimester: true,
        next_of_kin_name: true,
        education_level: true,
        marital_status: true,
        last_menstruation_date: true,
        voucher_id: false,
        parish: true,
        subcounty: false,
        attended_anc_visits: true,
        using_family_planning: true,
        fever: true,
        bleeding_heavily: true,
        blurred_vision: true,
        swollen_feet: true,
        district:true,
        vht_phone:true
      },
      // remote pagination
      currentPage: 1,
      sizePerPage: 20,
      totalDataSize: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.search = this.search.bind(this);
    this.sortByAge = this.sortByAge.bind(this);
  }

  componentDidMount() {
    this.loadData();
    this.context.districtId?this.setState({manageColomns:{...this.state.manageColomns,district:true}}):this.setState({manageColomns:{...this.state.manageColomns,district:false}})
  }

  componentDidUpdate(){
    if(this.context.change){
      this.setState({isLoaded:false});
      this.loadData();
      this.context.contextChange(false);
      this.context.districtId?this.setState({manageColomns:{...this.state.manageColomns,district:true}}):this.setState({manageColomns:{...this.state.manageColomns,district:false}})
    }
  }

  loadData() {
    const thisApp = this;
    getData(
      {
        name: "mappedGirlsEncounter",
        from: this.context.dateFrom,
        to: this.context.dateTo,
        districtId: this.context.districtId
      },
      function (error, response) {
        if (error) {
          thisApp.setState({
            isLoaded: true,
          });
        } else {
          thisApp.setState({
            isLoaded: true,
            girls: response.results,
            girls_copy: response.results,
          });
        }
      }
    );
  }
  handleInputChange(event) {
    const thisApp = this;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
        isLoaded: false,
      },
      () => thisApp.loadData()
    );

    // update from date filter
    if(target.name === 'from' && target.type === 'date'){
      this.context.dateFromChange(target.value);
    }
    // update to date filter
    if(target.name === 'to' && target.type === 'date'){
      this.context.dateToChange(target.value);
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
  voucherId(cell, row) {
    return row.girl.voucher_number;
  }
  getService(cell, row) {
    return row.girl.services_received;
  }
  nextOfKinFormatter(cell, row) {
    return row.girl.next_of_kin_phone_number;
  }
  getPhone(cell, row) {
    return row.girl.phone_number;
  }
  getVHT(cell, row) {
    return `${row.user.first_name} ${row.user.last_name}`;
  }
  getVHTPhone(cell, row) {
    return row.user.phone;
  }
  getVillageItem(cell, row, item) {
    return row.girl.village[item];
  }
  getSubCountyItem(cell, row, item) {
    return (
      row.girl.village &&
      row.girl.village.parish &&
      row.girl.village.parish.sub_county &&
      row.girl.village.parish.sub_county[item]
    );
  }
  getParishItem(cell, row, item) {
    return row.girl.village.parish && row.girl.village.parish[item];
  }
  getGirlItem(cell, row, item) {
    let data = row.girl[item];
    if (item === "last_menstruation_date") {
      return moment(new Date(data)).format("Do MMM YY");
    } else {
      return data;
    }
  }
  ageFormatter(cell, row) {
    return row.girl.age + " Years";
  }
  search(event) {
    this.setState({ search: event.target.value });
    if (event.target.value.length <= 0) {
      this.setState({
        girls: this.state.girls_copy,
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
        ],
      };

      var fuse = new Fuse(this.state.girls_copy, options); // "list" is the item array
      var result = fuse.search(event.target.value);
      this.setState({
        girls: result,
      });
    }
  }
  familyPlanningFormatter(cell, row) {
    if (row.family_planning[0].using_family_planning) {
      return ("Yes, " + row.family_planning[0].method);
    } else {
      return ("None, " + row.family_planning[0].no_family_planning_reason);
    }
  }
  observationFormatter(cell, row, item) {
    let observation = row.observation[item];
    if (observation) {
      return "Yes";
    } else {
      return "No";
    }
  }

  sortByAge(a, b, order) {
    if (order === "desc") {
      return a.girl.age - b.girl.age;
    } else {
      return b.girl.age - a.girl.age;
    }
  }

  render() {
    const YesNoFormat = {
      true: "Yes",
      false: "No",
    };
    let girls = this.state.girls;
    const options = {
      page: 1, // which page you want to show as default
      // onPageChange: this.onPageChange,
      // onSortChange: this.sortByName,
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
        <div className="col-md-8 title">
          <h4>
            {" "}
            <span>
              <FontAwesomeIcon icon={faFemale} />
            </span>{" "}
            Mapped women
          </h4>
          <br />
        </div>
        <div className="col-md-12 bg-white-content">
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
            <div className="form-group">
              <label htmlFor="email">From:</label>
              <input
                name="from"
                value={this.context.dateFrom}
                onChange={this.handleInputChange}
                className="form-control"
                type="date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">To:</label>
              <input
                name="to"
                value={this.context.dateTo}
                onChange={this.handleInputChange}
                className="form-control"
                type="date"
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
                onClick={(e, phone_number) => this.updateTable("phone_number")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.phone_number} /> Phone
              </MenuItem>

              <MenuItem
                onClick={(e, village) => this.updateTable("village")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.village} /> Village
              </MenuItem>
              <MenuItem
                onClick={(e, district) => this.updateTable("district")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.district} /> District
              </MenuItem>
              <MenuItem
                onClick={(e, parish) => this.updateTable("parish")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.parish} /> Parish
              </MenuItem>
              <MenuItem
                onClick={(e, subcounty) => this.updateTable("subcounty")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.subcounty} /> Sub county
              </MenuItem>
              <MenuItem
                onClick={(e, vht) => this.updateTable("vht")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.vht} /> VHT
              </MenuItem>
              <MenuItem
                onClick={(e, vht_phone) => this.updateTable("vht_phone")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.vht_phone} /> VHT's-Phone
              </MenuItem>
             
              <MenuItem
                onClick={(e, trimester) => this.updateTable("trimester")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.trimester} /> Trimester
              </MenuItem>
              <MenuItem
                onClick={(e, next_of_kin_name) =>
                  this.updateTable("next_of_kin_name")
                }
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.next_of_kin_name} /> Next
                of kin
              </MenuItem>
              <MenuItem
                onClick={(e, education_level) =>
                  this.updateTable("education_level")
                }
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.education_level} />{" "}
                Education level
              </MenuItem>
              <MenuItem
                onClick={(e, marital_status) =>
                  this.updateTable("marital_status")
                }
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.marital_status} />{" "}
                Marital status
              </MenuItem>
              <MenuItem
                onClick={(e, last_menstruation_date) =>
                  this.updateTable("last_menstruation_date")
                }
                eventKey={3.1}
              >
                {" "}
                <Check
                  state={this.state.manageColomns.last_menstruation_date}
                />{" "}
                Last menstruation date
              </MenuItem>
              <MenuItem
                onClick={(e, dob) => this.updateTable("dob")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.dob} /> Age
              </MenuItem>
              <MenuItem
                onClick={(e, created_at) => this.updateTable("created_at")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.created_at} /> Date
                Mapped
              </MenuItem>
              <MenuItem
                onClick={(e, voucher_id) => this.updateTable("voucher_id")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.voucher_id} /> Voucher ID
              </MenuItem>

              <MenuItem
                onClick={(e, attended_anc_visits) =>
                  this.updateTable("attended_anc_visits")
                }
                eventKey={3.1}
              >
                {" "}
                <Check
                  state={this.state.manageColomns.attended_anc_visits}
                />{" "}
                Attended ANC visits
              </MenuItem>
              <MenuItem
                onClick={(e, using_family_planning) =>
                  this.updateTable("using_family_planning")
                }
                eventKey={3.1}
              >
                {" "}
                <Check
                  state={this.state.manageColomns.using_family_planning}
                />{" "}
                Family planning
              </MenuItem>

              <MenuItem
                onClick={(e, redeemed_service) =>
                  this.updateTable("redeemed_service")
                }
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.redeemed_service} />{" "}
                Redeemed Service
              </MenuItem>

              <MenuItem
                onClick={(e, fever) => this.updateTable("fever")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.fever} /> Has fever
              </MenuItem>
              <MenuItem
                onClick={(e, bleeding_heavily) =>
                  this.updateTable("bleeding_heavily")
                }
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.bleeding_heavily} /> Is
                bleeding heavily
              </MenuItem>
              <MenuItem
                onClick={(e, blurred_vision) =>
                  this.updateTable("blurred_vision")
                }
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.blurred_vision} /> Has
                blurred vision
              </MenuItem>
              <MenuItem
                onClick={(e, swollen_feet) => this.updateTable("swollen_feet")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.swollen_feet} /> Has
                swollen feet
              </MenuItem>
            </NavDropdown>
          </form>

          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable
                data={girls}
                striped
                hover
                csvFileName={
                  "Mapped_girls_" +
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
                  dataFormat={nameFormatter}
                  csvFormat={nameFormatter}
                  dataSort={true}
                  dataField="first_name"
                >
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  width='120px'
                  dataSort={true}
                  hidden={this.state.manageColomns.phone_number}
                  dataField="phone_number" 
                  dataFormat={this.getPhone}
                  csvFormat={this.getPhone}
                >
                  Phone
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.village}
                  dataFormat={(cell, row, item) =>
                    this.getVillageItem(cell, row, "name")
                  }
                  csvFormat={(cell, row, item) =>
                    this.getVillageItem(cell, row, "name")
                  }
                  dataField="village"
                >
                  Village
                </TableHeaderColumn>
                <TableHeaderColumn
                  width='120px'
                  hidden={this.state.manageColomns.district}
                  dataFormat={getDistrict}
                  csvFormat={getDistrict}
                  dataField="district"
                >
                  District
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.parish}
                  dataFormat={(cell, row, item) =>
                    this.getParishItem(cell, row, "name")
                  }
                  csvFormat={(cell, row, item) =>
                    this.getParishItem(cell, row, "name")
                  }
                  dataField="parish"
                >
                  Parish
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.subcounty}
                  dataFormat={(cell, row, item) =>
                    this.getSubCountyItem(cell, row, "name")
                  }
                  csvFormat={(cell, row, item) =>
                    this.getSubCountyItem(cell, row, "name")
                  }
                  dataField="subcounty"
                >
                  Sub county
                </TableHeaderColumn>

                <TableHeaderColumn
                  hidden={this.state.manageColomns.vht}
                  width="150px"
                  dataFormat={(cell, row, item) => this.getVHT(cell, row)}
                  csvFormat={(cell, row, item) => this.getVHT(cell, row)}
                  dataField="vht"
                >
                  VHT
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.vht_phone}
                  width="150px"
                  dataFormat={this.getVHTPhone}
                  csvFormat={this.getVHTPhone}
                  dataField="vht"
                >
                  VHT
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.trimester}
                  dataFormat={(cell, row, item) =>
                    this.getGirlItem(cell, row, "trimester")
                  }
                  csvFormat={(cell, row, item) =>
                    this.getGirlItem(cell, row, "trimester")
                  }
                  dataField="trimester"
                >
                  Trimester
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.next_of_kin_name}
                  dataFormat={this.nextOfKinFormatter}
                  csvFormat={this.nextOfKinFormatter}
                  dataField="next_of_kin_name"
                >
                  Next of Kin
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.education_level}
                  dataFormat={(cell, row, item) =>
                    this.getGirlItem(cell, row, "education_level")
                  }
                  csvFormat={(cell, row, item) =>
                    this.getGirlItem(cell, row, "education_level")
                  }
                  dataField="education_level"
                >
                  Education level
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.marital_status}
                  dataFormat={(cell, row, item) =>
                    this.getGirlItem(cell, row, "marital_status")
                  }
                  csvFormat={(cell, row, item) =>
                    this.getGirlItem(cell, row, "marital_status")
                  }
                  dataField="marital_status"
                >
                  Marital status
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.last_menstruation_date}
                  dataFormat={(cell, row, item) =>
                    this.getGirlItem(cell, row, "last_menstruation_date")
                  }
                  csvFormat={(cell, row, item) =>
                    this.getGirlItem(cell, row, "last_menstruation_date")
                  }
                  dataField="last_menstruation_date"
                >
                  Last menstruation date
                </TableHeaderColumn>

                <TableHeaderColumn
                  hidden={this.state.manageColomns.voucher_id}
                  dataFormat={this.voucherId}
                  csvFormat={this.voucherId}
                  dataField="voucher_number"
                >
                  Voucher ID
                </TableHeaderColumn>

                <TableHeaderColumn
                  hidden={this.state.manageColomns.redeemed_service}
                  dataFormat={(cell, row, item) => this.getService(cell, row)}
                  csvFormat={(cell, row, item) => this.getService(cell, row)}
                  dataField="services_recieved"
                >
                  Redeemed Service
                </TableHeaderColumn>

                <TableHeaderColumn
                  hidden={this.state.manageColomns.dob}
                  dataFormat={this.ageFormatter}
                  csvFormat={this.ageFormatter}
                  dataSort={true}
                  sortFunc={this.sortByAge}
                  dataField="dob"
                >
                  Age
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.created_at}
                  dataFormat={dateFormatter}
                  csvFormat={this.dateFormatter}
                  dataSort={true}
                  dataField="created_at"
                  isKey
                >
                  Date Mapped
                </TableHeaderColumn>

                <TableHeaderColumn
                  hidden={this.state.manageColomns.attended_anc_visits}
                  dataFormat={enumFormatter}
                  csvFormat={this.enumFormatter}
                  formatExtraData={YesNoFormat}
                  dataField="attended_anc_visit"
                >
                  Has attended ANC visits
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.using_family_planning}
                  dataFormat={this.familyPlanningFormatter}
                  csvFormat={this.familyPlanningFormatter}
                  dataField="using_family_planning"
                >
                  Family planning
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.fever}
                  dataFormat={(cell, row, item) =>
                    this.observationFormatter(cell, row, "fever")
                  }
                  dataField="fever"
                >
                  Has fever
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.bleeding_heavily}
                  dataFormat={(cell, row, item) =>
                    this.observationFormatter(cell, row, "bleeding_heavily")
                  }
                  csvFormat={(cell, row, item) =>
                    this.observationFormatter(cell, row, "bleeding_heavily")
                  }
                  dataField="bleeding_heavily"
                >
                  Bleeding heavily
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.blurred_vision}
                  dataFormat={(cell, row, item) =>
                    this.observationFormatter(cell, row, "blurred_vision")
                  }
                  csvFormat={(cell, row, item) =>
                    this.observationFormatter(cell, row, "blurred_vision")
                  }
                  dataField="blurred_vision"
                >
                  Blurred vision
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.swollen_feet}
                  dataFormat={(cell, row, item) =>
                    this.observationFormatter(cell, row, "swollen_feet")
                  }
                  csvFormat={(cell, row, item) =>
                    this.observationFormatter(cell, row, "swollen_feet")
                  }
                  dataField="swollen_feet"
                >
                  Has swollen feet
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
