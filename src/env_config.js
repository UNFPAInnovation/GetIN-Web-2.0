const serverUrl = require('./config.json');


function env_config(){
    console.log(window.location.hostname)
    if (window.location.hostname==="dashboard.getinmobile.org" || window.location.hostname==="www.dashboard.getinmobile.org"){
        return serverUrl.BASE_URL;
    }
    else if(window.location.hostname==="dash.getinmobile.org"){
        return serverUrl.BASE_URL_TEST;
    }
    else if(window.location.hostname==="localhost"){
        return serverUrl.BASE_URL_TEST;
    }
    else{
        return serverUrl.BASE_URL_TEST;
    }
   
}
let addr = env_config();


export default  addr;