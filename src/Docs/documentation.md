## GetIn WebClient Documentation
You can find detailed documentation of the different modules of the application that have heavy business logic and also those that are often reused.

### Important Information
You are required to have a practical understanding of JavaScript and React.js to help you easily understand the codebase so as to make changes/contributions.

Feel free to skill up on react.js if you need to;

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
    - Global state is created using react's [Context API](https://reactjs.org/docs/context.html). The entire Application wrapped with the Global context provider which makes global state values accessible to all components in this app

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
## Data in Global State
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

