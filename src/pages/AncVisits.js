import React, { Component } from 'react';
import { NavDropdown, MenuItem,DropdownButton, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import {Tabs, Tab} from 'react-bootstrap';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn, ExportCSVButton } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
const alertifyjs = require('alertifyjs');
const Fuse = require("fuse.js");
const service = require('../api/services');

let order = 'desc';
let startOFDay = new Date();
startOFDay.setHours(0, 0, 0, 0);

let prevMonthFirstDay = moment().subtract(1, 'months').date(1).local().format('YYYY-MM-DD');

var endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);
export default class AncVisits extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        key: 'missedAppointments',
      };
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
    handleClose(modal) {
        this.setState({ [modal]: false });
      }
    
      handleShow(modal) {
        this.setState({ [modal]: true });
      }

    componentDidMount(){
      //this.getChews();
    }
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
     
    render() {
      return (
        <React.Fragment>
      
          <div className="col-md-12">
          <div className="col-md-12 title">
              <h4 className="pull-left"> <span><FontAwesomeIcon icon={faStethoscope} /></span> ANC Visits</h4>
              <br className="clear-both"/>
              <br className="clear-both"/>
            </div>
            <div className="col-md-12 bg-white-content">
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="missedAppointments" title="Missed Appointments">
            <MissedAppointments />
          </Tab>
          <Tab eventKey="expectedAppointments" title="Expected Appointments">
          <ExpectedAppointments/>
          </Tab>
          <Tab eventKey="attendedAppointments" title="Attended Appointments">
          <AttendedAppointments />
          </Tab>
          <Tab eventKey="completedAppointments" title="Completed Appointments">
          <CompletedAppointments />
          </Tab>
        </Tabs>
        </div>
        </div>
        </React.Fragment>
      );
    }
  }

  
  class MissedAppointments extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            appointments: [],
            appointments_copy:[],
            isLoaded: true,
            loadingText:"Loading ..",
            status: "Missed",
            from: prevMonthFirstDay,
            to: moment(endOfDay).local().format('YYYY-MM-DD'),
            showCoords: true,
            search:null,
            manageColomns: {
              name:false,
              vht:true,
              health_facility:true,
              trimester:false,
              missed_appointments:false,
              date:false
            },
            // remote pagination
            currentPage: 1,
            sizePerPage: 20,
            totalDataSize: 0
          }
        this.getData = this.getData.bind(this);
        this.updateTable = this.updateTable.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.search = this.search.bind(this);
      }
      componentDidMount() {
        this.getData();
      }
   
      getData() {
          const thisApp = this;
          thisApp.setState({
          appointments: [],
          appointments_copy: [],
          loadingText:"Loading...",
          isLoaded: false
                });
          service.Appointments(this.state.status, this.state.from, this.state.to, function(error, response){
          console.log(response);
            if (error){
                console.log(error);
                thisApp.setState(
                {
                  isLoaded: true,
                  appointments:[],
                  appointments_copy:[]
                },
                () => console.log(thisApp.state)
              );
              }
              else{
                thisApp.setState(
                {
                  isLoaded: true,
                  appointments:response.results,
                  appointments_copy:response.results
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

  

      nameFormatter(cell, row) {
        return row.girl.first_name+" "+row.girl.last_name+" - "+row.girl.phone_number;
      }
      chewFormatter(cell, row) {
        return row.user.first_name+" "+row.user.last_name+" - "+row.user.phone;
      }
      trimesterFormatter(cell, row) {
        return row.girl.trimester;
      }
      dateFormatter(cell){
        console.log(cell);
        return moment(new Date(cell)).format('Do MMM YY hh a');
       
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
              "user.phone",
              "next_appointment",
              "status",
              "completed_visits",
              "pending_visits",
              "health_facility"
            ]
          };

          var fuse = new Fuse(this.state.appointments_copy, options); // "list" is the item array
          var result = fuse.search(event.target.value);
          this.setState({
            appointments: result
          });
        }
    
      }

      render() {
        let data_table = this.state.appointments;

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
            <div className="col-md-12">
            <br className="clear-both"/>
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
                  <MenuItem onClick={(e, vht) => this.updateTable("vht")} eventKey={3.1}> <Check state={this.state.manageColomns.vht} /> Chew</MenuItem>             
                  <MenuItem onClick={(e, health_facility) => this.updateTable("health_facility")} eventKey={3.1}> <Check state={this.state.manageColomns.health_facility} /> Health Facility</MenuItem>             
                  <MenuItem onClick={(e, trimester) => this.updateTable("trimester")} eventKey={3.1}> <Check state={this.state.manageColomns.trimester} /> Trimester</MenuItem>             
                  {/* <MenuItem onClick={(e, missed_appointments) => this.updateTable("missed_appointments")} eventKey={3.1}> <Check state={this.state.manageColomns.missed_appointments} /> Missed Appointments</MenuItem>              */}
                  <MenuItem onClick={(e, date) => this.updateTable("date")} eventKey={3.1}> <Check state={this.state.manageColomns.date} /> Date</MenuItem>             
                </NavDropdown>
    
              </form>
            <div className="padding-top content-container col-md-12">
              {this.state.isLoaded === true ? (
                <BootstrapTable data={data_table}
                  striped
                  hover
                //   csvFileName={'jobs_'+moment(Date.now()).local().format("YYYY_MM_DD_HHmmss")+".csv"}
                  ref='table'
                  remote={false}
                  headerContainerClass='table-header'
                  tableContainerClass='table-responsive table-onScreen'
                  // fetchInfo={{ dataTotalSize: this.state.totalDataSize }}
                  pagination={true}
                  options={options}
                //   exportCSV
                  pagination>
                  <TableHeaderColumn isKey={true} hidden={true} dataSort={true} dataField='id'>#</TableHeaderColumn>
                  <TableHeaderColumn width="300px" hidden={this.state.manageColomns.name} dataSort={true} dataFormat={this.nameFormatter} dataField='name'>Name</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.vht} dataSort={true} dataFormat={this.chewFormatter}  dataField='vht'>Chew</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.health_facility} dataSort={true} dataField='health_facility'>Health Facility</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.trimester} dataSort={true} dataFormat={this.trimesterFormatter} dataField='trimester'>Trimester</TableHeaderColumn>
                  {/* <TableHeaderColumn hidden={this.state.manageColomns.missed_appointments} dataSort={true} dataField='missed_appointments'>Missed Appointments</TableHeaderColumn> */}
                  <TableHeaderColumn hidden={this.state.manageColomns.data} dataSort={true} dataFormat={this.dateFormatter} dataField='date'>Date</TableHeaderColumn>
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


  class ExpectedAppointments extends Component {
    constructor(props) {
      super(props);
      this.state = {
          appointments: [],
          appointments_copy:[],
          isLoaded: true,
          loadingText:"Loading ..",
          status: "Expected",
          from: prevMonthFirstDay,
          to: moment(endOfDay).local().format('YYYY-MM-DD'),
          showCoords: true,
          search:null,
          manageColomns: {
            name:false,
            vht:true,
            health_facility:true,
            trimester:false,
            remaining_visits:false,
            date:false
          },
          // remote pagination
          currentPage: 1,
          sizePerPage: 20,
          totalDataSize: 0
        }
      this.getData = this.getData.bind(this);
      this.updateTable = this.updateTable.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.search = this.search.bind(this);
    }
    componentDidMount() {
     this.getData();
    }
 
    getData() {
      const thisApp = this;
      thisApp.setState({
      appointments: [],
      appointments_copy: [],
      loadingText:"Loading...",
      isLoaded: false
            });
      service.Appointments(this.state.status, this.state.from, this.state.to, function(error, response){
      console.log(response);
        if (error){
            console.log(error);
            thisApp.setState(
            {
              isLoaded: true,
              appointments:[],
                  appointments_copy:[]
            },
            () => console.log(thisApp.state)
          );
          }
          else{
            thisApp.setState(
            {
              isLoaded: true,
              appointments:response.results,
              appointments_copy:response.results
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
    nameFormatter(cell, row) {
      return row.girl.first_name+" "+row.girl.last_name+" - "+row.girl.phone_number;
    }
    remainingVisitsFormatter(cell, row) {
      return row.girl.pending_visits;
    }
    chewFormatter(cell, row) {
      return row.user.first_name+" "+row.user.last_name+" - "+row.user.phone;
    }
    trimesterFormatter(cell, row) {
      return row.girl.trimester;
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
    dateFormatter(cell){
      console.log(cell);
      return moment(new Date(cell)).format('Do MMM YY hh a');
     
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
            "user.phone",
            "health_facility"
          ]
        };

        var fuse = new Fuse(this.state.appointments_copy, options); // "list" is the item array
        var result = fuse.search(event.target.value);
        this.setState({
          appointments: result
        });
      }
  
    }

    render() {
      let data_table =this.state.appointments

  
     
  
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
          <div className="col-md-12">
          <br className="clear-both"/>
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
                <MenuItem onClick={(e, vht) => this.updateTable("vht")} eventKey={3.1}> <Check state={this.state.manageColomns.vht} /> Chew</MenuItem>             
                <MenuItem onClick={(e, health_facility) => this.updateTable("health_facility")} eventKey={3.1}> <Check state={this.state.manageColomns.health_facility} /> Health Facility</MenuItem>             
                <MenuItem onClick={(e, trimester) => this.updateTable("trimester")} eventKey={3.1}> <Check state={this.state.manageColomns.trimester} /> Trimester</MenuItem>             
                <MenuItem onClick={(e, remaining_visits) => this.updateTable("remaining_visits")} eventKey={3.1}> <Check state={this.state.manageColomns.remaining_visits} /> Remaining Visits</MenuItem>             
                <MenuItem onClick={(e, date) => this.updateTable("date")} eventKey={3.1}> <Check state={this.state.manageColomns.date} /> Date</MenuItem>             
              </NavDropdown>
  
            </form>
          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable data={data_table}
                striped
                hover
              //   csvFileName={'jobs_'+moment(Date.now()).local().format("YYYY_MM_DD_HHmmss")+".csv"}
                ref='table'
                remote={false}
                headerContainerClass='table-header'
                tableContainerClass='table-responsive table-onScreen'
                fetchInfo={{ dataTotalSize: data_table.length }}
                pagination={true}
                options={options}
              //   exportCSV
                pagination>
                <TableHeaderColumn isKey={true} hidden={true} dataSort={true} dataField='id'>#</TableHeaderColumn>
                <TableHeaderColumn width="300px" hidden={this.state.manageColomns.name} dataSort={true} dataFormat={this.nameFormatter} dataField='name'>Name</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.vht} dataSort={true} dataFormat={this.chewFormatter}  dataField='vht'>Chew</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.health_facility} dataSort={true} dataField='health_facility'>Health Facility</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.trimester} dataSort={true} dataFormat={this.trimesterFormatter} dataField='trimester'>Trimester</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.remaining_visits} dataSort={true} dataFormat={this.remainingVisitsFormatter} dataField='pending_visits'>Remaining Visits</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.date} dataSort={true} dataFormat={this.dateFormatter} dataField='date'>Date</TableHeaderColumn>
  
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

  class AttendedAppointments extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          appointments: [],
          appointments_copy:[],
          isLoaded: true,
          loadingText:"Loading ..",
          status: "Attended",
          search:null,
          from: prevMonthFirstDay,
          to: moment(endOfDay).local().format('YYYY-MM-DD'),
          showCoords: true,
          manageColomns: {
            name:false,
            vht:true,
            health_facility:true,
            trimester:false,
            attended_appointments:true,
            date:false
          },
          // remote pagination
          currentPage: 1,
          sizePerPage: 20,
          totalDataSize: 0
        }
      this.getData = this.getData.bind(this);
      this.updateTable = this.updateTable.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.search = this.search.bind(this);
    }
    componentDidMount() {
      this.getData();
    }
 
    getData() {
        const thisApp = this;
        thisApp.setState({
        appointments: [],
        appointments_copy: [],
        loadingText:"Loading...",
        isLoaded: false
              });
        service.Appointments(this.state.status, this.state.from, this.state.to, function(error, response){
        console.log(response);
          if (error){
              console.log(error);
              thisApp.setState(
              {
                isLoaded: true,
                appointments:[],
                appointments_copy: []
              },
              () => console.log(thisApp.state)
            );
            }
            else{
              thisApp.setState(
              {
                isLoaded: true,
                appointments:response.results,
                appointments_copy:response.results
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
  

    nameFormatter(cell, row) {
      return row.girl.first_name+" "+row.girl.last_name+" - "+row.girl.phone_number;
    }
    chewFormatter(cell, row) {
      return row.user.first_name+" "+row.user.last_name+" - "+row.user.phone;
    }
    trimesterFormatter(cell, row) {
      return row.girl.trimester;
    }
    dateFormatter(cell){
      console.log(cell);
      return moment(new Date(cell)).format('Do MMM YY hh a');
     
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
            "user.phone",
            "next_appointment",
            "status",
            "completed_visits",
            "pending_visits",
            "health_facility"
          ]
        };

        var fuse = new Fuse(this.state.appointments_copy, options); // "list" is the item array
        var result = fuse.search(event.target.value);
        this.setState({
          appointments: result
        });
      }
  
    }

    render() {
      let data_table =this.state.appointments;    
  
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
          <div className="col-md-12">
          <br className="clear-both"/>
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
                <MenuItem onClick={(e, vht) => this.updateTable("vht")} eventKey={3.1}> <Check state={this.state.manageColomns.vht} /> Chew</MenuItem>             
                <MenuItem onClick={(e, health_facility) => this.updateTable("health_facility")} eventKey={3.1}> <Check state={this.state.manageColomns.health_facility} /> Health Facility</MenuItem>             
                <MenuItem onClick={(e, trimester) => this.updateTable("trimester")} eventKey={3.1}> <Check state={this.state.manageColomns.trimester} /> Trimester</MenuItem>             
                <MenuItem onClick={(e, attended_appointments) => this.updateTable("attended_appointments")} eventKey={3.1}> <Check state={this.state.manageColomns.attended_appointments} /> Attended Appointments</MenuItem>             
                <MenuItem onClick={(e, date) => this.updateTable("date")} eventKey={3.1}> <Check state={this.state.manageColomns.date} /> Date</MenuItem>             
              </NavDropdown>
  
            </form>
          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable data={data_table}
                striped
                hover
              //   csvFileName={'jobs_'+moment(Date.now()).local().format("YYYY_MM_DD_HHmmss")+".csv"}
                ref='table'
                remote={false}
                headerContainerClass='table-header'
                tableContainerClass='table-responsive table-onScreen'
                // fetchInfo={{ dataTotalSize: this.state.totalDataSize }}
                pagination={true}
                options={options}
              //   exportCSV
                pagination>
                <TableHeaderColumn isKey={true} hidden={true} dataSort={true} dataField='id'>#</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.name} dataSort={true} dataFormat={this.nameFormatter} dataField='name'>Name</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.vht} dataSort={true} dataFormat={this.chewFormatter}  dataField='vht'>Chew</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.health_facility} dataSort={true} dataField='health_facility'>Health Facility</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.trimester} dataSort={true} dataFormat={this.trimesterFormatter} dataField='trimester'>Trimester</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.attended_appointments} dataSort={true} dataField='attended_appointments'>Attended Appointments</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.date} dataFormat={this.dateFormatter} dataSort={true} dataField='date'>Date</TableHeaderColumn>
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

  class CompletedAppointments extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          appointments: [],
          appointments_copy:[],
          isLoaded: true,
          loadingText:"Loading ..",
          status: "Completed",
          from: prevMonthFirstDay,
          to: moment(endOfDay).local().format('YYYY-MM-DD'),
          showCoords: true,
          search:null,
          manageColomns: {
            name:false,
            vht:true,
            health_facility:true,
            trimester:false,
            date:false,
          },
          // remote pagination
          currentPage: 1,
          sizePerPage: 20,
          totalDataSize: 0
        }
      this.getData = this.getData.bind(this);
      this.updateTable = this.updateTable.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.search = this.search.bind(this);
    }
    componentDidMount() {
     this.getData();
    }
 
    getData() {
      const thisApp = this;
      thisApp.setState({
      appointments: [],
      appointments_copy: [],
      loadingText:"Loading...",
      isLoaded: false
            });
      service.Appointments(this.state.status, this.state.from, this.state.to, function(error, response){
      console.log(response);
        if (error){
            console.log(error);
            thisApp.setState(
            {
              isLoaded: true,
              appointments:[]
            },
            () => console.log(thisApp.state)
          );
          }
          else{
            thisApp.setState(
            {
              isLoaded: true,
              appointments:response.results,
              appointments_copy:response.results
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
  

    nameFormatter(cell, row) {
      return row.girl.first_name+" "+row.girl.last_name+" - "+row.girl.phone_number;
    }
    chewFormatter(cell, row) {
      return row.user.first_name+" "+row.user.last_name+" - "+row.user.phone;
    }
    trimesterFormatter(cell, row) {
      return row.girl.trimester;
    }
    dateFormatter(cell){
      console.log(cell);
      return moment(new Date(cell)).format('Do MMM YY hh a');
     
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
            "user.phone",
            "health_facility"
          ]
        };

        var fuse = new Fuse(this.state.appointments_copy, options); // "list" is the item array
        var result = fuse.search(event.target.value);
        this.setState({
          appointments: result
        });
      }
  
    }

    render() {
      let data_table =this.state.appointments;
  
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
          <div className="col-md-12">
          <br className="clear-both"/>
            <form className="form-inline pull-right">
              <div className="form-group">
                  <label htmlFor="email">Search:</label>
                  <input name="from" value={this.state.search} onChange={this.search} placeholder="Type something here" className="search form-control" type="text" />
                </div><div className="form-group">
              
                <label htmlFor="email">From:</label>
                <input name="from" value={this.state.from} onChange={this.handleInputChange} className="form-control" type="date" />
              </div>
              <div className="form-group">
                <label htmlFor="email">To:</label>
                <input name="to" value={this.state.to} onChange={this.handleInputChange} className="form-control" type="date" />
              </div>

              <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">
                <MenuItem onClick={(e, name) => this.updateTable("name")} eventKey={3.1}> <Check state={this.state.manageColomns.name} /> Name</MenuItem>             
                <MenuItem onClick={(e, vht) => this.updateTable("vht")} eventKey={3.1}> <Check state={this.state.manageColomns.vht} /> Chew</MenuItem>             
                <MenuItem onClick={(e, health_facility) => this.updateTable("health_facility")} eventKey={3.1}> <Check state={this.state.manageColomns.health_facility} /> Health Facility</MenuItem>             
                <MenuItem onClick={(e, trimester) => this.updateTable("trimester")} eventKey={3.1}> <Check state={this.state.manageColomns.trimester} /> Trimester</MenuItem>             
                <MenuItem onClick={(e, date) => this.updateTable("date")} eventKey={3.1}> <Check state={this.state.manageColomns.date} /> Date</MenuItem>                         
              </NavDropdown>
  
            </form>
          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable data={data_table}
                striped
                hover
              //   csvFileName={'jobs_'+moment(Date.now()).local().format("YYYY_MM_DD_HHmmss")+".csv"}
                ref='table'
                remote={false}
                headerContainerClass='table-header'
                tableContainerClass='table-responsive table-onScreen'
                // fetchInfo={{ dataTotalSize: this.state.totalDataSize }}
                pagination={true}
                options={options}
              //   exportCSV
                pagination>
                <TableHeaderColumn isKey={true} hidden={true} dataSort={true} dataField='id'>#</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.name} dataSort={true} dataFormat={this.nameFormatter} dataField='name'>Name</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.vht} dataSort={true} dataFormat={this.chewFormatter}  dataField='vht'>Chew</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.health_facility} dataSort={true} dataField='health_facility'>Health Facility</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.trimester} dataSort={true} dataFormat={this.trimesterFormatter} dataField='trimester'>Trimester</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.date} dataSort={true} dataField='date'>Date</TableHeaderColumn>
  
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









