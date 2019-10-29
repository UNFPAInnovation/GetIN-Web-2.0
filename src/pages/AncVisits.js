import React, { Component } from 'react';
import { NavDropdown, MenuItem,DropdownButton, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import {Tabs, Tab} from 'react-bootstrap';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn, ExportCSVButton } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
const alertifyjs = require('alertifyjs');
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
            status: "All",
            from: prevMonthFirstDay,
            to: moment(endOfDay).local().format('YYYY-MM-DD'),
            showCoords: true,
            manageColomns: {
              name:false,
              vht:false,
              health_facility:false,
              trimester:false,
              missed_appointments:false,
              recently_missed_appointment:false
            },
            // remote pagination
            currentPage: 1,
            sizePerPage: 20,
            totalDataSize: 0
          }
        this.getData = this.getData.bind(this);
        this.updateTable = this.updateTable.bind(this);
      }
      componentDidMount() {
      // this.getData();
      }
   
      getData() {
          const thisApp = this;
          thisApp.setState({
          appointments: [],
          appointments_copy: [],
          loadingText:"Loading...",
        });
          service.usersChew(function(error, response){
          console.log(response);
            if (error){
                console.log(error);
                thisApp.setState(
                {
                  isLoaded: true,
                  chews:[]
                },
                () => console.log(thisApp.state)
              );
              }
              else{
                thisApp.setState(
                {
                  isLoaded: true,
                  chews:response.results
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
        return row.first_name+" "+row.last_name;
      }
      render() {
        let data_table =[
            {
              "id": "5db6f3847c012cbaf8991a07",
              "name": "Felecia Briggs (904) 552-2477",
              "vht": "Carmela (882) 594-3300",
              "health_facility": "Hinsdale",
              "trimester": 3,
              "missed_appointments": 3,
              "recently_missed_appointment": "2019-10-02"
            },
            {
              "id": "5db6f384bccc9f18b441f579",
              "name": "Shawna Dunlap (916) 497-2908",
              "vht": "Holmes (974) 551-3074",
              "health_facility": "Kenwood",
              "trimester": 1,
              "missed_appointments": 1,
              "recently_missed_appointment": "2019-07-23"
            },
            {
              "id": "5db6f384fe54ae9cfdf2a50d",
              "name": "Nixon Roth (892) 555-2852",
              "vht": "Nora (897) 580-3443",
              "health_facility": "Churchill",
              "trimester": 1,
              "missed_appointments": 1,
              "recently_missed_appointment": "2019-10-11"
            },
            {
              "id": "5db6f3845d8c53f99a29cea1",
              "name": "Paige Salazar (803) 518-2895",
              "vht": "Montoya (867) 578-2655",
              "health_facility": "Shelby",
              "trimester": 2,
              "missed_appointments": 2,
              "recently_missed_appointment": "2019-07-23"
            },
            {
              "id": "5db6f384483cbb8d44fa6aaa",
              "name": "Lamb Knox (816) 476-2303",
              "vht": "Joanne (885) 502-3427",
              "health_facility": "Celeryville",
              "trimester": 2,
              "missed_appointments": 3,
              "recently_missed_appointment": "2019-01-19"
            },
            {
              "id": "5db6f384cf7103d0e3f670d7",
              "name": "Wolfe Alston (952) 465-2277",
              "vht": "Florine (911) 547-3324",
              "health_facility": "Clara",
              "trimester": 3,
              "missed_appointments": 2,
              "recently_missed_appointment": "2019-07-08"
            },
            {
              "id": "5db6f3841c2cca3ba07adda6",
              "name": "Hewitt Joseph (849) 476-3216",
              "vht": "Mayo (891) 529-3348",
              "health_facility": "Kaka",
              "trimester": 1,
              "missed_appointments": 3,
              "recently_missed_appointment": "2019-06-22"
            }
          
        ];
  
    
       
    
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

        return (
            <div>
            <div className="col-md-12">
            <br className="clear-both"/>
              <form className="form-inline pull-right">
                <div className="form-group">
                  <label htmlFor="email">From:</label>
                  <input name="from" value={this.state.from} onChange={this.handleInputChange} className="form-control" type="date" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">To:</label>
                  <input name="to" value={this.state.to} onChange={this.handleInputChange} className="form-control" type="date" />
                </div>
            {/*

              name:false,
              vht:false,
              health_facility:false,
              trimester:false,
              missed_appointments:false,
              recently_missed_appointments:false

            */}
                <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">
                  <MenuItem onClick={(e, name) => this.updateTable("name")} eventKey={3.1}> <Check state={this.state.manageColomns.name} /> Name</MenuItem>             
                  <MenuItem onClick={(e, vht) => this.updateTable("vht")} eventKey={3.1}> <Check state={this.state.manageColomns.vht} /> Chew</MenuItem>             
                  <MenuItem onClick={(e, health_facility) => this.updateTable("health_facility")} eventKey={3.1}> <Check state={this.state.manageColomns.health_facility} /> Health Facility</MenuItem>             
                  <MenuItem onClick={(e, trimester) => this.updateTable("trimester")} eventKey={3.1}> <Check state={this.state.manageColomns.trimester} /> Trimester</MenuItem>             
                  <MenuItem onClick={(e, missed_appointments) => this.updateTable("missed_appointments")} eventKey={3.1}> <Check state={this.state.manageColomns.missed_appointments} /> Missed Appointments</MenuItem>             
                  <MenuItem onClick={(e, recently_missed_appointment) => this.updateTable("recently_missed_appointment")} eventKey={3.1}> <Check state={this.state.manageColomns.recently_missed_appointment} /> Recently Missed Appointment</MenuItem>             
                </NavDropdown>
    
              </form>
            <div className="padding-top content-container col-md-12">
              {this.state.isLoaded === true ? (
                <BootstrapTable data={data_table}
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
                  <TableHeaderColumn isKey={true} hidden={true} dataSort={true} dataField='id'>#</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.name} dataSort={true} dataField='name'>Name</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.vht} dataSort={true} dataField='vht'>Chew</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.health_facility} dataSort={true} dataField='health_facility'>Health Facility</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.trimester} dataSort={true} dataField='trimester'>Trimester</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.missed_appointments} dataSort={true} dataField='missed_appointments'>Missed Appointments</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.recently_missed_appointment} dataSort={true} dataField='recently_missed_appointment'>Recently Missed Appointment</TableHeaderColumn>
    
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
          status: "All",
          from: prevMonthFirstDay,
          to: moment(endOfDay).local().format('YYYY-MM-DD'),
          showCoords: true,
          manageColomns: {
            name:false,
            vht:false,
            health_facility:false,
            trimester:false,
            remaining_visits:false,
            next_appointment:false
          },
          // remote pagination
          currentPage: 1,
          sizePerPage: 20,
          totalDataSize: 0
        }
      this.getData = this.getData.bind(this);
      this.updateTable = this.updateTable.bind(this);
    }
    componentDidMount() {
    // this.getData();
    }
 
    getData() {
        const thisApp = this;
        thisApp.setState({
        appointments: [],
        appointments_copy: [],
        loadingText:"Loading...",
      });
        service.usersChew(function(error, response){
        console.log(response);
          if (error){
              console.log(error);
              thisApp.setState(
              {
                isLoaded: true,
                chews:[]
              },
              () => console.log(thisApp.state)
            );
            }
            else{
              thisApp.setState(
              {
                isLoaded: true,
                chews:response.results
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
      return row.first_name+" "+row.last_name;
    }
    render() {
      let data_table =[
        {
          "id": "5db6f7b4c3c393ec7eca4d2c",
          "name": "Jennie Douglas (835) 479-2562",
          "vht": "Lidia (807) 475-3631",
          "health_facility": "Guthrie",
          "trimester": 2,
          "remaining_visits": 2,
          "next_appointment": "2019-11-04"
        },
        {
          "id": "5db6f7b455480f037b21cf28",
          "name": "Wong Burt (957) 542-2775",
          "vht": "Hodges (980) 423-3692",
          "health_facility": "Ripley",
          "trimester": 3,
          "remaining_visits": 1,
          "next_appointment": "2019-10-31"
        },
        {
          "id": "5db6f7b479254451eeb840cc",
          "name": "Ruth Mendoza (890) 594-3284",
          "vht": "Olson (815) 595-2355",
          "health_facility": "Nicut",
          "trimester": 1,
          "remaining_visits": 1,
          "next_appointment": "2019-11-01"
        },
        {
          "id": "5db6f7b43914ba3d940d345b",
          "name": "Keri Mcknight (915) 526-3971",
          "vht": "Ginger (947) 484-2699",
          "health_facility": "Suitland",
          "trimester": 3,
          "remaining_visits": 3,
          "next_appointment": "2019-11-07"
        },
        {
          "id": "5db6f7b4db2700cff7e98d8e",
          "name": "Katelyn Edwards (878) 534-3490",
          "vht": "Maritza (812) 519-2546",
          "health_facility": "Itmann",
          "trimester": 2,
          "remaining_visits": 2,
          "next_appointment": "2019-10-29"
        }
      ];

  
     
  
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

      return (
          <div>
          <div className="col-md-12">
          <br className="clear-both"/>
            <form className="form-inline pull-right">
              <div className="form-group">
                <label htmlFor="email">From:</label>
                <input name="from" value={this.state.from} onChange={this.handleInputChange} className="form-control" type="date" />
              </div>
              <div className="form-group">
                <label htmlFor="email">To:</label>
                <input name="to" value={this.state.to} onChange={this.handleInputChange} className="form-control" type="date" />
              </div>
          {/*

            name:false,
            vht:false,
            health_facility:false,
            trimester:false,
            missed_appointments:false,
            recently_missed_appointments:false

          */}
              <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">
                <MenuItem onClick={(e, name) => this.updateTable("name")} eventKey={3.1}> <Check state={this.state.manageColomns.name} /> Name</MenuItem>             
                <MenuItem onClick={(e, vht) => this.updateTable("vht")} eventKey={3.1}> <Check state={this.state.manageColomns.vht} /> Chew</MenuItem>             
                <MenuItem onClick={(e, health_facility) => this.updateTable("health_facility")} eventKey={3.1}> <Check state={this.state.manageColomns.health_facility} /> Health Facility</MenuItem>             
                <MenuItem onClick={(e, trimester) => this.updateTable("trimester")} eventKey={3.1}> <Check state={this.state.manageColomns.trimester} /> Trimester</MenuItem>             
                <MenuItem onClick={(e, remaining_visits) => this.updateTable("remaining_visits")} eventKey={3.1}> <Check state={this.state.manageColomns.remaining_visits} /> Remaining Visits</MenuItem>             
                <MenuItem onClick={(e, next_appointment) => this.updateTable("next_appointment")} eventKey={3.1}> <Check state={this.state.manageColomns.next_appointment} /> Next Appointment</MenuItem>             
              </NavDropdown>
  
            </form>
          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable data={data_table}
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
                <TableHeaderColumn isKey={true} hidden={true} dataSort={true} dataField='id'>#</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.name} dataSort={true} dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.vht} dataSort={true} dataField='vht'>Chew</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.health_facility} dataSort={true} dataField='health_facility'>Health Facility</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.trimester} dataSort={true} dataField='trimester'>Trimester</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.remaining_visits} dataSort={true} dataField='remaining_visits'>Remaining Visits</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.next_appointment} dataSort={true} dataField='next_appointment'>Next Appointment</TableHeaderColumn>
  
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
          status: "All",
          from: prevMonthFirstDay,
          to: moment(endOfDay).local().format('YYYY-MM-DD'),
          showCoords: true,
          manageColomns: {
            name:false,
            vht:false,
            health_facility:false,
            trimester:false,
            attended_appointments:false,
            next_appointment:false
          },
          // remote pagination
          currentPage: 1,
          sizePerPage: 20,
          totalDataSize: 0
        }
      this.getData = this.getData.bind(this);
      this.updateTable = this.updateTable.bind(this);
    }
    componentDidMount() {
    // this.getData();
    }
 
    getData() {
        const thisApp = this;
        thisApp.setState({
        appointments: [],
        appointments_copy: [],
        loadingText:"Loading...",
      });
        service.usersChew(function(error, response){
        console.log(response);
          if (error){
              console.log(error);
              thisApp.setState(
              {
                isLoaded: true,
                chews:[]
              },
              () => console.log(thisApp.state)
            );
            }
            else{
              thisApp.setState(
              {
                isLoaded: true,
                chews:response.results
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
      return row.first_name+" "+row.last_name;
    }
    render() {
      let data_table =[
        {
          "id": "5db6f91ae03ce50d4397dc31",
          "name": "Merritt Lawrence (979) 474-3519",
          "vht": "Rivers (994) 497-2357",
          "health_facility": "Norris",
          "trimester": 3,
          "attended_appointments": 1,
          "next_appointment": "2019-11-06"
        },
        {
          "id": "5db6f91af0ae5e8165621e0a",
          "name": "Cain Hood (899) 460-3214",
          "vht": "Branch (927) 590-3462",
          "health_facility": "Grazierville",
          "trimester": 3,
          "attended_appointments": 2,
          "next_appointment": "2019-11-06"
        },
        {
          "id": "5db6f91abfa8db340578b726",
          "name": "Roberta Griffith (813) 591-2489",
          "vht": "Luisa (914) 541-3823",
          "health_facility": "Cliffside",
          "trimester": 1,
          "attended_appointments": 3,
          "next_appointment": "2019-10-29"
        },
        {
          "id": "5db6f91a6a9206f7c91a2979",
          "name": "Amalia Lang (866) 537-3555",
          "vht": "Marylou (809) 598-2205",
          "health_facility": "Goochland",
          "trimester": 1,
          "attended_appointments": 3,
          "next_appointment": "2019-11-02"
        },
        {
          "id": "5db6f91a87d604b8198c680e",
          "name": "Hansen Fleming (879) 547-3611",
          "vht": "Wong (836) 555-3154",
          "health_facility": "Gilgo",
          "trimester": 1,
          "attended_appointments": 1,
          "next_appointment": "2019-10-31"
        },
        {
          "id": "5db6f91a4065439727167e57",
          "name": "Earlene Avila (969) 551-3845",
          "vht": "Rene (947) 409-2597",
          "health_facility": "Tryon",
          "trimester": 2,
          "attended_appointments": 1,
          "next_appointment": "2019-11-04"
        }
      ];

  
     
  
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

      return (
          <div>
          <div className="col-md-12">
          <br className="clear-both"/>
            <form className="form-inline pull-right">
              <div className="form-group">
                <label htmlFor="email">From:</label>
                <input name="from" value={this.state.from} onChange={this.handleInputChange} className="form-control" type="date" />
              </div>
              <div className="form-group">
                <label htmlFor="email">To:</label>
                <input name="to" value={this.state.to} onChange={this.handleInputChange} className="form-control" type="date" />
              </div>
          {/*

            name:false,
            vht:false,
            health_facility:false,
            trimester:false,
            missed_appointments:false,
            recently_missed_appointments:false

          */}
              <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">
                <MenuItem onClick={(e, name) => this.updateTable("name")} eventKey={3.1}> <Check state={this.state.manageColomns.name} /> Name</MenuItem>             
                <MenuItem onClick={(e, vht) => this.updateTable("vht")} eventKey={3.1}> <Check state={this.state.manageColomns.vht} /> Chew</MenuItem>             
                <MenuItem onClick={(e, health_facility) => this.updateTable("health_facility")} eventKey={3.1}> <Check state={this.state.manageColomns.health_facility} /> Health Facility</MenuItem>             
                <MenuItem onClick={(e, trimester) => this.updateTable("trimester")} eventKey={3.1}> <Check state={this.state.manageColomns.trimester} /> Trimester</MenuItem>             
                <MenuItem onClick={(e, attended_appointments) => this.updateTable("attended_appointments")} eventKey={3.1}> <Check state={this.state.manageColomns.attended_appointments} /> Attended Appointments</MenuItem>             
                <MenuItem onClick={(e, next_appointment) => this.updateTable("next_appointment")} eventKey={3.1}> <Check state={this.state.manageColomns.next_appointment} /> Next Appointment</MenuItem>             
              </NavDropdown>
  
            </form>
          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable data={data_table}
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
                <TableHeaderColumn isKey={true} hidden={true} dataSort={true} dataField='id'>#</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.name} dataSort={true} dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.vht} dataSort={true} dataField='vht'>Chew</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.health_facility} dataSort={true} dataField='health_facility'>Health Facility</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.trimester} dataSort={true} dataField='trimester'>Trimester</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.attended_appointments} dataSort={true} dataField='attended_appointments'>Attended Appointments</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.next_appointment} dataSort={true} dataField='next_appointment'>Next Appointment</TableHeaderColumn>
  
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
          status: "All",
          from: prevMonthFirstDay,
          to: moment(endOfDay).local().format('YYYY-MM-DD'),
          showCoords: true,
          manageColomns: {
            name:false,
            vht:false,
            health_facility:false,
            trimester:false,
            attended_appointments:false,
          },
          // remote pagination
          currentPage: 1,
          sizePerPage: 20,
          totalDataSize: 0
        }
      this.getData = this.getData.bind(this);
      this.updateTable = this.updateTable.bind(this);
    }
    componentDidMount() {
    // this.getData();
    }
 
    getData() {
        const thisApp = this;
        thisApp.setState({
        appointments: [],
        appointments_copy: [],
        loadingText:"Loading...",
      });
        service.usersChew(function(error, response){
        console.log(response);
          if (error){
              console.log(error);
              thisApp.setState(
              {
                isLoaded: true,
                chews:[]
              },
              () => console.log(thisApp.state)
            );
            }
            else{
              thisApp.setState(
              {
                isLoaded: true,
                chews:response.results
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
      return row.first_name+" "+row.last_name;
    }
    render() {
      let data_table =[
        {
          "id": "5db6fb327be53a987defd880",
          "name": "Ollie Mckinney (981) 482-3013",
          "vht": "Burt (942) 485-2574",
          "health_facility": "Yukon",
          "trimester": 3,
          "attended_appointments": 3
        },
        {
          "id": "5db6fb3208d0ac095daf06cb",
          "name": "Langley Brooks (821) 421-3867",
          "vht": "Bernard (834) 531-2011",
          "health_facility": "Lacomb",
          "trimester": 3,
          "attended_appointments": 3
        },
        {
          "id": "5db6fb32762c4cc066391af1",
          "name": "Daphne Dyer (853) 402-3424",
          "vht": "Young (959) 597-3104",
          "health_facility": "Weeksville",
          "trimester": 3,
          "attended_appointments": 3
        },
        {
          "id": "5db6fb32d0f787091364df8e",
          "name": "Shelton Kane (848) 414-2453",
          "vht": "Brandi (824) 444-2227",
          "health_facility": "Wauhillau",
          "trimester": 3,
          "attended_appointments": 3
        },
        {
          "id": "5db6fb32131572cc8a8a6c91",
          "name": "Valarie Hawkins (977) 510-3016",
          "vht": "Lora (911) 405-3928",
          "health_facility": "Roderfield",
          "trimester": 3,
          "attended_appointments": 3
        }
      ];

  
     
  
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

      return (
          <div>
          <div className="col-md-12">
          <br className="clear-both"/>
            <form className="form-inline pull-right">
              <div className="form-group">
                <label htmlFor="email">From:</label>
                <input name="from" value={this.state.from} onChange={this.handleInputChange} className="form-control" type="date" />
              </div>
              <div className="form-group">
                <label htmlFor="email">To:</label>
                <input name="to" value={this.state.to} onChange={this.handleInputChange} className="form-control" type="date" />
              </div>
          {/*

            name:false,
            vht:false,
            health_facility:false,
            trimester:false,
            missed_appointments:false,
            recently_missed_appointments:false

          */}
              <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">
                <MenuItem onClick={(e, name) => this.updateTable("name")} eventKey={3.1}> <Check state={this.state.manageColomns.name} /> Name</MenuItem>             
                <MenuItem onClick={(e, vht) => this.updateTable("vht")} eventKey={3.1}> <Check state={this.state.manageColomns.vht} /> Chew</MenuItem>             
                <MenuItem onClick={(e, health_facility) => this.updateTable("health_facility")} eventKey={3.1}> <Check state={this.state.manageColomns.health_facility} /> Health Facility</MenuItem>             
                <MenuItem onClick={(e, trimester) => this.updateTable("trimester")} eventKey={3.1}> <Check state={this.state.manageColomns.trimester} /> Trimester</MenuItem>             
                <MenuItem onClick={(e, attended_appointments) => this.updateTable("attended_appointments")} eventKey={3.1}> <Check state={this.state.manageColomns.attended_appointments} /> Attended Appointments</MenuItem>                         
              </NavDropdown>
  
            </form>
          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable data={data_table}
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
                <TableHeaderColumn isKey={true} hidden={true} dataSort={true} dataField='id'>#</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.name} dataSort={true} dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.vht} dataSort={true} dataField='vht'>Chew</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.health_facility} dataSort={true} dataField='health_facility'>Health Facility</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.trimester} dataSort={true} dataField='trimester'>Trimester</TableHeaderColumn>
                <TableHeaderColumn hidden={this.state.manageColomns.attended_appointments} dataSort={true} dataField='attended_appointments'>Attended Appointments</TableHeaderColumn>
  
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









