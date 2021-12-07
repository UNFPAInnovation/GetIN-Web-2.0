## GetIn WebClient Documentation
You can find detailed documentation of the different modules of the application that have heavy business logic and also those that are often reused.

### Important Information
You are required to have a practical understanding of JavaScript and React.js to help you easily understand the codebase so as to make changes/contributions.

Feel free to skill up on [react.js](https://reactjs.org/docs/getting-started.html) if you need to;

### Table of Contents
| Number       | Section                       |
|:-------------|:------------------------------|
| 1            | - [Making API Requests](/src/Docs/documentation.md#making-api-requests-to-the-getin-backend)         |
| 2            | - [State Management](/src/Docs/documentation.md#state-management) |
| 3            | - [Browser Routing](/src/Docs/documentation.md#browser-routing)   |
| 4            | - [Reusable App Components](/src/Docs/documentation.md#common-project-components) |
| 5            | - [Testing the App](/src/Docs/documentation.md#testing-app) |



## Making API Requests to the GetIn backend
This Application uses Axios to perform CRUD Operations. Requests are made to the GetIn Backend API endpoints that are provided via the Swagger Docs of the API which can be found [here](https://backend.getinmobile.org/).

### Axios Helper Functions
The application code base has a section with helper functions that can be resued to make requests to the applications backend and can be found via the link below;
> `src/api/index.js`

```bash
|-- src
    |
    |-- api 
    |   |-- index.js '<------------- ** Axios Helper Functions in this file'
    |   |-- services.js
    |
```

### Get Requests
Here is the get request helper function
```js
// This is the get function
// It takes 3 parameters i.e requestUrl, headers and a Callback function
// requesturl parameter represents the url to which the request is made to
// headers parameter is a object to which the request headers are added such as Content-Type and Authorization
// callback parameter is a callback function which is run based on the response from the backend - (the callback function expects two parameters ie. error and response)

exports.get =  function(requesturl="", headers={}, callback){
  let error_ = null;
  axios({
    method: 'get', 
    // method property states the HTTP request to made
    url: requesturl,
    responseType: 'json',
    // reponseType is set to json so that the response we get from the database is of a json format 
    headers: headers,
  })
  .then(function(res){
    //   res represents the response from the backend 
    return callback(error_, res);
  })
  .catch(function (error) {
    error_ = error;
    return callback(error_);
  })
}
```

### Post Requests
Here is the post request helper function, used to create new entries (new users or new health facilites) into the database.
```js
// This is the post function
// It takes 4 parameters i.e requestUrl, headers and a Callback function
// requesturl parameter represents the url to which the request is made to
// headers parameter is a object to which the request headers are added such as Content-Type and Authorization which should include the access token
// data_sent parameter object which holds the data which is to be posted to the backend.
// callback parameter is a callback function which is run based on the response from the backend - (the callback function expects two parameters ie. error and response)

exports.post =  function(requesturl="", headers={}, data_sent={}, callback){
  let error_ = null;
  let data_ = {};
  axios({
    method: 'post',
    url: requesturl,
    responseType: 'json',
    headers: headers,
    data:JSON.stringify(data_sent)
    // data to be sent to the backend is converted into JSON with the JSON.stringify method
  })
  .then(function(res){
    data_ = res.data;
    return callback(error_, data_);
  })
  .catch(function (error) {
    error_ = error;
    return callback(error_);
  })
}
```

### Patch Requests
Here is the patch request helper function, used to make updates to the data in the backend.
```js
// This is the patch function
// It takes 4 parameters i.e requestUrl, headers and a Callback function
// requesturl parameter represents the url to which the request is made to
// headers parameter is a object to which the request headers are added such as Content-Type and Authorization which should include the access token
// data_sent parameter object which holds the data which is to be posted to the backend.
// callback parameter is a callback function which is run based on the response from the backend - ( the callback function expects two parameters ie. error and response)

exports.patch = function (
  requesturl = "",
  headers = {},
  data_sent = {},
  callback
) {
  let error_ = null;
  let data_ = {};
  axios({
    method: "patch",
    url: requesturl,
    responseType: "json",
    headers: headers,
    data: JSON.stringify(data_sent),
  })
    .then(function (res) {
      data_ = res.data;
      return callback(error_, data_);
    })
    .catch(function (error) {
      error_ = error;
      return callback(error_);
    });
};
```

### Request utility functions
The helper functions defined in the index.js file are utilised in the services.js file to create utility functions that allow you perform many requests and reuse the same functionality any where in the application.
  
```bash
|-- src
    |
    |-- api 
    |   |-- index.js 
    |   |-- services.js '<------------- ** CRUD ops utility functions'
    |
```

### Other utility Functions
There are other functions that you can reuse in the the application, these are found in the utils folder

```bash
|-- src
    |
    |-- utils
        |-- getData.js '<----------- ** Contains the getData custom hook that provides data to the dashboard landing page'
        |-- index.js '<------- ** Contains App utility functions'
```

## State Management

The Application uses both local and Global state to manage data.
* Global State;
    - Global state is created using react's [Context API](https://reactjs.org/docs/context.html). The entire application is wrapped with the Global context provider which makes global state values accessible to all components in this app

* Local State;
    - Most components utilise local state and props to manage data.

Global State context folder;
```bash
|
|-- src
    |
    |-- context '<---------------------------- ** Global State/Context folder'
    |   |-- AppReducer.js
    |   |-- GlobalState.js
    |
   
``` 
### Data in Global State
Code can be found here;
> `src/context/GlobalState.js`
```js
const initialState = {
    district:'All Districts',
    // if district is set to "ALL Districts" then data display on dashboard will be an aggregation of data from all districts
    districtId: '',
    // This is added in to the district query parameter when making get requests for a paticular district 
    change:false,
    // This determines whether the golbal state changed so that if true, the app reloads.
    dateFrom: fromInitialDate,
    // Captures the initial date which is set in the helper functions found in the utils folder
    dateTo: moment(endOfDay).local().format("YYYY-MM-DD")
    // Captures the current date and is used in the date filters of the app 
}
```  

The application receives Global state context via the Global State provider that wraps the entire app in the main component file.
> `src/App.js`

```js
class App extends Component {
  ...
  render() {
    return (
      <GlobalProvider>
        ...          
        // All App components are children that receive the Global state object
        ...
      </GlobalProvider>
    );
  }
}
```
## Browser Routing
Browser routing is handled using react's browser router, check out the documentation of that react routing library [here](https://v5.reactrouter.com/web/api/BrowserRouter).

## Common Project Components

### Resuable Components
Most of the apps resuable components are found in the components folder that can be accessed via this link;
> `src/components`

```bash
|
|-- src
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
```

### Card component
This Component can be found via his link:
> `src/components/Card.js`

The card component is used to display data on the dashboard's landing page and it takes 6 props as shown in the table below;

| Propname       | Type         | Default         | Description                      |
|:---------------|:-------------|:----------------|:---------------------------------|
| color          | string       | required        | - defines the color of the card  |
| icon           | string       | required        | - font awesome icon class name   |
| title          | string       | required        | - title of the card              |
| number         | number       | required        | - Data variable count from backend (follow ups, mapped women and Deliveries)|
| direction      | string       | required        | - either up or down              |
| rate           | string       | required        | - percentage rise of fall in data variable  |

Illustration of Component;

![card component](/src/Docs/Images/card_component.png)


### Chart Card Component
This Component can be found via his link:
> `src/components/ChartCard.js`

This component is used to display charts created using the highcharts react library. It uses only 2 props as shown below;

| Propname       | Type         | Default         | Description                      |
|:---------------|:-------------|:----------------|:---------------------------------|
| title          | string       | required        | - defines the title of the card  |
| content        | HighChartsReact component | required | - Component of a chart created using HighChartsReact library|

Usage Illustration of the card component on the dashboard

![Chartcard_Component example](/src/Docs/Images/chartcard_component.png)

### Creating a Chart using the HighchartsReact
- [Checkout this demo project to learn how it's done](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/drilldown/basic/)
- [Read the HighCharts documentation](https://api.highcharts.com/highcharts/)

## Check Component
This Component can be found via his link:
> `src/components/Check.js`

This component renders a checked or unchecked input checkbox element based whether the state prop is true or false respectively.

| Propname       | Type         | Default         | Description                      |
|:---------------|:-------------|:----------------|:---------------------------------|
| state          | boolean      | required        | - state of the columns shown in the data tables |

```js
export default function Check(props) {
      return (
          <div className="checkboxWrapper">
            <div className="disabler"></div>
            {props.state === false ? (
              <input type="checkbox" checked={true} />
            ) : (
              <input type="checkbox" checked={false} />
            )}
          </div>
      )
  }
```

Usage Illustration in the data tables under the manageColumns dropdown;

![check component](/src/Docs/Images/check_component.PNG)


### ErrorBoundary and Suspense Components
The errorboundary and suspense components are used in the app.js file, 
> `src/App.js`

**Error boundaries** are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

Learn more about the ErrorBoundary Component [here](https://reactjs.org/docs/error-boundaries.html)

Usage of ErrorBoundary codebase

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <div className="container-custom text-center">
            <h1 className="page-header text-center">Something went wrong.</h1>
            <a className="btn btn-primary text-center" href="/">
              Reload
            </a>
          </div>
        </React.Fragment>
      );
    } else {
      return this.props.children;
    }
  }
}
```

**A Suspense** component that lets you “wait” for some code to load and declaratively specify a loading state (like a spinner) while we’re waiting:
Learn more about the Suspense component [here](https://reactjs.org/docs/concurrent-mode-suspense.html)

### SF Component
This component is used in the app.js component to rendering fallback UI incase that's loaded fails, it wraps all components to be rendered in the app.js Component.

```js
class SF extends Component {
  render() {
    return (
      <ScrollToTop>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="loading text-center">
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <span>Loading...</span>
              </div>
            }
          >
            <Layout>{this.props.children}</Layout>
          </Suspense>
        </ErrorBoundary>
      </ScrollToTop>
    );
  }
}
```

### Lazy Loading App Components
For optimization and faster page loads, not all components are loaded during the first render. 
Components are rendered dynamically and are loaded only when they are needed:
Read more about lazy loading [here](https://reactjs.org/docs/code-splitting.html#reactlazy):

```js
  const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
```

## Testing App
You are required to run tests in this application using the `run test` command in your terminal before building the app.

The Test Suits in the app can be found the folders named `__tests__` as shown below;

```bash
  |-- Users
  |   |-- Ambulance.js
  |   |-- Midwife.js
  |   |-- Users.js
  |   |-- VHT.js
  |-- __tests__   '<------------------ * Tests Folder'
      |-- AncVisits.test.js
      |-- Dashboard.test.js
      |-- Deliveries.test.js
      |-- FollowUps.test.js
      |-- HealthFacilities.test.js
      |-- Login.test.js
      |-- MappedGirls.test.js
      |-- Users.test.js

```
Testing Libraries / packages used for testing the app are;
- [React Testing Library](https://testing-library.com/docs/)
- [Jest](https://jestjs.io/docs/tutorial-react)




















