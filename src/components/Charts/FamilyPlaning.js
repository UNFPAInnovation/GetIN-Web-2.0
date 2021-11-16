import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
const service = require('../../api/services');

const subCountyData = {
    // labels: ['Adumi', 'Opa', 'Inde'],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'SMT/Pills',
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
        backgroundColor:'#1E8449',
        hoverBackgroundColor:'#1E8449',
        lineTension:0.5
      },
      {
        label: 'PMs',
        data: [344,	545,	943,	158,	469,	248,	278,	307,	325,	4,	0,	0],
        backgroundColor:'#689F38',
        hoverBackgroundColor:'#689F38',
        lineTension:0.5
      },
      {
        label: 'Implants',
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
        backgroundColor:'#C0CA33',
        hoverBackgroundColor:'#C0CA33',
        lineTension:0.5
        
      }
    ]
  }

  export default class FamilyPlaning extends React.Component {
    render(){
        return(
            <React.Fragment>
            <Bar
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