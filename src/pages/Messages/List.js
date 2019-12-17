import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";
export default class MessageList extends Component{
    render(){
        return(
            <div className="item">
                <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                <div className="text">
                    <span className="title">{this.props.title}<br/>
                    {this.props.phone}
                    </span>
                    <span className="msg">{this.props.lastMessage}</span>
                </div>
                <span className="time">{moment(this.props.time).local().format("Do-MMM-YYYY HH:mm")}</span>
            </div>
        );
    }
}