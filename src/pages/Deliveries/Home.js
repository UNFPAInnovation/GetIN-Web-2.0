import React, { Component } from "react"; 
import {prevMonthFirstDay, endOfDay, dateFormatter, enumFormatter, getData, nameFormatter, ageFormatter} from '../../utils/index';
import moment from "moment";
import Check from '../../components/Check';
import { NavDropdown, MenuItem } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
const Fuse = require("fuse.js");


export default class Home extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        deliveries: [],
        deliveries_copy: [],
        delivery_location:"home",
        isLoaded: false,
        search:null,
        loadingText: "Loading ..",
        status: "All",
        from: prevMonthFirstDay,
        to: moment(endOfDay)
          .local()
          .format("YYYY-MM-DD"),
        showCoords: true,
        manageColomns: {
          name: false,
          village: false,
          sub_county: true,
          next_of_kin: true,
          dob: true,
          marital_status:true,
  
          // deliveries data
          followup_reason: true,
          action_taken: true,
          received_postnatal_care: true,
          delivery:false,
          family_planning:false,
          delivery_date: false,
          health_facility: true
        },
        // remote pagination
        currentPage: 1,
        sizePerPage: 20,
        totalDataSize: 0
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.search = this.search.bind(this);
    }
    componentDidMount() {
        this.loadData();
      }
      loadData(){
        const thisApp = this;
    getData({
        name:"deliveries",
        delivery_location:this.state.delivery_location,
        from:this.state.from,
        to:this.state.to
    }, function(error, response){
        if(error){
            thisApp.setState({
                isLoaded:true,
            })
        }else{
            thisApp.setState({
                isLoaded:true,
                deliveries: response.results,
                deliveries_copy: response.results,
            })
        }
    })
    }
    nextOfKinFormatter(cell, row) {
      return (
        row.girl.next_of_kin_phone_number
      );
    }
    getVillageItem(cell, row, item) {
      return row.girl.village[item];
    }
    getGirlItem(cell, row, item) {
      return row.girl[item];
    }
    getSubcountyItem(cell, row, item) {
      return row.girl.village.parish.sub_county[item];
    }
    updateTable(colomn) {
      //make a copy of state
      let manageColomns = this.state.manageColomns;
  
      if (this.state.manageColomns[colomn] === true) {
        manageColomns[colomn] = false;
        this.setState({
          manageColomns: manageColomns
        });
      } else {
        manageColomns[colomn] = true;
        this.setState({
          manageColomns: manageColomns
        });
      }
    }
    deliveryFormatter(cell, row) {
     let delivery = "";
      if(row.mother_alive && row.baby_alive){
          return delivery = "Mother Alive, Baby Alive";
      }
      else if(!row.mother_alive && row.baby_alive){
          return delivery = "Mother Dead, Baby Alive";
      }
      else if(row.mother_alive && !row.baby_alive){
          return delivery = "Mother Alive, Still Born";
      }
      else if(row.mother_alive && !row.baby_alive){
          return delivery = "Mother Dead, Still Born";
      }else{
          return delivery = "Not recorded";
      }
    }
    familyPlanningFormatter(cell, row) {
      let familyPlanning = "";
       if(row.family_planning && row.family_planning[0].using_family_planning===true){
           return familyPlanning = "Yes, "+row.family_planning[0].method;
       }
      else{
           return familyPlanning = "None, "+row.family_planning && row.family_planning[0].no_family_planning_reason;
       }
     }
    handleInputChange(event) {
        const thisApp =this;
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value,
        isLoaded: false
      }, () =>
         thisApp.loadData()
      );
    }
    search(event) {
      this.setState({ search: event.target.value });
      if (event.target.value.length <= 0) {
        this.setState({
          deliveries: this.state.deliveries_copy
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
          ]
        };
  
        var fuse = new Fuse(this.state.deliveries_copy, options); // "list" is the item array
        var result = fuse.search(event.target.value);
        this.setState({
          deliveries: result
        });
      }
  
    }
  
    render() {
      let deliveries = this.state.deliveries;
      const YesNoFormat = {
        true: "Yes",
        false: "No"
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
        <div className="col-md-12 bg-white-content">
          <form className="form-inline pull-right">
          <div className="form-group">
                    <label htmlFor="email">Search:</label>
                    <input name="from" value={this.state.search} onChange={this.search} placeholder="Type something here" className="search form-control" type="text" />
                  </div>
            <div className="form-group">
  
              <label htmlFor="email">From:</label>
              <input
                name="from"
                value={this.state.from}
                onChange={this.handleInputChange}
                className="form-control"
                type="date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">To:</label>
              <input
                name="to"
                value={this.state.to}
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
                <Check state={this.state.manageColomns.name} /> Mother
              </MenuItem>
              <MenuItem
                onClick={(e, village) => this.updateTable("village")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.village} /> Village
              </MenuItem>
              <MenuItem
                onClick={(e, next_of_kin_name) => this.updateTable("next_of_kin")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.next_of_kin} /> Next of kin
              </MenuItem>
              <MenuItem
                onClick={(e, marital_status) =>
                  this.updateTable("marital_status")
                }
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.marital_status} /> Marital
                status
              </MenuItem>
              <MenuItem
                onClick={(e, action_taken) =>
                  this.updateTable("action_taken")
                }
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.action_taken} />
                Action taken
              </MenuItem>
  
              <MenuItem
                onClick={(e, name) => this.updateTable("dob")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.dob} /> Age
              </MenuItem>
  
              <MenuItem
                onClick={(e, received_postnatal_care) => this.updateTable("received_postnatal_care")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.received_postnatal_care} /> Received postnatal care
              </MenuItem>
              <MenuItem
                onClick={(e, delivery) => this.updateTable("delivery")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.delivery} /> Delivery status
              </MenuItem>
              <MenuItem
                onClick={(e, family_planning) => this.updateTable("family_planning")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.family_planning} /> Family planning
              </MenuItem>
  
              <MenuItem
                onClick={(e, delivery_date) => this.updateTable("delivery_date")}
                eventKey={3.1}
              >
                {" "}
                <Check state={this.state.manageColomns.delivery_date} /> Date of delivery
              </MenuItem>          
            </NavDropdown>
          </form>
  
          <div className="padding-top content-container col-md-12">
            {this.state.isLoaded === true ? (
              <BootstrapTable
                data={deliveries}
                striped
                hover
                ref="table"
                remote={false}
                headerContainerClass="table-header"
                tableContainerClass="table-responsive table-onScreen"
                // fetchInfo={{ dataTotalSize: this.state.totalDataSize }}
                pagination={true}
                options={options}
                //   exportCSV
                condensed
                pagination
              >
                <TableHeaderColumn
                  width="220px"
                  hidden={this.state.manageColomns.name}
                  dataFormat={nameFormatter}
                  dataSort={true}
                  dataField="first_name"
                >
                  Mother
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={true}
                  dataSort={true}
                  isKey
                  dataField="id"
                >
                  Phone number
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.village}
                  dataFormat={(cell, row, item) =>
                    this.getVillageItem(cell, row, "name")
                  }
                  dataField="village"
                >
                  Village
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.next_of_kin}
                  dataFormat={this.nextOfKinFormatter}
                  dataField="next_of_kin"
                >
                  Next of Kin
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.dob}
                  dataFormat={ageFormatter}
                  dataField="dob"
                >
                  Age (Years)
                </TableHeaderColumn>
                <TableHeaderColumn
                dataFormat={(cell, row, item)=>this.getGirlItem(cell, row, "marital_status")}
                  hidden={this.state.manageColomns.marital_status}
                  dataField="marital_status"
                >
                  Marital status
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.delivery_date}
                  dataFormat={dateFormatter}
                  dataField="baby_birth_date"
                >
                  Delivery date
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.action_taken}
                  dataField="action_taken"
                >
                  Action taken
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.received_postnatal_care}
                   dataFormat={enumFormatter}
                   formatExtraData={YesNoFormat}
                  dataField="postnatal_care"
                >
                  Received postnatal care
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.delivery}
                   dataFormat={this.deliveryFormatter}
                  dataField="delivery"
                >
                  Status of delivery
                </TableHeaderColumn>
                <TableHeaderColumn
                  hidden={this.state.manageColomns.family_planning}
                  dataFormat={this.familyPlanningFormatter}
                  dataField="family_planning"
                >
                  Family planning
                </TableHeaderColumn>            
              </BootstrapTable>
            ) : (
              <span>Loading</span>
            )}
          </div>
        </div>
      );
    }
  }