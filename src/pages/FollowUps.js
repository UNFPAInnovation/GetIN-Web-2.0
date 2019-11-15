import React, { Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
const service = require('../api/services');
const Fuse = require("fuse.js");

let order = 'desc';
let startOFDay = new Date();
startOFDay.setHours(0, 0, 0, 0);

let prevMonthFirstDay = moment().subtract(1, 'months').date(1).local().format('YYYY-MM-DD');

// Setting end of day to the next day because of a bug in the backend that ommits todays dates data
// if the query is from=2019-10-01&to=todaysDate
// So setting the end date manually to the next day so todays data can be seen instantly once mapped.
let endOfDay = moment(new Date()).add(1,'days');

export default class FollowUps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      followUps: [],
      followUps_copy:[],
      search:null,
      isLoaded: false,
      loadingText:"Loading ..",
      status: "All",
      from: prevMonthFirstDay,
      to: moment(endOfDay).local().format('YYYY-MM-DD'),
      showCoords: true,
      manageColomns: {
        name:false,
        village:false,
        sub_county:true,
        trimester:false,
        next_of_kin:true,
        marital_status:true,
        last_menstruation_date:false,
        dob:true,
        education_level:true,
        followup_reason:false,
        action_taken:false,
        blurred_vision:true,
        bleeding_heavily:true,
        fever:true,
        swollen_feet:true,
        next_appointment:true,
        follow_date:false

      },
      // remote pagination
      currentPage: 1,
      sizePerPage: 20,
      totalDataSize: 0
    }
    this.getData = this.getData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
   this.getData();
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      isLoaded: false
    }, () =>
       this.getData()
    );
  }
  getData() {
      const thisApp = this;
      thisApp.setState({
        followUps: [],
        followUps_copy: [],
      loadingText:"Loading...",
    });
      service.followUps(this.state.from, this.state.to, function(error, response){
      console.log(response);
        if (error){
            console.log(error);
            thisApp.setState(
            {
              isLoaded: true,
              followUps:[],
              followUps_copy:response.results

            },
            () => console.log(thisApp.state)
          );
          }
          else{
            thisApp.setState(
            {
              isLoaded: true,
              followUps:response.results,
              followUps_copy:response.results
            },
            () => console.log(thisApp.state)
          );
          }
    });

  }
  nameFormatter(cell, row) {
    return row.girl.first_name+" "+row.girl.last_name+" - "+row.girl.phone_number;
  }

  trimesterFormatter(cell, row) {
    return row.girl.trimester;
  }
  nextOfKinFormatter(cell, row) {
    return row.girl.next_of_kin_phone_number;
  }
  getVillageItem(cell, row, item){
    return row.girl.village[item];

  }
  getGirlItem(cell, row, item){
      return row.girl[item];

  }
  getSubcountyItem(cell, row, item){
    return row.girl.village.parish.sub_county[item];
  }
  updateTable(colomn) {
    //make a copy of state
    let manageColomns = this.state.manageColomns;

    if (this.state.manageColomns[colomn] === true) {
      manageColomns[colomn] = false;
      this.setState({
        manageColomns: manageColomns
      })
    } else {
      manageColomns[colomn] = true;
      this.setState({
        manageColomns: manageColomns
      })
    }

  }
  ageFormatter(cell, row){
    return moment().diff(row.girl.dob, 'years')+" Years";
  }
  dateFormatter(cell){
    console.log(cell);
    return moment(new Date(cell)).format('Do MMM YY hh a');

  }
  enumFormatter(cell, row, enumObject) {
    return enumObject[cell];
  }
  search(event) {
    this.setState({ search: event.target.value });
    if (event.target.value.length <= 0) {
      this.setState({
        followUps: this.state.followUps_copy
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
          "user.phone",
          "health_facility",
          "follow_up_action_taken",
          "followup_reason"

        ]
      };

      var fuse = new Fuse(this.state.followUps_copy, options); // "list" is the item array
      var result = fuse.search(event.target.value);
      this.setState({
        followUps: result
      });
    }

  }



  render() {
    let followUps = this.state.followUps
    const YesNoFormat = {
      true: 'Yes',
      false: 'No'
    };
    const options = {
      page: 1,  // which page you want to show as default
        // onPageChange: this.onPageChange,
        // onSortChange: this.onSortChange,
        // onFilterChange: this.onFilterChange,
      //   sizePerPageList: xxx, // you can change the dropdown list for size per page
        sizePerPage: 20,  // which size per page you want to locate as default  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 10,
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      paginationPosition: 'bottom'  // default is bottom, top and both is all available
    };
    return (
        <div>
        <div className="col-md-8 title">
          <h4> <span><FontAwesomeIcon icon={faSync} /></span> Follow ups</h4>
          <br />
        </div>
        <div className="col-md-12 bg-white-content">
          <form className="form-inline pull-right">
            <div className="form-group">
                  <label htmlFor="email">Search:</label>
                  <input name="from" value={this.state.search} onChange={this.search} placeholder="Type something here" className="search form-control" type="text" />
                </div>
            <div className="form-group">
              <label htmlFor="email">From:</label>
              <input name="from" value={this.state.from} onChange={this.handleInputChange} className="form-control" type="date" />
            </div>
            <div className="form-group">
              <label htmlFor="email">To:</label>
              <input name="to" value={this.state.to} onChange={this.handleInputChange} className="form-control" type="date" />
            </div>
              <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">

                <MenuItem onClick={(e, name) => this.updateTable("name")} eventKey={3.1}> <Check state={this.state.manageColomns.name} /> Name</MenuItem>
                <MenuItem onClick={(e, village) => this.updateTable("village")} eventKey={3.1}> <Check state={this.state.manageColomns.village} /> Village</MenuItem>
                {/* <MenuItem onClick={(e, sub_county) => this.updateTable("sub_county")} eventKey={3.1}> <Check state={this.state.manageColomns.sub_county} /> Sub County</MenuItem>         */}
                <MenuItem onClick={(e, trimester) => this.updateTable("trimester")} eventKey={3.1}> <Check state={this.state.manageColomns.trimester} /> Trimester</MenuItem>
                <MenuItem onClick={(e, next_of_kin_name) => this.updateTable("next_of_kin")} eventKey={3.1}> <Check state={this.state.manageColomns.next_of_kin} /> Next of kin</MenuItem>
                <MenuItem onClick={(e, marital_status) => this.updateTable("marital_status")} eventKey={3.1}> <Check state={this.state.manageColomns.marital_status} /> Marital status</MenuItem>
                <MenuItem onClick={(e, last_menstruation_date) => this.updateTable("last_menstruation_date")} eventKey={3.1}> <Check state={this.state.manageColomns.last_menstruation_date} /> Last menstruation date</MenuItem>
                <MenuItem onClick={(e, education_level) => this.updateTable("education_level")} eventKey={3.1}> <Check state={this.state.manageColomns.education_level} /> Education level</MenuItem>
                <MenuItem onClick={(e, followup_reason) => this.updateTable("followup_reason")} eventKey={3.1}> <Check state={this.state.manageColomns.followup_reason} />Follow up reason</MenuItem>
                <MenuItem onClick={(e, name) => this.updateTable("dob")} eventKey={3.1}> <Check state={this.state.manageColomns.dob} /> Age</MenuItem>
                <MenuItem onClick={(e, action_taken) => this.updateTable("action_taken")} eventKey={3.1}> <Check state={this.state.manageColomns.action_taken} /> Action taken</MenuItem>
                <MenuItem onClick={(e, blurred_vision) => this.updateTable("blurred_vision")} eventKey={3.1}> <Check state={this.state.manageColomns.blurred_vision} /> Blurred vision</MenuItem>
                <MenuItem onClick={(e, bleeding_heavily) => this.updateTable("bleeding_heavily")} eventKey={3.1}> <Check state={this.state.manageColomns.bleeding_heavily} /> Bleeding heavily</MenuItem>
                <MenuItem onClick={(e, fever) => this.updateTable("fever")} eventKey={3.1}> <Check state={this.state.manageColomns.fever} /> Fever</MenuItem>
                <MenuItem onClick={(e, swollen_feet) => this.updateTable("swollen_feet")} eventKey={3.1}> <Check state={this.state.manageColomns.swollen_feet} /> Swollen feet</MenuItem>
                <MenuItem onClick={(e, next_appointment) => this.updateTable("next_appointment")} eventKey={3.1}> <Check state={this.state.manageColomns.next_appointment} /> Next Appointment</MenuItem>
                <MenuItem onClick={(e, follow_date) => this.updateTable("follow_date")} eventKey={3.1}> <Check state={this.state.manageColomns.follow_date} /> Follow up date</MenuItem>

              </NavDropdown>

          </form>



        <div className="padding-top content-container col-md-12">
          {this.state.isLoaded === true ? (
            <BootstrapTable data={followUps}
              striped
              hover
              ref='table'
              remote={false}
              headerContainerClass='table-header'
              tableContainerClass='table-responsive table-onScreen'
              // fetchInfo={{ dataTotalSize: this.state.totalDataSize }}
              pagination={true}
              options={options}
            //   exportCSV
              condensed
              pagination>

              <TableHeaderColumn width="220px" hidden={this.state.manageColomns.name} dataFormat ={this.nameFormatter} dataSort={true} dataField='first_name'>Name</TableHeaderColumn>
              <TableHeaderColumn hidden={true} dataSort={true} isKey dataField='id'>Phone number</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.village} dataFormat ={(cell, row, item)=>this.getVillageItem(cell, row, "name")} dataField='village'>Village</TableHeaderColumn>
              <TableHeaderColumn width="80px" hidden={this.state.manageColomns.trimester} dataFormat ={this.trimesterFormatter} dataField={"trimester"}>Trimester</TableHeaderColumn>

              <TableHeaderColumn hidden={this.state.manageColomns.next_of_kin} dataFormat ={this.nextOfKinFormatter} dataField='next_of_kin'>Next of Kin</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.marital_status} dataFormat ={(cell, row, item)=>this.getGirlItem(cell, row, "marital_status")} dataField='marital_status'>Marital status</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.education_level} dataFormat ={(cell, row, item)=>this.getGirlItem(cell, row, "education_level")} dataField='education_level'>Education level</TableHeaderColumn>

              <TableHeaderColumn hidden={this.state.manageColomns.followup_reason} dataField='followup_reason'>Follow up reason</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.follow_date} dataFormat={this.dateFormatter} dataField='created_at'>Follow up date</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.action_taken} dataField='follow_up_action_taken'>Action taken</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.blurred_vision} formatExtraData={ YesNoFormat }  dataFormat={ this.enumFormatter } dataField='blurred_vision'>Blurred vision</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.bleeding_heavily} formatExtraData={ YesNoFormat } dataFormat={ this.enumFormatter }  dataField='bleeding_heavily'>Bleeding heavily</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.fever} formatExtraData={ YesNoFormat }  dataFormat={ this.enumFormatter } dataField='fever'>Fever</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.swollen_feet} formatExtraData={ YesNoFormat } dataFormat={ this.enumFormatter } dataField='swollen_feet'>Swollen feet</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.next_appointment} dataFormat={this.dateFormatter} dataField='next_appointment'>Next Appointment</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.dob} dataFormat={this.ageFormatter} dataField='dob'>Age</TableHeaderColumn>
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


class Check extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <React.Fragment>
        <div className="checkboxWrapper">
          <div className="disabler"></div>
          {this.props.state === false ? (<input type="checkbox" checked={true} />) : (<input type="checkbox" checked={false} />)}
        </div>
      </React.Fragment>
    );
  }
}





