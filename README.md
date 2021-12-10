# GetIN Dashboard Web Client
[![Node.js CI](https://github.com/UNFPAInnovation/GetIN-Web-2.0/actions/workflows/node.js.yml/badge.svg)](https://github.com/UNFPAInnovation/GetIN-Web-2.0/actions/workflows/node.js.yml) ![Netlify](https://img.shields.io/netlify/5d0e151d-eb8f-4dd1-a520-858df83590fb?label=Build) ![GitHub last commit (branch)](https://img.shields.io/github/last-commit/UNFPAInnovation/GetIN-Web-2.0/master?label=Last%20commit) ![GitHub contributors](https://img.shields.io/github/contributors/UNFPAInnovation/GetIN-Web-2.0)

![GetIn Mobile App](https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/jafgg9lgiaamswfzfw6m)

## Introduction
> The GetIN project aims at strengthening the community referral system with a particular  focus on the most-at-risk pregnant girls 12 to 19 years who are less likely to seek health care if no deliberate follow up system is in place.
> It is a community referral system (mobile and web) to support outreach to pregnant girls in rural communities in Uganda.

## Getting Started

| Number       | Section                       |
|:-------------|:------------------------------|
| 1            | - [Local Environment Setup](/README.md#local-environment-setup)         |
| 2            | - [Project File Structure](/README.md#project-file-structure) |
| 3            | - [Useful Links](/README.md#useful-links-and-external-services) |
| 4            | - [Project Documentation ](/README.md#documentation) |
| 5            | - [App Deployment Instructions](/README.md#deployment-guide-to-aws-linux) |
| 6            | - [Contributing](/README.md#contributing) |



### Local environment setup
These are the setps you are to follow to spin up this application from a local development environment;

1. `clone` this repository.
2. `cd` into project folder.
3. run `npm install` to install all dependencies.(you must have [node](https://nodejs.org) installed)
4. Run `npm start` to spin up the dashboard.


### Main Tools and Dependencies
[Learn more about dependencies used in this project](https://github.com/UNFPAInnovation/GetIN-Web-2.0/blob/master/package.json)

### Project File structure
```bash

|-- package.json
|-- README.md
|-- public '<--------------------------------- ** public assets folder'
|   |-- index.html
|
|-- src
    |-- App.js '<----------------------------- ** the main Component of the app'
    |-- config.json
    |-- env_config.js
    |-- index.js 
    |
    |-- api '<---------------------------- ** GetIn Backend API request utilities'
    |   |-- index.js
    |   |-- services.js
    |
    |-- assets 
    |   |-- fonts
    |   |-- images
    |
    |-- components '<---------------------------- ** Resuable Components'
    |   |-- Card.js
    |   |-- ChartCard.js
    |   |-- Check.js
    |   |-- Footer.js
    |   |-- Header.js
    |   |-- Layout.js
    |   |-- NotFound.js
    |   |-- ScrollToTop.js
    |   |-- Seo.js
    |   |-- SideNav.js
    |   |-- Charts
    |       |-- AgeGroupOfMappedGirlsPieChart.js
    |       |-- chartOptions.js
    |       |-- DeliveriesPerSubCounty.js
    |       |-- FamilyPlaning.js
    |       |-- MappedGirlsBySubCounty.js
    |       |-- MappedGirlsPerSubcountyBarChart.js
    |       |-- utils
    |           |-- utils.js
    |
    |-- context '<---------------------------- ** Global State/Context folder'
    |   |-- AppReducer.js
    |   |-- GlobalState.js
    |
    |-- pages   '<---------------------------- ** Dashboard Components'
    |   |-- FollowUps.js
    |   |-- HealthFacilities.js
    |   |-- Login.js
    |   |-- MappedGirls.js
    |   |-- ANC
    |   |   |-- AncVisits.js
    |   |   |-- Attended.js
    |   |   |-- Completed.js
    |   |   |-- ExpandableTable.js
    |   |   |-- Expected.js
    |   |   |-- Missed.js
    |   |
    |   |-- Dashboard
    |   |   |-- Dashboard.js
    |   |   |-- components
    |   |       |-- AgeGroupOfMappedGirlsBarChart
    |   |       |   |-- index.js
    |   |       |-- DeliveriesCard
    |   |       |   |-- index.js
    |   |       |-- FollowUpsCard
    |   |       |   |-- index.js
    |   |       |-- MappedGirlsCard
    |   |       |   |-- index.js
    |   |       |-- MappedGirlsPerDistrict
    |   |       |   |-- index.js
    |   |       |-- MappedGirlsPerSubcountyBarChart
    |   |           |-- index.js
    |   |
    |   |-- Deliveries
    |   |   |-- Deliveries.js
    |   |   |-- HealthFacility.js
    |   |   |-- Home.js
    |   |-- Messages
    |   |   |-- Compose.js
    |   |   |-- List.js
    |   |   |-- Messages.js
    |   |-- Settings  '<---------------------------- ** Admin user Settings components'
    |   |   |-- Districts.js
    |   |   |-- HealthFacilities.js
    |   |   |-- index.js
    |   |   |-- Add
    |   |   |   |-- HealthFacility.js
    |   |   |   |-- User.js
    |   |   |-- Update
    |   |   |   |-- Admin.js
    |   |   |   |-- ChangePassword.js
    |   |   |
    |   |   |-- Users
    |   |       |-- Admin.js
    |   |       |-- GetIN
    |   |           |-- Ambulance.js
    |   |           |-- Dho.js
    |   |           |-- Midwife.js
    |   |           |-- Users.js
    |   |           |-- VHT.js
    |   |           |-- Add
    |   |           |   |-- Ambulance.js
    |   |           |   |-- Dho.js
    |   |           |   |-- Midwife.js
    |   |           |   |-- Vht.js
    |   |           |-- Update
    |   |               |-- Ambulance.js
    |   |               |-- Dho.js
    |   |               |-- Midwife.js
    |   |               |-- Vht.js
    |   |-- Users  
    |       |-- Ambulance.js
    |       |-- Midwife.js
    |       |-- Users.js
    |       |-- VHT.js
    |
    |-- styles '<---------------------------- ** Style sheets folder'
    |   |-- Footer.scss
    |   |-- global.scss
    |   |-- Header.scss
    |   |-- Login.scss
    |
    |-- utils '<---------------------------- ** App Helper functions'
        |-- getData.js
        |-- index.js

```


## Useful Links and External Services

| API Documentation       | Live Dashboard                  | Test Dashboard          |
|:----------------------- |:--------------------------------|:------------------------|
| [backend.getinmobile.org](https://backend.getinmobile.org/)| [dash.getinmobile.org](http://dash.getinmobile.org/) | [testdash.getinmobile.org](http://testdash.getinmobile.org/) |


1. [React-Bootstrap Documentation](https://react-bootstrap-v3.netlify.app/)  
    - React-Bootstrap is used for the Styles and Layout of the dashboard.
2. [Bootstrap Table](https://allenfang.github.io/react-bootstrap-table/docs.html)
    - Bootstrap Table is used to represent application data in tables. 
2. [Moment.js Documentation](https://momentjs.com/docs/)
    - Helps with date and time caculation
3. [Alertify.js Documentation](https://alertifyjs.com/guide.html)
    - Displays alert messages when users login/logout or when posting data to the backend
4. [HighCharts Docs](https://api.highcharts.com/highcharts/)
    - It's a library that enables visualization of application data with graphs and charts
5. [Axios Documentation](https://axios-http.com/docs/intro) 
    - Library that takes care of API requests made to the GetBackend server in the application


## Documentation
Find the detailed documentation of components and utility functions [here](/src/Docs/documentation.md)


## Deployment guide to AWS (Linux)

Ensure that you have the server pem key file in any of your directories.

Connect to the GetIN instance on aws

> ### `cd ~/Directory_With_Pem_Key && ssh -i filename.pem ubuntu@server_ip`

Locate the apache document root folder with dashboard

> ### `cd /var/www/html/GetIN-Web-2.0`

Pull latest changes from production branch

> ### `git pull origin branch`

Run a production build

> ### `sudo yarn run build`


## Contributing
- ⇄ Pull/Merge requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.
- Pull requests must be accompanied by passing automated tests (`npm test`).


## Authors

* [Outbox (U) LTD](https://www.outbox.co.ug)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

