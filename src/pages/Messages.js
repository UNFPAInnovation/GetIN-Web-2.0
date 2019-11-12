import React, { Component } from "react";
import { NavDropdown, MenuItem, DropdownButton, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Select from 'react-select';
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
const alertifyjs = require("alertifyjs");
const Fuse = require("fuse.js");
const service = require("../api/services");

export default class Messages extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [],
      messages_copy: [],
      compose:false,
      isLoaded: true,
      loadingText: "Loading .."
    };
    this.getData = this.getData.bind(this);
    this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getData() {
    const thisApp = this;
    thisApp.setState({
      messages: [],
      messages_copy: [],
      search:null,
      loadingText: "Loading..."
    });

   service.listSms(function(error, response){
    console.log(response);
      if (error){
          console.log(error);
          thisApp.setState(
          {
            isLoaded: true,
            messages:[],
            messages_copy: []
          },
          () => console.log(thisApp.state)
        );
        }
        else{
          thisApp.setState(
          {
            isLoaded: true,
            messages:response.results,
            messages_copy:response.results
          },
          () => console.log(thisApp.state)
        );
        }
  });

  }
  handleClose(modal) {
    this.setState({ [modal]: false });
  }

  handleShow(modal) {
    this.setState({ [modal]: true });
  }
  search(event) {
    this.setState({ search: event.target.value });
    if (event.target.value.length <= 0) {
      this.setState({
        messages: this.state.messages_copy
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
          "message",
          "recipient.first_name",
          "recipient.last_name",
          "recipient.username_name",
        ]
      };
  
      var fuse = new Fuse(this.state.messages_copy, options); // "list" is the item array
      var result = fuse.search(event.target.value);
      this.setState({
        messages: result
      });
    }
  
  }
  render() {
    let data = this.state.messages;
    return (
      <React.Fragment>
        <div className="col-md-12">
          <div className="col-md-12 title">
            <h4 className="pull-left">
              {" "}
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>{" "}
              Messages
            </h4>
            <br className="clear-both" />
            <br className="clear-both" />
          </div>
          <div className="col-md-12 bg-white-content">
            <div className="padding-top content-container col-md-12">
              {this.state.isLoaded === true ? (
                <div className="messagesPage col-md-12">
                  <div className="col-md-12">
                    <div className="header-min">
                        <button onClick={()=>this.handleShow("compose")} className="btn btn-primary">Compose message</button>
                    </div>
                    <div className="search">
                    <span>
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input placeholder="Search for a message, phone number or name" value={this.state.search} onChange={this.search} className="form-control"></input>
                    </div>
                    <div className="messageList">
                    {
                        this.state.messages.map((value, key)=>
                            <MessageList title={value.recipient.first_name+" "+value.recipient.last_name} userType={value.userType} time={value.created_at} lastMessage={value.message} />
                        )
                    }
                        
                    </div>
                  </div>
                  <ComposeModal handleClose={(d)=>this.handleClose(d)} show={this.state.compose} />
                </div>
              ) : (
                <span>Loading</span>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


class MessageList extends Component{
    render(){
        return(
            <div className="item">
                <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                <div className="text">
                    <span className="title">{this.props.title}</span>
                    <span className="msg">{this.props.lastMessage}</span>
                </div>
                <span className="time">{moment(this.props.time).local().format("Do-MMM-YYYY HH:mm")}</span>
            </div>
        );
    }
}


class ChatList extends Component{
    render(){
        return(
            <div className="chatList">
                <span className="text">Text message</span>
                <span className="time">19:00</span>
            </div>
        );
    }
}

class ComposeModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      receiver_ids:[],
      message:null,
      options:[],
      selectedOption: null,
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
  handleChangeSelect = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  submit(e){
    e.preventDefault();
    const thisApp = this;
    thisApp.setState({
      loading:true
    });
    alertifyjs.message('Sending message ..', 2, function(){  console.log('dismissed'); });
    let ids = [];
    this.state.selectedOption.map((v,k)=>
      ids.push(v.value)
    );
    service.sendSms({
      receiver_ids:ids,
      message:this.state.message,
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
           alertifyjs.success('Message sent..', 2, function(){  console.log('dismissed'); });
           window.location.reload();
          }
    });
  }
  getData() {
    const thisApp = this;
    service.getAllUsers(function(error, response){
    console.log(response);
      if (error){
          console.log(error);
          thisApp.setState(
          {
            isLoaded: true,
            users:[],
            options:[]
          },
          () => console.log(thisApp.state)
        );
        }
        else{
          let options =[];
          response.results.map((v, k)=>
            options.push({"value":v.id, "label":v.first_name+" "+v.last_name+" ("+v.role+")"})
          )
          thisApp.setState(
          {
            isLoaded: true,
            users:response.results,
            options:options
          },
          () => console.log(thisApp.state)
        );
        }
  });

}
  componentDidMount(){
    this.getData();
  }
  render(){
    const { selectedOption } = this.state;
    const options = this.state.options;

    return(
      <Modal show={this.props.show} onHide={()=>this.props.handleClose("midwife")}>
        <Modal.Header closeButton>
          <Modal.Title>Send new Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={e =>this.submit(e)}>
          <div className="col-md-12">
              <div className="form-group col-md-6">
                  <label>To</label>
                  <Select
                  isMulti
        value={selectedOption}
        onChange={this.handleChangeSelect}
        options={options}
      />
              </div>
          </div>
          <div className="col-md-12">
              <div className="form-group col-md-6">
                  <label>Message</label>
                  <textarea value={this.state.message} onChange={this.handleChange} className="form-control" name="message" placeholder="Type your message here"></textarea>
              </div>
          </div>
      <div className="col-md-12">
              <br className="clear-both"/>
                  <br className="clear-both"/>
                  <button type="submit" className="btn btn-primary">{this.state.loading ? "Adding Midwife" : "Submit"}</button>
                  <br className="clear-both"/>
                  </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default" onClick={()=>this.props.handleClose("compose")}>Close</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
