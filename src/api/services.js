const api = require('./index');
const addr = require('../env_config').default;

exports.login =  function(data={}, callback){
    api.post(addr+"/auth/login/",{"content-type": "application/json",
    'Access-Control-Allow-Origin': true   
}, function(error, token){
        //callback of the method here
        console.log("error", error);
         if(error){
            console.log(error);
            return callback(error);
         }else{
            return callback(null, token);
         }
        });
}