import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
const service = require('../../api/services');

const subCountyData = {
    // labels: ['Adumi', 'Opa', 'Inde'],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Adumi',
        data: [100,
            150,
            200,
            250,
            300,
            350,
            400,
            450,
            500,
            550,
            0,
            0],
        backgroundColor:'rgba(255,112,67,0.4)',
        hoverBackgroundColor:'rgba(255,112,67,0.8)',
        lineTension:0.5
      },
      {
        label: 'Opa',
        data: [344,	545,	943,	158,	469,	248,	278,	307,	325,	4,	0,	0],
        backgroundColor:'rgba(199,0,57,0.4)',
        hoverBackgroundColor:'rgba(199,0,57,0.8)',
        lineTension:0.5
      },
      {
        label: 'Inde',
        data: [100,
            150,
            200,
            450,
            300,
            350,
            400,
            450,
            300,
            550,
            0,
            0],
        backgroundColor:'rgba(255,195,0,0.4)',
        hoverBackgroundColor:'rgba(255,195,0,0.8)',
        lineTension:0.5
        
      }
    ]
  }

  export default class Deliveries extends React.Component {
    render(){
        return(
            <React.Fragment>
            <Line
          data={subCountyData}
          width={100}
          height={400}
          options={{
            maintainAspectRatio: false,
            elements: {
                    point:{
                        radius: 2
                    }
                }
          }}
        />
        </React.Fragment>
        );
    }

  }