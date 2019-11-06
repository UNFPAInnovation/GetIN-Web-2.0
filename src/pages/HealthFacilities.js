import React, { Component } from 'react';
import { NavDropdown, MenuItem,DropdownButton, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
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
        health_facilities:[],
        health_facilities_copy:[],
        isLoaded: true,
        loadingText:"Loading ..",
        from: prevMonthFirstDay,
        to: moment(endOfDay).local().format('YYYY-MM-DD'),
        showCoords: true,
        manageColomns: {
            "name": false,
            "subcounty": false,
            "midwives": false,
            "vhts": false,
            "level": false,
            "av_deliveries": false,
            "ambulances": false
        },
        // remote pagination
        currentPage: 1,
        sizePerPage: 20,
        totalDataSize: 0   
      };
      this.getData = this.getData.bind(this);
      this.updateTable = this.updateTable.bind(this);
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

      getData() {
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
    render() {
        let data_table =[{
            "id": 1,
            "name": "Corscot",
            "subcounty": "Kayan",
            "midwives": 3,
            "vhts": 7,
            "level": "HC3",
            "av_deliveries": 12,
            "ambulances": 2
          }, {
            "id": 2,
            "name": "Farragut",
            "subcounty": "Trojanów",
            "midwives": 1,
            "vhts": 2,
            "level": "CH2",
            "av_deliveries": 60,
            "ambulances": 5
          }, {
            "id": 3,
            "name": "Spenser",
            "subcounty": "Buenaventura",
            "midwives": 1,
            "vhts": 1,
            "level": "HC1",
            "av_deliveries": 18,
            "ambulances": 3
          }, {
            "id": 4,
            "name": "Carpenter",
            "subcounty": "Göteborg",
            "midwives": 3,
            "vhts": 10,
            "level": "HC3",
            "av_deliveries": 64,
            "ambulances": 3
          }, {
            "id": 5,
            "name": "Corry",
            "subcounty": "Zheleznogorsk-Ilimskiy",
            "midwives": 4,
            "vhts": 9,
            "level": "HC1",
            "av_deliveries": 75,
            "ambulances": 4
          }, {
            "id": 6,
            "name": "Northland",
            "subcounty": "Duozhu",
            "midwives": 2,
            "vhts": 1,
            "level": "HC1",
            "av_deliveries": 75,
            "ambulances": 4
          }, {
            "id": 7,
            "name": "Forster",
            "subcounty": "Xiaoyi",
            "midwives": 5,
            "vhts": 9,
            "level": "HC3",
            "av_deliveries": 83,
            "ambulances": 1
          }, {
            "id": 8,
            "name": "Springs",
            "subcounty": "Rumilly",
            "midwives": 2,
            "vhts": 4,
            "level": "CH2",
            "av_deliveries": 90,
            "ambulances": 2
          }, {
            "id": 9,
            "name": "Dexter",
            "subcounty": "Kosan",
            "midwives": 5,
            "vhts": 4,
            "level": "CH2",
            "av_deliveries": 25,
            "ambulances": 2
          }, {
            "id": 10,
            "name": "Holmberg",
            "subcounty": "Šardice",
            "midwives": 3,
            "vhts": 3,
            "level": "CH2",
            "av_deliveries": 86,
            "ambulances": 2
          }, {
            "id": 11,
            "name": "Gulseth",
            "subcounty": "Yangzhuang",
            "midwives": 5,
            "vhts": 4,
            "level": "HC1",
            "av_deliveries": 33,
            "ambulances": 1
          }, {
            "id": 12,
            "name": "Leroy",
            "subcounty": "Jinotega",
            "midwives": 4,
            "vhts": 8,
            "level": "HC1",
            "av_deliveries": 68,
            "ambulances": 1
          }, {
            "id": 13,
            "name": "Talisman",
            "subcounty": "Bayt Ūlā",
            "midwives": 3,
            "vhts": 6,
            "level": "HC1",
            "av_deliveries": 6,
            "ambulances": 4
          }, {
            "id": 14,
            "name": "Daystar",
            "subcounty": "Guachucal",
            "midwives": 3,
            "vhts": 4,
            "level": "CH2",
            "av_deliveries": 35,
            "ambulances": 1
          }, {
            "id": 15,
            "name": "Mayer",
            "subcounty": "Baguinge",
            "midwives": 1,
            "vhts": 6,
            "level": "HC1",
            "av_deliveries": 13,
            "ambulances": 5
          }, {
            "id": 16,
            "name": "Havey",
            "subcounty": "Newport News",
            "midwives": 5,
            "vhts": 9,
            "level": "CH2",
            "av_deliveries": 49,
            "ambulances": 4
          }, {
            "id": 17,
            "name": "Mallory",
            "subcounty": "San Isidro",
            "midwives": 3,
            "vhts": 3,
            "level": "HC1",
            "av_deliveries": 51,
            "ambulances": 3
          }, {
            "id": 18,
            "name": "Brentwood",
            "subcounty": "Krivyanskaya",
            "midwives": 2,
            "vhts": 7,
            "level": "HC3",
            "av_deliveries": 39,
            "ambulances": 1
          }, {
            "id": 19,
            "name": "Sunnyside",
            "subcounty": "Obrenovac",
            "midwives": 5,
            "vhts": 8,
            "level": "HC3",
            "av_deliveries": 76,
            "ambulances": 1
          }, {
            "id": 20,
            "name": "Delladonna",
            "subcounty": "Bicos",
            "midwives": 2,
            "vhts": 9,
            "level": "HC1",
            "av_deliveries": 41,
            "ambulances": 2
          }, {
            "id": 21,
            "name": "Jenna",
            "subcounty": "Holýšov",
            "midwives": 5,
            "vhts": 10,
            "level": "HC1",
            "av_deliveries": 80,
            "ambulances": 1
          }, {
            "id": 22,
            "name": "Rigney",
            "subcounty": "Vrbovec",
            "midwives": 1,
            "vhts": 8,
            "level": "HC1",
            "av_deliveries": 62,
            "ambulances": 2
          }, {
            "id": 23,
            "name": "Cody",
            "subcounty": "Qinshan",
            "midwives": 4,
            "vhts": 3,
            "level": "HC3",
            "av_deliveries": 27,
            "ambulances": 5
          }, {
            "id": 24,
            "name": "Artisan",
            "subcounty": "Beroroha",
            "midwives": 1,
            "vhts": 10,
            "level": "HC1",
            "av_deliveries": 44,
            "ambulances": 1
          }, {
            "id": 25,
            "name": "Maple Wood",
            "subcounty": "Santos Evos",
            "midwives": 5,
            "vhts": 2,
            "level": "HC1",
            "av_deliveries": 17,
            "ambulances": 1
          }, {
            "id": 26,
            "name": "Fulton",
            "subcounty": "Palopo",
            "midwives": 4,
            "vhts": 6,
            "level": "CH2",
            "av_deliveries": 72,
            "ambulances": 3
          }, {
            "id": 27,
            "name": "Glacier Hill",
            "subcounty": "Ryūō",
            "midwives": 5,
            "vhts": 1,
            "level": "HC1",
            "av_deliveries": 4,
            "ambulances": 5
          }, {
            "id": 28,
            "name": "Westerfield",
            "subcounty": "Panjiang",
            "midwives": 2,
            "vhts": 10,
            "level": "HC1",
            "av_deliveries": 87,
            "ambulances": 1
          }, {
            "id": 29,
            "name": "Veith",
            "subcounty": "Sinop",
            "midwives": 3,
            "vhts": 1,
            "level": "HC3",
            "av_deliveries": 32,
            "ambulances": 1
          }, {
            "id": 30,
            "name": "Reindahl",
            "subcounty": "Port Colborne",
            "midwives": 4,
            "vhts": 2,
            "level": "HC1",
            "av_deliveries": 43,
            "ambulances": 4
          }];
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
        <React.Fragment>
      
          <div className="col-md-12">
          <div className="col-md-12 title">
              <h4 className="pull-left"> <span><FontAwesomeIcon icon={faHospital} /></span> Health Facilities</h4>
              <br className="clear-both"/>
              <br className="clear-both"/>
            </div>
            <div className="col-md-12 bg-white-content">
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
                  <MenuItem onClick={(e, subcounty) => this.updateTable("subcounty")} eventKey={3.1}> <Check state={this.state.manageColomns.subcounty} /> Subcounty</MenuItem>             
                  <MenuItem onClick={(e, midwives) => this.updateTable("midwives")} eventKey={3.1}> <Check state={this.state.manageColomns.midwives} /> Midwives</MenuItem>             
                  <MenuItem onClick={(e, vhts) => this.updateTable("vhts")} eventKey={3.1}> <Check state={this.state.manageColomns.vhts} /> Chews</MenuItem>             
                  <MenuItem onClick={(e, level) => this.updateTable("level")} eventKey={3.1}> <Check state={this.state.manageColomns.level} /> Level</MenuItem>             
                  <MenuItem onClick={(e, av_deliveries) => this.updateTable("av_deliveries")} eventKey={3.1}> <Check state={this.state.manageColomns.av_deliveries} /> Average deliveries</MenuItem>             
                  <MenuItem onClick={(e, ambulances) => this.updateTable("ambulances")} eventKey={3.1}> <Check state={this.state.manageColomns.ambulances} /> Average deliveries</MenuItem>             
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
                  <TableHeaderColumn hidden={this.state.manageColomns.subcounty} dataSort={true} dataField='subcounty'>Subcounty</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.midwives} dataSort={true} dataField='midwives'>Midwives</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.vhts} dataSort={true} dataField='vhts'>Chews</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.level} dataSort={true} dataField='level'>Level</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.av_deliveries} dataSort={true} dataField='av_deliveries'>Average deliveries</TableHeaderColumn>
                  <TableHeaderColumn hidden={this.state.manageColomns.ambulances} dataSort={true} dataField='ambulances'>Average deliveries</TableHeaderColumn>
    
                </BootstrapTable>
               
              ) : (
                  <span>Loading</span>
                )}
            </div>
            </div>
        </div>
        </div>
        </React.Fragment>
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
