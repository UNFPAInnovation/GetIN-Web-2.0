const serverUrl = require('./config.json');


function env_config(){
    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //     // dev code
    //     return serverUrl.local_server;
    // }
    //  else if(process.env.NODE_ENV === 'production'  && window.location.hostname !=serverUrl.staging){
    //     // production code
    //     return serverUrl.live_server;
    // }
    // else if(window.location.hostname===serverUrl.staging){
    //     return serverUrl.staging_server;
    // }
    // else{
    //     return serverUrl.live_server;
    // }
    return serverUrl.BASE_URL;
}
let addr = env_config();;


export default  addr;