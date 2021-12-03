# GetIN Dashboard Web Client
![GetIn Mobile App](https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/jafgg9lgiaamswfzfw6m)

## Introduction
> The GetIN project aims at strengthening the community referral system with a particular  focus on the most-at-risk pregnant girls 12 to 19 years who are less likely to seek health care if no deliberate follow up system is in place.
> It is a community referral system (mobile and web) to support outreach to pregnant girls in rural communities in Uganda.

## Getting Started

### SetUp
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
1. GetIn backend API Documentation * [backend.getinmobile.org](https://backend.getinmobile.org/)

2. GetIn Live Dashboard * [dash.getinmobile.org](http://dash.getinmobile.org/)

3. GetIn Test Dashboard * [testdash.getinmobile.org](http://testdash.getinmobile.org/)


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


## Authors

* [Outbox (U) LTD](https://www.outbox.co.ug)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

