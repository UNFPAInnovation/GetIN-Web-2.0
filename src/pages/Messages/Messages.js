import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSearch } from "@fortawesome/free-solid-svg-icons";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import {getData} from '../../utils/index';

const Fuse = require("fuse.js");



const MessageList = React.lazy(() => import("./List"));
const ComposeModal = React.lazy(() => import("./Compose"));

export default class Messages extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [],
      messages_copy: [],
      compose:false,
      isLoaded: false,
      loadingText: "Loading .."
    };
    this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.search = this.search.bind(this);
  }
  componentDidMount() {
  this.loadData();
}
loadData(){
  const thisApp = this;
getData({
  name:"listSms",
}, function(error, response){
  if(error){
      thisApp.setState({
          isLoaded:true,
      })
  }else{
      thisApp.setState({
          isLoaded:true,
          messages: response.results,
          messages_copy: response.results,
      })
  }
})
}
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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
                            <MessageList title={value.recipient.first_name+" "+value.recipient.last_name} phone={value.recipient.phone} userType={value.userType} time={value.created_at} lastMessage={value.message} />
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
