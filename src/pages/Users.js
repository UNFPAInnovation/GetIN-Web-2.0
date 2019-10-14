import React, { Component } from 'react';
import { NavDropdown, MenuItem, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
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
export default class Users extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        key: 'chews',
        show: false,
        first_name:null,
        last_name:null,
        username:null,
        password:null,
        gender:null,
        phone_number:null,
        sub_county:"",
        userType:"",

      };
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
      register(e){
        e.preventDefault();
        //const thisApp = this;
        alertifyjs.message('Signing in ..', 2, function(){  console.log('dismissed'); });
        let data = {
            "username":this.state.username,
            "password":this.state.password,
          }
        service.login(data, function(error, token){
            if (error){
                console.log(error);
                alertifyjs.error('Oops! That email / password combination is not valid.', 5, function(){  console.log('dismissed'); });
              }
              else{
               sessionStorage.removeItem('token');
               sessionStorage.setItem('token', token);
               alertifyjs.success('Signed Successfully', 5, function(){  console.log('dismissed'); });
               window.location.href="/dashboard";
              }
        });
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
              <h4 className="pull-left"> <span><FontAwesomeIcon icon={faUsers} /></span> Users</h4>
              <button onClick={this.handleShow} className="btn btn-primary pull-right">Add user</button>
              <br className="clear-both"/>
              <br className="clear-both"/>
            </div>
            <div className="col-md-12 bg-white-content">
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="chews" title="CHEWS">
            <VHT />
          </Tab>
          <Tab eventKey="midwives" title="Midwives">
          <Midwives/>
          </Tab>
          <Tab eventKey="ambulances" title="Ambulance drivers">
          <AmbulanceDrivers />
          </Tab>
        </Tabs>
        </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={e =>this.register(e)}>
            <div className="col-md-12">
                <div className="form-group col-md-6">
                    <label>First name</label>
                    <input onChange={this.handleChange} value={this.state.first_name} className="form-control" placeholder="John" autoFocus={true}></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Last name</label>
                    <input onChange={this.handleChange} value={this.state.last_name} className="form-control" placeholder="Musoke"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Phone number</label>
                    <input onChange={this.handleChange} value={this.state.phone_number} className="form-control" placeholder="070XXXXXX"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Gender</label>
                    <select className="form-control" onChange={this.handleChange} value={this.state.gender}>
                        <option value={0}>
                            Female
                        </option>
                        <option value={1}>
                            Male
                        </option>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label>Username</label>
                    <input className="form-control" onChange={this.handleChange} value={this.state.username} placeholder="jmusoke"></input>
                </div>
                
                <div className="form-group col-md-6">
                <label>Password</label>
                    <input className="form-control" onChange={this.handleChange} value={this.state.password} type="password" placeholder="Password"></input>
                    
                    </div>
                    <div className="form-group col-md-6">
                <label>User type</label>
                    <select className="form-control" onChange={this.handleChange} value={this.state.userType}>
                        <option value="chew">
                            Chew
                        </option>
                        <option value="midwife">
                            Midwife
                        </option>
                        <option value="ambulance_driver">
                            Ambulance driver
                        </option>
                    </select>
                    
                    </div>
            </div>
        <div className="col-md-12">
                <br className="clear-both"/>
                <div className="form-group col-md-6">
                <label>Subcounty</label>
                    <select className="form-control" onChange={this.handleChange} value={this.state.subcounty}>
                        <option value="">
                            Subcounty name
                        </option>
                    </select>
                    
                    </div>
                    <br className="clear-both"/>
                    <button className="btn btn-primary">Submit</button>
                    <br className="clear-both"/>
                    </div>
                     
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-default" onClick={this.handleClose}>Close</button>
          </Modal.Footer>
        </Modal>
        </React.Fragment>
      );
    }
  }

  class VHT extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            chews: [],
            chews_copy:[],
            isLoaded: false,
            loadingText:"Loading ..",
            status: "All",
            from: prevMonthFirstDay,
            to: moment(endOfDay).local().format('YYYY-MM-DD'),
            showCoords: true,
            manageColomns: {
              email: false,
              name:false,
              gender:false,
              sub_county:false,
              username:false,
            },
            // remote pagination
            currentPage: 1,
            sizePerPage: 20,
            totalDataSize: 0
          }
        this.getData = this.getData.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.updateTable = this.updateTable.bind(this);
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
          chews: [],
          chews_copy: [],
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
        let chews = this.state.chews
  
    
       
    
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
    
                <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">
                  <MenuItem onClick={(e, name) => this.updateTable("name")} eventKey={3.1}> <Check state={this.state.manageColomns.name} /> Name</MenuItem>        
                  <MenuItem onClick={(e, email) => this.updateTable("email")} eventKey={3.1}> <Check state={this.state.manageColomns.email} /> Email</MenuItem>        
                  <MenuItem onClick={(e, gender) => this.updateTable("gender")} eventKey={3.1}> <Check state={this.state.manageColomns.gender} /> Gender</MenuItem>        
                  <MenuItem onClick={(e, sub_county) => this.updateTable("sub_county")} eventKey={3.1}> <Check state={this.state.manageColomns.sub_county} /> Subcounty</MenuItem>        
                  <MenuItem onClick={(e, username) => this.updateTable("username")} eventKey={3.1}> <Check state={this.state.manageColomns.username} /> Username</MenuItem>               
                </NavDropdown>
    
              </form>
    
           
    
            <div className="padding-top content-container col-md-12">
              {this.state.isLoaded === true ? (
                <BootstrapTable data={chews}
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
                  <TableHeaderColumn hidden={this.state.manageColomns.email} dataSort={true} dataField='email'>Email</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.gender} dataField='gender'>Gender</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.sub_county} dataField='sub_county'>Subcounty</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.username} isKey dataField='username'>Username</TableHeaderColumn>

                 
                  
    
    
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


  class Midwives extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            midwives: [],
            midwives_copy:[],
            isLoaded: false,
            loadingText:"Loading ..",
            status: "All",
            from: prevMonthFirstDay,
            to: moment(endOfDay).local().format('YYYY-MM-DD'),
            showCoords: true,
            manageColomns: {
              email: false,
              name:false,
              gender:false,
              username:false,
              health_facility:false
            },
            // remote pagination
            currentPage: 1,
            sizePerPage: 20,
            totalDataSize: 0
          }
        this.getData = this.getData.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.updateTable = this.updateTable.bind(this);
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
            midwives: [],
            midwives_copy: [],
          loadingText:"Loading...",
        });
          service.usersMidwives(function(error, response){
          console.log(response);
            if (error){
                console.log(error);
                thisApp.setState(
                {
                  isLoaded: true,
                  midwives:[]
                },
                () => console.log(thisApp.state)
              );
              }
              else{
                thisApp.setState(
                {
                  isLoaded: true,
                  midwives:response.results
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
        let midwives = this.state.midwives
  
    
       
    
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
    
                <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">
                  <MenuItem onClick={(e, name) => this.updateTable("name")} eventKey={3.1}> <Check state={this.state.manageColomns.name} /> Name</MenuItem>        
                  <MenuItem onClick={(e, email) => this.updateTable("email")} eventKey={3.1}> <Check state={this.state.manageColomns.email} /> Email</MenuItem>        
                  <MenuItem onClick={(e, health_facility) => this.updateTable("health_facility")} eventKey={3.1}> <Check state={this.state.manageColomns.health_facility} /> Health facility</MenuItem>        
                  <MenuItem onClick={(e, gender) => this.updateTable("gender")} eventKey={3.1}> <Check state={this.state.manageColomns.gender} /> Gender</MenuItem>         
                  <MenuItem onClick={(e, username) => this.updateTable("username")} eventKey={3.1}> <Check state={this.state.manageColomns.username} /> Username</MenuItem>               
                </NavDropdown>
    
              </form>
    
           
    
            <div className="padding-top content-container col-md-12">
              {this.state.isLoaded === true ? (
                <BootstrapTable data={midwives}
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
                  <TableHeaderColumn hidden={this.state.manageColomns.email} dataSort={true} dataField='email'>Email</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.health_facility} dataSort={true} dataField='health_facility'>Health facility</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.gender} dataField='gender'>Gender</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.username} isKey dataField='username'>Username</TableHeaderColumn>

                 
                  
    
    
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

  class AmbulanceDrivers extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            ambulance_drivers: [],
            ambulance_drivers_copy:[],
            isLoaded: false,
            loadingText:"Loading ..",
            status: "All",
            from: prevMonthFirstDay,
            to: moment(endOfDay).local().format('YYYY-MM-DD'),
            showCoords: true,
            manageColomns: {
              email: false,
              name:false,
              gender:false,
              username:false,
              parish:false,
              number_place:false
            },
            // remote pagination
            currentPage: 1,
            sizePerPage: 20,
            totalDataSize: 0
          }
        this.getData = this.getData.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.updateTable = this.updateTable.bind(this);
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
            midwives: [],
            midwives_copy: [],
          loadingText:"Loading...",
        });
          service.usersAmbulanceDrivers(function(error, response){
          console.log(response);
            if (error){
                console.log(error);
                thisApp.setState(
                {
                  isLoaded: true,
                  ambulance_drivers:[]
                },
                () => console.log(thisApp.state)
              );
              }
              else{
                thisApp.setState(
                {
                  isLoaded: true,
                  ambulance_drivers:response.results
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
        let ambulance_drivers = this.state.ambulance_drivers
  
    
       
    
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
    
                <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">
                  <MenuItem onClick={(e, name) => this.updateTable("name")} eventKey={3.1}> <Check state={this.state.manageColomns.name} /> Name</MenuItem>        
                  <MenuItem onClick={(e, email) => this.updateTable("email")} eventKey={3.1}> <Check state={this.state.manageColomns.email} /> Email</MenuItem>        
                  <MenuItem onClick={(e, parish) => this.updateTable("parish")} eventKey={3.1}> <Check state={this.state.manageColomns.parish} /> Parish</MenuItem>        
                  <MenuItem onClick={(e, gender) => this.updateTable("gender")} eventKey={3.1}> <Check state={this.state.manageColomns.gender} /> Gender</MenuItem>         
                  <MenuItem onClick={(e, username) => this.updateTable("username")} eventKey={3.1}> <Check state={this.state.manageColomns.username} /> Username</MenuItem>               
                  <MenuItem onClick={(e, number_place) => this.updateTable("number_place")} eventKey={3.1}> <Check state={this.state.manageColomns.number_place} /> Number plate</MenuItem>               
                </NavDropdown>
    
              </form>
    
           
    
            <div className="padding-top content-container col-md-12">
              {this.state.isLoaded === true ? (
                <BootstrapTable data={ambulance_drivers}
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
                  <TableHeaderColumn hidden={this.state.manageColomns.email} dataSort={true} dataField='email'>Email</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.parish} dataSort={true} dataField='parish'>Parish</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.gender} dataField='gender'>Gender</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.username} isKey dataField='username'>Username</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.number_place} dataField='number_place'>Number plate</TableHeaderColumn>

                 
                  
    
    
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





