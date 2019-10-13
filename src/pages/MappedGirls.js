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
        date_of_registration: true,
      },
      // remote pagination
      currentPage: 1,
      sizePerPage: 20,
      totalDataSize: 0
    }
    this.getData = this.getData.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.updateTable = this.updateTable.bind(this);
    // this.onPageChange = this.onPageChange.bind(this);
    // this.onSortChange = this.onSortChange.bind(this);
    // this.onFilterChange = this.onFilterChange.bind(this);
  }
  componentDidMount() {
   this.getData();
  }
//   onPageChange(page, sizePerPage) {
//     console.log("Page:" + page + " sizePerPage " + sizePerPage);
//     const currentIndex = (page - 1) * sizePerPage;
//     this.getData("api/jobs?records=" + page + "&status=" + this.state.status + "&from=" + this.state.from + "&to=" + this.state.to + "&facility_type=" + this.state.facility_type + "&limit=" + sizePerPage)
//     this.setState({
//       currentPage: page,
//       isLoaded: false,
//       sizePerPage: sizePerPage
//     });
//   }

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
  


    
    
  
//   }
//   getJobsSummary(url = "api/jobs/summary") {
//     const thisApp = this;
//     let status;
//     var req = unirest("GET", addr + url);

//     req.headers({
//       "cache-control": "no-cache",
//       "authorization": token
//     });


//     req.end(function (res) {
//       if (res.error) console.log(res);

//       console.log(res.status);
//       if (res.status == 200) {
//         console.log(res.body);
//         thisApp.setState({
//           summary: res.body,
//           isLoaded: true,
//         }, () => console.log(thisApp.state));
//       }
//       else {
//         thisApp.setState({
//           isLoaded: true
//         });
//       }
//     });

//   }
//   timeConvert(cell, row) {
//     //console.log(row);

//     return cell && cell ? (moment(cell).format("DD/MM/YY h:mm:ss a")) : ("Date not available");
//   }

//   moneyConvert(cell, row) {
//     let amount = "UGX 0";
//     if (cell) {
//       amount = "UGX " + parseInt(cell).toLocaleString('en')
//     }
//     return amount;
//   }
//   statusFomatter(cell, row) {
//     let status;
//     switch (cell) {
//       case 0:
//         status = "Pending";
//         break;
//       case 1:
//         status = "Scheduled";
//         break;
//       case 2:
//         status = "In progress";
//         break;
//       case 3:
//         status = "Completed";
//         break;
//       default:
//         status = "Pending";
//     }

//     return status;
//   }

//   initiatedByFormatter(cell, row) {
//     let initiatedBy;
//     switch (cell) {
//       case "Driver":
//         initiatedBy = "Service provider";
//         break;
//       case "Admin":
//         initiatedBy = "KCCA Call center";
//         break;
//       default:
//         initiatedBy = "Service provider";
//     }

//     return initiatedBy;
//   }

//   enumFormatter(cell, row, enumObject) {
//     return enumObject[cell];
//   }


//   renderShowsTotal(start, to, total) {
//     return (
//       <p style={{ color: 'blue' }}>
//         From {start} to {to}, totals is {total}&nbsp;&nbsp;
//           </p>
//     );
//   }
//   onSortChange(sortName, sortOrder) {
//     console.log(sortName);
//     const x = this.state.jobs
//     if (sortOrder === 'asc') {
//       x.sort(function (a, b) {
//         console.log(JSON.stringify(a));
//         if (parseInt(a[sortName], 10) > parseInt(b[sortName], 10)) {
//           return 1;
//         } else if (parseInt(b[sortName], 10) > parseInt(a[sortName], 10)) {
//           return -1;
//         }
//         return 0;
//       });
//     } else {
//       x.sort(function (a, b) {
//         if (parseInt(a[sortName], 10) > parseInt(b[sortName], 10)) {
//           return -1;
//         } else if (parseInt(b[sortName], 10) > parseInt(a[sortName], 10)) {
//           return 1;
//         }
//         return 0;
//       });
//     }

//     this.setState({
//       jobs: x
//     });
//   }
//   handleBtnClick = () => {
//     if (order === 'desc') {
//       this.refs.table.handleSort('asc', 'name');
//       order = 'asc';
//     } else {
//       this.refs.table.handleSort('desc', 'name');
//       order = 'desc';
//     }
//   }
//   handleInputChange(event) {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;

//     this.setState({
//       [name]: value,
//       isLoaded: false
//     }, () =>
//         this.getData("api/jobs?records=" + this.state.currentPage + "&status=" + this.state.status + "&from=" + this.state.from + "&to=" + this.state.to + "&facility_type=" + this.state.facility_type + "&limit=" + this.state.sizePerPage)
//     );
//   }
//   updateTable(colomn) {
//     //make a copy of state
//     let manageColomns = this.state.manageColomns;

//     if (this.state.manageColomns[colomn] === true) {
//       manageColomns[colomn] = false;
//       this.setState({
//         manageColomns: manageColomns
//       })
//     } else {
//       manageColomns[colomn] = true;
//       this.setState({
//         manageColomns: manageColomns
//       })
//     }

//   }
//   onFilterChange(filterObj) {
//     console.log("On Filter Change");
//     this.setState({
//       jobs: this.state.jobs_copy
//     });
//     if (Object.keys(filterObj).length === 0) {
//       this.setState({
//         jobs: this.state.jobs_copy
//       });
//       return;
//     }
//     const thisApp = this;
//     const data = this.state.jobs.filter((jobs) => {
//       let valid = true;
//       let filterValue;
//       for (const key in filterObj) {
//         const targetValue = jobs[key];
//         switch (filterObj[key].type) {
//           case 'NumberFilter': {
//             filterValue = filterObj[key].value.number;
//             valid = thisApp.filterNumber(targetValue, filterValue, filterObj[key].value.comparator);
//             break;
//           }
//           default: {
//             filterValue = (typeof filterObj[key].value === 'string') ?
//               filterObj[key].value.toLowerCase() : filterObj[key].value;
//             valid = thisApp.filterText(targetValue, filterValue);
//             break;
//           }
//         }

//         if (!valid) {
//           break;
//         }
//       }
//       return valid;
//     });
//     this.setState({
//       jobs: data
//     });
//   }
//   filterNumber(targetVal, filterVal, comparator) {
//     let valid = true;
//     switch (comparator) {
//       case '=': {
//         if (targetVal !== filterVal) {
//           valid = false;
//         }
//         break;
//       }
//       case '>': {
//         if (targetVal <= filterVal) {
//           valid = false;
//         }
//         break;
//       }
//       case '<=': {
//         if (targetVal > filterVal) {
//           valid = false;
//         }
//         break;
//       }
//       default: {
//         console.error('Number comparator provided is not supported');
//         break;
//       }
//     }
//     return valid;
//   }

//   filterText(targetVal, filterVal) {
//     console.log(filterVal);
//     if (targetVal && targetVal.toString().toLowerCase().indexOf(filterVal) === -1) {
//       return false;
//     }

//     return true;
//   }
//   handleExportCSVButtonClick = () => {
//     const thisApp = this;
//     this.returnAlltheData(function(){
//       thisApp.refs.table.handleExportCSV();
//     });

//   }
//   createCustomExportCSVButton = (onClick) => {
//     return (
//       <ExportCSVButton
//         btnText='Export to CSV'
//         btnGlyphicon='glyphicon-download'
//         onClick={ () => this.handleExportCSVButtonClick() }/>
//     );
//   }

//   toNearest(number) {

//     switch (true) {
//       case number <= 10:
//         return 1;
//         break;
//       case number <= 10:
//         return number;
//         break;
//       case number <= 100:
//         return Math.ceil(number / 5) * 5;
//         break;
//       case number > 100 < 1000:
//         return Math.ceil(number / 50) * 50;
//         break;
//       case number >= 1000 < 10000:
//         return Math.ceil(number / 500) * 500;
//         break;
//       case number >= 1000:
//         return Math.ceil(number / 5000) * 5000;
//         break;
//       default:
//         console.log("D");
//         return 1;

//     }

//   }
  render() {
    let girls = this.state.girls
    // const statusType = {
    //   0: 'Pending',
    //   1: 'Scheduled',
    //   2: 'In progress',
    //   3: 'Completed'
    // };


   

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
          <h4> <FontAwesomeIcon icon={faFemale} /> Mapped girls</h4>
          <br />
        </div>
        <div className="col-md-12">
          <form className="form-inline pull-right">
            <div className="form-group">
              <label htmlFor="email">From:</label>
              <input name="from" value={this.state.from} onChange={this.handleInputChange} className="form-control" type="date" />
            </div>
            <div className="form-group">
              <label htmlFor="email">To:</label>
              <input name="to" value={this.state.to} onChange={this.handleInputChange} className="form-control" type="date" />
            </div>

            {/* <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">
              <MenuItem onClick={(e, full_name) => this.updateTable("full_name")} eventKey={3.1}> <Check state={this.state.manageColomns.full_name} /> Customer Name</MenuItem>
              <MenuItem onClick={(e, phone_number) => this.updateTable("phone_number")} eventKey={3.1}> <Check state={this.state.manageColomns.phone_number} /> Customer phone number</MenuItem>
              <MenuItem onClick={(e, location) => this.updateTable("location")} eventKey={3.1}><Check state={this.state.manageColomns.location} /> Customer location</MenuItem>
              <MenuItem onClick={(e, facility_type) => this.updateTable("facility_type")} eventKey={3.1}><Check state={this.state.manageColomns.facility_type} /> Facility type</MenuItem>
              <MenuItem onClick={(e, initiated_by) => this.updateTable("initiated_by")} eventKey={3.1}><Check state={this.state.manageColomns.initiated_by} /> Initiated by</MenuItem>
              <MenuItem onClick={(e, income_recieved) => this.updateTable("income_recieved")} eventKey={3.1}><Check state={this.state.manageColomns.income_recieved} /> Income received</MenuItem>
              <MenuItem onClick={(e, status) => this.updateTable("status")} eventKey={3.1}><Check state={this.state.manageColomns.status} /> Status</MenuItem>
              <MenuItem onClick={(e, service_provider) => this.updateTable("service_provider")} eventKey={3.1}><Check state={this.state.manageColomns.service_provider} />  Service provider</MenuItem>
              <MenuItem onClick={(e, service_provider_number) => this.updateTable("service_provider_number")} eventKey={3.1}><Check state={this.state.manageColomns.service_provider_number} /> Service provider number</MenuItem>
              <MenuItem onClick={(e, date_of_registration) => this.updateTable("date_of_registration")} eventKey={3.1}><Check state={this.state.manageColomns.date_of_registration} />  Start time</MenuItem>
              <MenuItem onClick={(e, finish_time) => this.updateTable("finish_time")} eventKey={3.1}><Check state={this.state.manageColomns.finish_time} /> Finish time</MenuItem>
              <MenuItem onClick={(e, start_point_long) => this.updateTable("start_point_long")} eventKey={3.1}><Check state={this.state.manageColomns.start_point_long} /> Start Point Longitudes</MenuItem>
              <MenuItem onClick={(e, start_point_lat) => this.updateTable("start_point_lat")} eventKey={3.1}><Check state={this.state.manageColomns.start_point_lat} /> Start Point Latitudes</MenuItem>

              <MenuItem onClick={(e, long) => this.updateTable("long")} eventKey={3.1}><Check state={this.state.manageColomns.long} /> Longitudes</MenuItem>
              <MenuItem onClick={(e, lat) => this.updateTable("lat")} eventKey={3.1}><Check state={this.state.manageColomns.lat} />  Latitudes</MenuItem>
              <MenuItem onClick={(e, division) => this.updateTable("division")} eventKey={3.1}><Check state={this.state.manageColomns.division} />  Division</MenuItem>
              <MenuItem onClick={(e, parish) => this.updateTable("parishes")} eventKey={3.1}><Check state={this.state.manageColomns.parish} />  Parishes</MenuItem>
              
            </NavDropdown> */}

          </form>

        </div>

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
              <TableHeaderColumn dataSort={true} isKey dataField='phone_number'>Phone number</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.first_name} dataSort={true} dataField='first_name'>First name</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.last_name} dataField='last_name'>Last name</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.village} dataField='village'>Village</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.trimester} dataField='trimester'>Trimester</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.next_of_kin_name} dataField='next_of_kin_name'>Next o Kin</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.education_level} dataField='education_level'>Education level</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.marital_status} dataField='marital_status'>Marital status</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.last_menstruation_date} dataField='last_menstruation_date'>Marital status</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.dob} dataField='dob'>Date of birth</TableHeaderColumn>
              {/* <TableHeaderColumn hidden={this.state.manageColomns.location} dataSort={true} filter={{ type: 'TextFilter', delay: 0 }} dataField='location'>Location</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.division} dataSort={true} filter={{ type: 'TextFilter', delay: 0 }} dataField='division'>Division</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.parish} dataSort={true} filter={{ type: 'TextFilter', delay: 0 }} dataField='parish'>Parish</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.facility_type} dataSort={true} dataField='facility_type'>Facility type</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.initiated_by} dataSort={true} csvFormat={this.initiatedByFormatter} dataFormat={this.initiatedByFormatter} dataField='initiated_by'>Initiated by</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.income_recieved} dataSort={true} dataField='income_received' dataFormat={this.moneyConvert} csvFormat={this.moneyConvert}>Amount Received</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.status} dataSort={true} dataField='status' dataFormat={this.statusFomatter} csvFormat={this.statusFomatter}>Status</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.service_provider} dataSort={true} filter={{ type: 'TextFilter', delay: 0 }} dataField='service_provider'>Service Provider Name</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.service_provider_number} dataSort={true} filter={{ type: 'TextFilter', delay: 0 }} dataField='service_provider_number'>Service provider number</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.date_of_registration} dataField='date_of_registration' csvFormat={this.timeConvert} dataFormat={this.timeConvert}>Start Time</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.finish_time} dataField='finish_time' csvFormat={this.timeConvert} dataFormat={this.timeConvert}>Finish Time</TableHeaderColumn> */}


              {/* <TableHeaderColumn hidden={this.state.manageColomns.start_point_long} dataField='start_point_long'>Start point Longitudes</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.start_point_lat} dataField='start_point_lat'>Start point Latitudes</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.long} dataField='long'>Longitudes</TableHeaderColumn>
              <TableHeaderColumn hidden={this.state.manageColomns.lat} dataField='lat'>Latitudes</TableHeaderColumn> */}
              


            </BootstrapTable>
          ) : (
              <span>Loading</span>
            )}
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





