const serverUrl = require('./config.json');


function env_config(){
    if (window.location.hostname==="dash.getinmobile.org" || window.location.hostname==="www.dash.getinmobile.org"){
        return serverUrl.BASE_URL;
    }
    else if(window.location.hostname==="testdash.getinmobile.org"){
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