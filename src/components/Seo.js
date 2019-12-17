import React from 'react';
import {Helmet} from "react-helmet";
export default function Seo(props){
    return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="title" content={props.title}/>
      <meta name="description" content={props.description}/>
      <meta name="keywords" content={props.keywords}/>
      <meta name="robots" content="index, follow"/>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <meta name="language" content="English"/><meta name="revisit-after" content="1 days"/>
      <meta name="author" content="GetIN, Outbox Uganda, outbox.co.ug"/><link rel="canonical" href="https://dash.getinmobile.org/" />
    </Helmet>);    
  }