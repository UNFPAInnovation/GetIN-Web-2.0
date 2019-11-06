import React, { Component } from "react";
import { NavDropdown, MenuItem, DropdownButton, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
const alertifyjs = require("alertifyjs");
const service = require("../api/services");

export default class Messages extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [],
      messages_copy: [],
      isLoaded: true,
      loadingText: "Loading .."
    };
    this.getData = this.getData.bind(this);
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
      messages: [{
        "name": "Friederike",
        "userType": "Chew",
        "lastMessage": "Phasellus in felis.",
        "time": "2/3/2019"
      }, {
        "name": "Skippie",
        "userType": "Midwife",
        "lastMessage": "Aliquam sit amet diam in magna bibendum imperdiet.",
        "time": "11/23/2018"
      }, {
        "name": "Ilse",
        "userType": "Chew",
        "lastMessage": "Pellentesque at nulla.",
        "time": "10/4/2019"
      }, {
        "name": "Remy",
        "userType": "Chew",
        "lastMessage": "In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        "time": "1/2/2019"
      }, {
        "name": "Hagen",
        "userType": "Midwife",
        "lastMessage": "Pellentesque eget nunc.",
        "time": "6/22/2019"
      }, {
        "name": "Ranna",
        "userType": "Midwife",
        "lastMessage": "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
        "time": "10/28/2019"
      }, {
        "name": "Farrand",
        "userType": "Chew",
        "lastMessage": "Praesent blandit lacinia erat.",
        "time": "2/11/2019"
      }, {
        "name": "Yelena",
        "userType": "Chew",
        "lastMessage": "Aenean sit amet justo.",
        "time": "3/4/2019"
      }, {
        "name": "Veda",
        "userType": "Midwife",
        "lastMessage": "Suspendisse ornare consequat lectus.",
        "time": "1/11/2019"
      }, {
        "name": "Khalil",
        "userType": "Chew",
        "lastMessage": "Praesent id massa id nisl venenatis lacinia.",
        "time": "11/10/2018"
      }],
      messages_copy: [],
      loadingText: "Loading..."
    });
    // service.getHealthFacilities(function(error, response) {
    //   console.log(response);
    //   if (error) {
    //     console.log(error);
    //     thisApp.setState(
    //       {
    //         isLoaded: true,
    //         messages: []
    //       },
    //       () => console.log(thisApp.state)
    //     );
    //   } else {
    //     thisApp.setState(
    //       {
    //         isLoaded: true,
    //         messages: response.results
    //       },
    //       () => console.log(thisApp.state)
    //     );
    //   }
    // });
  }

  render() {
    let data = [];
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
                  <div className="col-md-4 borderRight">
                    <div className="header-min">
                        <button className="btn btn-primary">Compose message</button>
                    </div>
                    <div className="search">
                    <span>
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input placeholder="Search for a message, phone number or name" className="form-control"></input>
                    </div>
                    <div className="messageList">
                    {
                        this.state.messages.map((value, key)=>
                            <MessageList title={value.name} userType={value.userType} time={value.time} lastMessage={value.lastMessage} />
                        )
                    }
                        
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="header-min">
                    <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                        <div className="text">
                            <span className="title">{"Name 0701964728 (VHT)"}</span>
                        </div>
                    </div>
                    <div className="chat">
                            <ChatList ></ChatList>
                            <ChatList ></ChatList>
                            <ChatList ></ChatList>
                            <ChatList ></ChatList>
                            <ChatList ></ChatList>
                    </div>
                    <form class="sendSms col-md-12 form-inline">
                        <input className="form-control" placeholder="Type your message here"></input>
                        <button className="btn btn-primary">Send</button>
                    </form>
                  </div>
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
                    <span className="title">{this.props.title+" ("+this.props.userType+")"}</span>
                    <span className="msg">{this.props.lastMessage}</span>
                </div>
                <span className="time">{this.props.time}</span>
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
