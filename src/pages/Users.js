import React, { Component } from 'react';
import { NavDropdown, MenuItem,DropdownButton, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import {Tabs, Tab} from 'react-bootstrap';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn, ExportCSVButton } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
const alertifyjs = require('alertifyjs');
const service = require('../api/services');
const Fuse = require("fuse.js");

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

        chew: false,
        midwife: false,
        ambulance:false,

        userType:"",

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
              <h4 className="pull-left"> <span><FontAwesomeIcon icon={faUsers} /></span> Users</h4>
              {/* <button onClick={this.handleShow} className="">Add user</button> */}
              <div className="pull-right">
              <DropdownButton
                  bsStyle={"primary"}
                  title={"Add user"}
                  key={4}
                  id={"add-user-btn"}
                >
                  <MenuItem onClick={()=>this.handleShow("chew")} eventKey="1">CHEW</MenuItem>
                  <MenuItem onClick={()=>this.handleShow("midwife")} eventKey="2">Midwives</MenuItem>
                  <MenuItem onClick={()=>this.handleShow("ambulance")} eventKey="3">Ambulance</MenuItem>
                </DropdownButton> 
              </div>
              
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
        <ChewModal handleClose={(d)=>this.handleClose(d)} show={this.state.chew}/>
        <MidwifeModal handleClose={(d)=>this.handleClose(d)} show={this.state.midwife} />
        <AmbulanceModal handleClose={(d)=>this.handleClose(d)} show={this.state.ambulance} />
        </React.Fragment>
      );
    }
  }

  class ChewModal extends Component{
    constructor(props){
      super(props);
      this.state = {
        first_name:null,
        last_name:null,
        username:null,
        password:null,
        gender:null,
        email:null,
        phone_number:null,
        village:null,
        villages:[],
        loading: false
      }
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    addChew(e){
      e.preventDefault();
      const thisApp = this;
      thisApp.setState({
        loading:true
      });
      alertifyjs.message('Adding CHEW..', 2, function(){  console.log('dismissed'); });
      service.addUser({
        first_name:this.state.first_name,
        last_name:this.state.last_name,
        username:this.state.username,
        email:this.state.email,
        gender:this.state.gender,
        village:this.state.village,
        password:this.state.password,
        phone:this.state.phone_number,
        role:"vht"
      }, function(error, token){
          if (error){
              console.log(error);
              thisApp.setState({
                loading:false
              });
              alertifyjs.error('Request failed, try again', 5, function(){  console.log('dismissed'); });
            }
            else{
              thisApp.setState({
                loading:false
              });
             alertifyjs.success('Added successfully', 2, function(){  console.log('dismissed'); });
             window.location.reload();
            }
      });
    }
    getVillages() {
      const thisApp = this;
      thisApp.setState({
      sub_counties: [],
      sub_counties_copy: [],
      loadingText:"Loading...",
    });
      service.getVillages(function(error, response){
      console.log(response);
        if (error){
            console.log(error);
            thisApp.setState(
            {
              isLoaded: true,
              villages:[]
            },
            () => console.log(thisApp.state)
          );
          }
          else{
            thisApp.setState(
            {
              isLoaded: true,
              villages:response.results
            },
            () => console.log(thisApp.state)
          );
          }
    });

  }
    componentDidMount(){
      this.getVillages();
    }
    render(){
      return(
        <Modal show={this.props.show} onHide={()=>this.props.handleClose("chew")}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new CHEW</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={e =>this.addChew(e)}>
            <div className="col-md-12">
                <div className="form-group col-md-6">
                    <label>First name</label>
                    <input required type="text" onChange={this.handleChange} name="first_name" value={this.state.first_name} className="form-control" placeholder="John" autoFocus={true}></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Last name</label>
                    <input required type="text" onChange={this.handleChange} name="last_name" value={this.state.last_name} className="form-control" placeholder="Musoke"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Phone number</label>
                    <input required type="tel" onChange={this.handleChange} name="phone_number" value={this.state.phone_number} className="form-control" placeholder="070XXXXXX"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Gender</label>
                    <select required className="form-control" name="gender" onChange={this.handleChange} value={this.state.gender}>
                    <option defaultValue value={null}>
                      Select gender
                        </option>
                        <option value={1}>
                            Female
                        </option>
                        <option value={0}>
                            Male
                        </option>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label>Email address</label>
                    <input required type="email" className="form-control" name="email"  onChange={this.handleChange} value={this.state.email} placeholder="jmusoke@gmail.com"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Username</label>
                    <input required type="text" className="form-control" name="username"  onChange={this.handleChange} value={this.state.username} placeholder="jmusoke"></input>
                </div>
                
                <div className="form-group col-md-6">
                <label>Password</label>
                    <input required className="form-control" name="password" onChange={this.handleChange} value={this.state.password} type="password" placeholder="Password"></input>
                    
                    </div>
            </div>
        <div className="col-md-12">
                <br className="clear-both"/>
                <div className="form-group col-md-6">
                <label>Villages</label>
                    <select className="form-control" name="sub_county" onChange={this.handleChange} value={this.state.village}>
                    <option defaultValue value={null}>
                      Select Village
                        </option>
                    { this.state.villages.map( (value, key)=>(
                      <option key={key} value={value.id}>
                      {value.name}
                        </option>
                    ))}
                        
                    </select>
                    
                    </div>
                    <br className="clear-both"/>
                    <button type="submit" className="btn btn-primary">{this.state.loading ? "Adding Chew" : "Submit"}</button>
                    <br className="clear-both"/>
                    </div>
                     
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-default" onClick={()=>this.props.handleClose("chew")}>Close</button>
          </Modal.Footer>
        </Modal>
      )
    }
  }
  class VHT extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: [],
            users_copy:[],
            search:null,
            isLoaded: false,
            loadingText:"Loading ..",
            role: 3,
            from: prevMonthFirstDay,
            to: moment(endOfDay).local().format('YYYY-MM-DD'),
            showCoords: true,
            manageColomns: {
              email: false,
              name:false,
              gender:false,
              village:false,
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
        this.search = this.search.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
          users: [],
          users_copy: [],
          loadingText:"Loading...",
        });
          service.users(this.state.role, function(error, response){
          console.log(response);
            if (error){
                console.log(error);
                thisApp.setState(
                {
                  isLoaded: true,
                  users:[],
                  users_copy: [],
                },
                () => console.log(thisApp.state)
              );
              }
              else{
                thisApp.setState(
                {
                  isLoaded: true,
                  users:response.results,
                  users_copy: response.results,
                },
                () => console.log(thisApp.state)
              );
              }
        });
    
      }
      
      search(event) {
        this.setState({ search: event.target.value });
        if (event.target.value.length <= 0) {
          this.setState({
            users: this.state.users_copy
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
              "first_name",
              "last_name",
              "phone_number",
              "email",
              "phone"
            ]
          };
      
          var fuse = new Fuse(this.state.users_copy, options); // "list" is the item array
          var result = fuse.search(event.target.value);
          this.setState({
            users: result
          });
        }
      
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
      render() {
        let users = this.state.users
  
    
       
    
        const options = {
          page: 1,  // which page you want to show as default
          // onPageChange: this.onPageChange,
          // onSortChange: this.onSortChange,
          // onFilterChange: this.onFilterChange,
        //   sizePerPageList: xxx, // you can change the dropdown list for size per page
          sizePerPage: 20,  // which size per page you want to locate as default
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
                <NavDropdown eventKey={3} className="pull-right" title="Manage columns" id="basic-nav-dropdown">
                  <MenuItem onClick={(e, name) => this.updateTable("name")} eventKey={3.1}> <Check state={this.state.manageColomns.name} /> Name</MenuItem>        
                  <MenuItem onClick={(e, email) => this.updateTable("email")} eventKey={3.1}> <Check state={this.state.manageColomns.email} /> Email</MenuItem>        
                  <MenuItem onClick={(e, gender) => this.updateTable("gender")} eventKey={3.1}> <Check state={this.state.manageColomns.gender} /> Gender</MenuItem>        
                  <MenuItem onClick={(e, sub_county) => this.updateTable("village")} eventKey={3.1}> <Check state={this.state.manageColomns.village} /> Village</MenuItem>        
                  <MenuItem onClick={(e, username) => this.updateTable("username")} eventKey={3.1}> <Check state={this.state.manageColomns.username} /> Username</MenuItem>               
                </NavDropdown>
    
              </form>
    
           
    
            <div className="padding-top content-container col-md-12">
              {this.state.isLoaded === true ? (
                <BootstrapTable data={users}
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
                  <TableHeaderColumn hidden={this.state.manageColomns.name} dataFormat ={this.nameFormatter} dataSort={true} dataField='first_name'>Name</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.email} dataSort={true} dataField='email'>Email</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.gender} dataField='gender'>Gender</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.sub_county} dataField='village'>Village</TableHeaderColumn>
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
          users: [],
          users_copy:[],
          search:null,
            isLoaded: false,
            loadingText:"Loading ..",
            status: "All",
            role:4,
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
        this.search = this.search.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
      users: [],
      users_copy: [],
      loadingText:"Loading...",
    });
      service.users(this.state.role, function(error, response){
      console.log(response);
        if (error){
            console.log(error);
            thisApp.setState(
            {
              isLoaded: true,
              users:[],
              users_copy: [],
            },
            () => console.log(thisApp.state)
          );
          }
          else{
            thisApp.setState(
            {
              isLoaded: true,
              users:response.results,
              users_copy: response.results,
            },
            () => console.log(thisApp.state)
          );
          }
    });

  }
  search(event) {
    this.setState({ search: event.target.value });
    if (event.target.value.length <= 0) {
      this.setState({
        users: this.state.users_copy
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
          "first_name",
          "last_name",
          "phone_number",
          "email",
          "phone"
        ]
      };
  
      var fuse = new Fuse(this.state.users_copy, options); // "list" is the item array
      var result = fuse.search(event.target.value);
      this.setState({
        users: result
      });
    }
  
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
      render() {
        let users = this.state.users;
  
    
       
    
        const options = {
          page: 1,  // which page you want to show as default
          // onPageChange: this.onPageChange,
          // onSortChange: this.onSortChange,
          // onFilterChange: this.onFilterChange,
        //   sizePerPageList: xxx, // you can change the dropdown list for size per page
          sizePerPage: 20,  // which size per page you want to locate as default
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
                <BootstrapTable data={users}
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
          users: [],
          users_copy:[],
          search:null,
            isLoaded: false,
            loadingText:"Loading ..",
            status: "All",
            from: prevMonthFirstDay,
            role:5,
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
        this.search = this.search.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }
      componentDidMount() {
       this.getData();
      }
    
    
    getData() {
      const thisApp = this;
      thisApp.setState({
      users: [],
      users_copy: [],
      loadingText:"Loading...",
    });
      service.users(this.state.role, function(error, response){
      console.log(response);
        if (error){
            console.log(error);
            thisApp.setState(
            {
              isLoaded: true,
              users:[],
              users_copy: [],
            },
            () => console.log(thisApp.state)
          );
          }
          else{
            thisApp.setState(
            {
              isLoaded: true,
              users:response.results,
              users_copy: response.results,
            },
            () => console.log(thisApp.state)
          );
          }
    });

  }

    search(event) {
      this.setState({ search: event.target.value });
      if (event.target.value.length <= 0) {
        this.setState({
          users: this.state.users_copy
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
            "first_name",
            "last_name",
            "phone_number",
            "email",
            "phone"
          ]
        };
    
        var fuse = new Fuse(this.state.users_copy, options); // "list" is the item array
        var result = fuse.search(event.target.value);
        this.setState({
          users: result
        });
      }
    
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
      render() {
        let users = this.state.users
  
    
       
    
        const options = {
          page: 1,  // which page you want to show as default
          // onPageChange: this.onPageChange,
          // onSortChange: this.onSortChange,
          // onFilterChange: this.onFilterChange,
        //   sizePerPageList: xxx, // you can change the dropdown list for size per page
          sizePerPage: 20,  // which size per page you want to locate as default
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
                <BootstrapTable data={users}
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

  class MidwifeModal extends Component{
    constructor(props){
      super(props);
      this.state = {
        first_name:null,
        last_name:null,
        username:null,
        password:null,
        gender:null,
        email:null,
        phone_number:null,
        health_facility:null,
        health_facilities:[],
        loading: false
      }
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    submit(e){
      e.preventDefault();
      const thisApp = this;
      thisApp.setState({
        loading:true
      });
      alertifyjs.message('Adding Midwife..', 2, function(){  console.log('dismissed'); });
      service.addUser({
        first_name:this.state.first_name,
        last_name:this.state.last_name,
        username:this.state.username,
        email:this.state.email,
        gender:this.state.gender,
        health_facility:this.state.health_facility,
        password:this.state.password,
        phone:this.state.phone_number,
        role:"midwife"
      }, function(error, token){
          if (error){
              console.log(error);
              thisApp.setState({
                loading:false
              });
              alertifyjs.error('Request failed, try again', 5, function(){  console.log('dismissed'); });
            }
            else{
              thisApp.setState({
                loading:false
              });
             alertifyjs.success('Added successfully', 2, function(){  console.log('dismissed'); });
             window.location.reload();
            }
      });
    }
    getHealthFacilities() {
      const thisApp = this;
      thisApp.setState({
        health_facilities: [],
        health_facilities_copy: [],
      loadingText:"Loading...",
    });
      service.getHealthFacilities(function(error, response){
      console.log(response);
        if (error){
            console.log(error);
            thisApp.setState(
            {
              isLoaded: true,
              health_facilities:[]
            },
            () => console.log(thisApp.state)
          );
          }
          else{
            thisApp.setState(
            {
              isLoaded: true,
              health_facilities:response.results
            },
            () => console.log(thisApp.state)
          );
          }
    });

  }
    componentDidMount(){
      this.getHealthFacilities();
    }
    render(){
      return(
        <Modal show={this.props.show} onHide={()=>this.props.handleClose("midwife")}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Midwife</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={e =>this.submit(e)}>
            <div className="col-md-12">
                <div className="form-group col-md-6">
                    <label>First name</label>
                    <input required type="text" onChange={this.handleChange} name="first_name" value={this.state.first_name} className="form-control" placeholder="John" autoFocus={true}></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Last name</label>
                    <input required type="text" onChange={this.handleChange} name="last_name" value={this.state.last_name} className="form-control" placeholder="Musoke"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Phone number</label>
                    <input required type="tel" onChange={this.handleChange} name="phone_number" value={this.state.phone_number} className="form-control" placeholder="070XXXXXX"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Gender</label>
                    <select required className="form-control" name="gender" onChange={this.handleChange} value={this.state.gender}>
                    <option defaultValue value={null}>
                      Select gender
                        </option>
                        <option value={1}>
                            Female
                        </option>
                        <option value={0}>
                            Male
                        </option>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label>Email address</label>
                    <input required type="email" className="form-control" name="email"  onChange={this.handleChange} value={this.state.email} placeholder="jmusoke@gmail.com"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Username</label>
                    <input required type="text" className="form-control" name="username"  onChange={this.handleChange} value={this.state.username} placeholder="jmusoke"></input>
                </div>
                
                <div className="form-group col-md-6">
                <label>Password</label>
                    <input required className="form-control" name="password" onChange={this.handleChange} value={this.state.password} type="password" placeholder="Password"></input>
                    
                    </div>
            </div>
        <div className="col-md-12">
                <br className="clear-both"/>
                <div className="form-group col-md-6">
                <label>Health facility</label>
                    <select className="form-control" name="health_facility" onChange={this.handleChange} value={this.state.health_facility}>
                    <option defaultValue value={null}>
                      Select Health Facility
                        </option>
                    { this.state.health_facilities.map( (value, key)=>(
                      <option key={key} value={value.id}>
                      {value.name}
                        </option>
                    ))}
                        
                    </select>
                    
                    </div>
                    <br className="clear-both"/>
                    <button type="submit" className="btn btn-primary">{this.state.loading ? "Adding Midwife" : "Submit"}</button>
                    <br className="clear-both"/>
                    </div>
                     
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-default" onClick={()=>this.props.handleClose("midwife")}>Close</button>
          </Modal.Footer>
        </Modal>
      )
    }
  }


  class AmbulanceModal extends Component{
    constructor(props){
      super(props);
      this.state = {
        first_name:null,
        last_name:null,
        username:null,
        password:null,
        gender:null,
        email:null,
        phone_number:null,
        number_place:null,
        parish:null,
        parishes:[],
        loading: false
      }
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    submit(e){
      e.preventDefault();
      const thisApp = this;
      thisApp.setState({
        loading:true
      });
      alertifyjs.message('Adding Ambulance..', 2, function(){  console.log('dismissed'); });
      service.addUser({
        first_name:this.state.first_name,
        last_name:this.state.last_name,
        username:this.state.username,
        email:this.state.email,
        gender:this.state.gender,
        parish:this.state.parish,
        number_place:this.state.number_place,
        password:this.state.password,
        phone:this.state.phone_number,
        role:"ambulance"
      }, function(error, token){
          if (error){
              console.log(error);
              thisApp.setState({
                loading:false
              });
              alertifyjs.error('Request failed, try again', 5, function(){  console.log('dismissed'); });
            }
            else{
              thisApp.setState({
                loading:false
              });
             alertifyjs.success('Added successfully', 3, function(){  console.log('dismissed'); });
             window.location.reload();
            }
      });
    }
    getParishes() {
      const thisApp = this;
      thisApp.setState({
        parishes: [],
        parishes_copy: [],
        loadingText:"Loading...",
    });
      service.getParishes(function(error, response){
      console.log(response);
        if (error){
            console.log(error);
            thisApp.setState(
            {
              isLoaded: true,
              health_facilities:[]
            },
            () => console.log(thisApp.state)
          );
          }
          else{
            thisApp.setState(
            {
              isLoaded: true,
              parishes:response.results
            },
            () => console.log(thisApp.state)
          );
          }
    });

  }
    componentDidMount(){
      this.getParishes();
    }
    render(){
      return(
        <Modal show={this.props.show} onHide={()=>this.props.handleClose("ambulance")}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Ambulance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={e =>this.submit(e)}>
            <div className="col-md-12">
                <div className="form-group col-md-6">
                    <label>First name</label>
                    <input required type="text" onChange={this.handleChange} name="first_name" value={this.state.first_name} className="form-control" placeholder="John" autoFocus={true}></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Last name</label>
                    <input required type="text" onChange={this.handleChange} name="last_name" value={this.state.last_name} className="form-control" placeholder="Musoke"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Phone number</label>
                    <input required type="tel" onChange={this.handleChange} name="phone_number" value={this.state.phone_number} className="form-control" placeholder="070XXXXXX"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Gender</label>
                    <select required className="form-control" name="gender" onChange={this.handleChange} value={this.state.gender}>
                    <option defaultValue value={null}>
                      Select gender
                        </option>
                        <option value={1}>
                            Female
                        </option>
                        <option value={0}>
                            Male
                        </option>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label>Email address</label>
                    <input required type="email" className="form-control" name="email"  onChange={this.handleChange} value={this.state.email} placeholder="jmusoke@gmail.com"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Username</label>
                    <input required type="text" className="form-control" name="username"  onChange={this.handleChange} value={this.state.username} placeholder="jmusoke"></input>
                </div>
                
                <div className="form-group col-md-6">
                <label>Password</label>
                    <input required className="form-control" name="password" onChange={this.handleChange} value={this.state.password} type="password" placeholder="Password"></input>
                    
                    </div>
                    <div className="form-group col-md-6">
                <label>Number plate</label>
                    <input required className="form-control" name="number_place" onChange={this.handleChange} value={this.state.number_place} type="text" placeholder="Number plate"></input>
                    
                    </div>

            </div>
        <div className="col-md-12">
                <br className="clear-both"/>
                <div className="form-group col-md-6">
                <label>Parish</label>
                    <select className="form-control" name="parish" onChange={this.handleChange} value={this.state.parish}>
                    <option defaultValue value={null}>
                      Select Parish
                        </option>
                    { this.state.parishes.map( (value, key)=>(
                      <option key={key} value={value.id}>
                      {value.name}
                        </option>
                    ))}
                        
                    </select>
                    
                    </div>
                    <br className="clear-both"/>
                    <button type="submit" className="btn btn-primary">{this.state.loading ? "Adding Ambulance" : "Submit"}</button>
                    <br className="clear-both"/>
                    </div>
                     
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-default" onClick={()=>this.props.handleClose("ambulance")}>Close</button>
          </Modal.Footer>
        </Modal>
      )
    }
  }




