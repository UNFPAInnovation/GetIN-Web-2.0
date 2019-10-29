import React, { Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFemale } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn, ExportCSVButton } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
const service = require('../api/services');

let order = 'desc';
let startOFDay = new Date();
startOFDay.setHours(0, 0, 0, 0);

let prevMonthFirstDay = moment().subtract(1, 'months').date(1).local().format('YYYY-MM-DD');

var endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

export default class MappedGirls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      girls: [],
      girls_copy:[],
      isLoaded: false,
      loadingText:"Loading ..",
      status: "All",
      from: prevMonthFirstDay,
      to: moment(endOfDay).local().format('YYYY-MM-DD'),
      showCoords: true,
      manageColomns: {
        dob: false,
        phone_number:false,
        village:true,
        name:false,
        trimester:false,
        next_of_kin_name:true,
        education_level:true,
        marital_status:false,
        last_menstruation_date:true
      },
      // remote pagination
      currentPage: 1,
      sizePerPage: 20,
      totalDataSize: 0
    }
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
   this.getData();
  }

  getData() {
      const thisApp = this;
      thisApp.setState({
      girls: [],
      girls_copy: [],
      loadingText:"Loading...",
    });
      service.mappedGirls(function(error, response){
      console.log(response);
        if (error){
            console.log(error);
            thisApp.setState(
            {
              isLoaded: true,
              girls:[]
            },
            () => console.log(thisApp.state)
          );
          }
          else{
            thisApp.setState(
            {
              isLoaded: true,
              girls:response.results
            },
            () => console.log(thisApp.state)
          );
          }
    });

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
  nextOfKinFormatter(cell, row) {
    return row.next_of_kin_first_name+" "+row.next_of_kin_last_name+" - "+row.next_of_kin_phone_number;
  }
  getVillageItem(cell, row, item){
    return row.village[item];
    
  }
  getGirlItem(cell, row, item){
    return row[item];
  
}

  render() {
    let girls = this.state.girls
    const options = {
      page: this.state.currentPage,  // which page you want to show as default
      onPageChange: this.onPageChange,
      onSortChange: this.onSortChange,
      onFilterChange: this.onFilterChange,
    //   sizePerPageList: xxx, // you can change the dropdown list for size per page
      sizePerPage: parseInt(this.state.sizePerPage),  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 10,
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      paginationPosition: 'bottom'  // default is bottom, top and both is all available
    };
    // let statusList = [
    //   { name: 'Pending', value: 0 },
    //   { name: 'Scheduled', value: 1 },
    //   { name: 'In progress', value: 2 },
    //   { name: 'Completed', value: 3 }
    // ];

    // let facilityTypeFilter = ft.map((item) =>
    //   <option value={item}>{item}</option>
    // );
    return (
        <div>
        <div className="col-md-8 title">
          <h4> <span><FontAwesomeIcon icon={faFemale} /></span> Mapped girls</h4>
          <br />
        </div>
        <div className="col-md-12 bg-white-content">
          <form className="form-inline pull-right">
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
              <MenuItem onClick={(e, phone_number) => this.updateTable("phone_number")} eventKey={3.1}> <Check state={this.state.manageColomns.phone_number} /> Phone number</MenuItem>        
              <MenuItem onClick={(e, village) => this.updateTable("village")} eventKey={3.1}> <Check state={this.state.manageColomns.village} /> Village</MenuItem>        
              <MenuItem onClick={(e, trimester) => this.updateTable("trimester")} eventKey={3.1}> <Check state={this.state.manageColomns.trimester} /> Trimester</MenuItem>        
              <MenuItem onClick={(e, next_of_kin_name) => this.updateTable("next_of_kin_name")} eventKey={3.1}> <Check state={this.state.manageColomns.next_of_kin_name} /> Next of kin</MenuItem>        
              <MenuItem onClick={(e, education_level) => this.updateTable("education_level")} eventKey={3.1}> <Check state={this.state.manageColomns.education_level} /> Education level</MenuItem>        
              <MenuItem onClick={(e, marital_status) => this.updateTable("marital_status")} eventKey={3.1}> <Check state={this.state.manageColomns.marital_status} /> Marital status</MenuItem>        
              <MenuItem onClick={(e, name) => this.updateTable("last_menstruation_date")} eventKey={3.1}> <Check state={this.state.manageColomns.last_menstruation_date} /> Last menstruation date</MenuItem>        
              <MenuItem onClick={(e, name) => this.updateTable("dob")} eventKey={3.1}> <Check state={this.state.manageColomns.dob} /> Date of birth</MenuItem>        
            </NavDropdown>

          </form>

       

        <div className="padding-top content-container col-md-12">
          {this.state.isLoaded === true ? (
            <BootstrapTable data={girls}
              striped
              hover
            //   csvFileName={'jobs_'+moment(Date.now()).local().format("YYYY_MM_DD_HHmmss")+".csv"}
              ref='table'
              remote={true}
              headerContainerClass='table-header'
              tableContainerClass='table-responsive table-onScreen'
              fetchInfo={{ dataTotalSize: this.state.totalDataSize }}
              pagination={true}
              options={options}
            //   exportCSV
              pagination>
              <TableHeaderColumn hidden={this.state.manageColomns.name} dataFormat ={this.nameFormatter} dataSort={true} dataField='first_name'>Name</TableHeaderColumn>
              <TableHeaderColumn dataSort={true} isKey dataField='phone_number'>Phone number</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.village}  dataFormat ={(cell, row, item)=>this.getVillageItem(cell, row, "name")} dataField='village'>Village</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.trimester} dataField='trimester'>Trimester</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.next_of_kin_name} dataFormat ={this.nextOfKinFormatter} dataField='next_of_kin_name'>Next of Kin</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.education_level} dataField='education_level'>Education level</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.marital_status} dataField='marital_status'>Marital status</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.last_menstruation_date} dataField='last_menstruation_date'>Marital status</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.dob} dataField='dob'>Date of birth</TableHeaderColumn>           


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





