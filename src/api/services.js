const api = require("./index");
const addr = require("../env_config").default;
const sessionStorage = window.sessionStorage;
const token = sessionStorage.getItem("token");
const OPTIONS = {
  "content-type": "application/json", Authorization: "Token " + token
};
const OPTIONS_UNSECURE = {
  "content-type": "application/json",
};

exports.login = function(data, callback) {
  api.post(
    addr + "/auth/login/",
    OPTIONS_UNSECURE,
    data,
    function(error, response) {
      if (error) {
        return callback(error);
      } else {
        let district = response.user && response.user.village && response.user.village.parish && response.user.village.parish.sub_county && response.user.village.parish.sub_county.county && response.user.village.parish.sub_county.county.district && response.user.village.parish.sub_county.county.district;
          sessionStorage.removeItem('district');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('token')
          sessionStorage.setItem('district', district.name);
          sessionStorage.setItem('username', response.user && response.user.username);
           sessionStorage.setItem('token', response.auth_token);
        return callback(null, response.auth_token);
      }
    }
  );
};
exports.addUser = function(data, callback) {
  api.post(
    addr + "/auth/register/",
    OPTIONS,
    data,
    function(error, response) {
      if (error) {
        return callback(error);
      } else {
        return callback(null, response);
      }
    }
  );
};
exports.addChew = function(data, callback) {
  api.post(
    addr + "/api/v1/users",
    OPTIONS,
    data,
    function(error, response) {
      if (error) {
        return callback(error);
      } else {
        return callback(null, response);
      }
    }
  );
};
exports.addMidwife = function(data, callback) {
  api.post(
    addr + "/api/v1/users",
    OPTIONS,
    data,
    function(error, response) {
      if (error) {
        return callback(error, response);
      } else {
        return callback(null, response);
      }
    }
  );
};
exports.addAmbulance = function(data, callback) {
  api.post(
    addr + "/api/v1/users",
    OPTIONS,
    data,
    function(error, response) {
      if (error) {
        return callback(error);
      } else {
        return callback(null, response);
      }
    }
  );
};

exports.verifyToken = function(callback) {
  api.get(
    addr + "/auth/me/",
    OPTIONS,
    function(error, response) {
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Not authorized, please login");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};

exports.usersChew = function(callback) {
  api.get(
    addr + "/api/v1/chews",
    OPTIONS,function(error, response){
         if(error){
            return callback(error);
         }else{
              if (response.status != 200) {
                 return callback("Couldnt get chews");
             }
              else{
                return callback(null, response.data);
              }
            
         }
        });
}
exports.getHealthFacilities =  function(callback){
   api.get(addr+"/api/v1/healthfacilities",
   OPTIONS,function(error, response){
        if(error){
           return callback(error);
        }else{
             if (response.status != 200) {
                return callback("Couldnt get health facilities");
            }
             else{
               return callback(null, response.data);
             }
           
        }
       });
}

exports.usersMidwives =  function(callback){
   api.get(addr+"/api/v1/midwives",
   OPTIONS,
    function(error, response) {
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Couldnt get chews");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};
exports.usersMidwives = function(callback) {
  api.get(
    addr + "/api/v1/midwives",
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Couldn't get midwives");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};

exports.usersAmbulanceDrivers = function(callback) {
  api.get(
    addr + "/api/v1/ambulances",
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Couldn't get ambulance drivers");
        } else {
          return callback(null, response.data);
        }
      }
       });

};

exports.followUps =  function(from, to, callback){
   api.get(addr+"/api/v1/followups?created_from__gte="+from+"&created_to__lte="+to,
   OPTIONS,function(error, response){
       //callback of the method here
        if(error){
           return callback(error);
        }else{
             if (response.status != 200) {
                return callback("Couldnot get follow ups");
            }
             else{
               return callback(null, response.data);
             }
           
        }
       });
}
exports.getVillages = function(callback) {
  api.get(
    addr + "/api/v1/villages",
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Couldnot get subcounties");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};
exports.mappedGirls = function(from, to, callback) {
  api.get(
    addr + "/api/v1/girls?created_from__gte="+from+"&created_to__lte="+to,
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Couldnot get mapped girls");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};
// Map encounter introdudced by backend to enable show more fields on mapped girls

exports.mappedGirlsEncounter = function(from, to, callback) {
  api.get(
    addr + "/api/v1/mapping_encounters?created_from__gte="+from+"&created_to__lte="+to,
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Couldnot get mapped girls");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};

exports.deliveries = function(delivery_location, from, to, callback) {
   api.get(
     addr + "/api/v1/deliveries?delivery_location="+delivery_location+"&date_from="+from+"&date_to="+to,
     OPTIONS,
     function(error, response) {
       //callback of the method here
       if (error) {
         return callback(error);
       } else {
         if (response.status != 200) {
           return callback("Failed get deliveries");
         } else {
           return callback(null, response.data);
         }
       }
     }
   );
 };
exports.getSubCounties = function(callback) {
  api.get(
    addr + "/api/v1/subcounties",
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Couldnot get subcounties");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};

exports.getHealthFacilities = function(callback) {
  api.get(
    addr + "/api/v1/healthfacilities",
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Couldnot get subcounties");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};

exports.getParishes = function(callback) {
  api.get(
    addr + "/api/v1/parishes",
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Couldnot get parishes");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};


exports.Appointments = function(status, from, to, callback) {
  api.get(
    addr + "/api/v1/appointments?status="+status+"&created_from__gte="+from+"&created_to__lte="+to,
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Couldnot get appointments");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};


exports.users = function(role, callback) {
  api.get(
    addr + "/api/v1/users?role="+role,
    OPTIONS,function(error, response){
        //callback of the method here
         if(error){
            return callback(error);
         }else{
              if (response.status != 200) {
                 return callback("Couldnt get users");
             }
              else{
                return callback(null, response.data);
              }
            
         }
        });
}

exports.listSms = function(callback) {
  api.get(
    addr + "/api/v1/sms",
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Could not get sent sms");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};

exports.getAllUsers = function(callback) {
  api.get(
    addr + "/api/v1/users",
    OPTIONS,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        if (response.status != 200) {
          return callback("Could not get users");
        } else {
          return callback(null, response.data);
        }
      }
    }
  );
};

exports.sendSms = function(data, callback) {
  api.post(
    addr + "/api/v1/sms",
    OPTIONS,
    data,
    function(error, response) {
      //callback of the method here
      if (error) {
        return callback(error);
      } else {
        return callback(null, response);
      }
    }
  );
};