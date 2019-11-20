const api = require("./index");
const addr = require("../env_config").default;
const sessionStorage = window.sessionStorage;
const token = sessionStorage.getItem("token");

exports.login = function(data, callback) {
  api.post(
    addr + "/auth/login/",
    { "content-type": "application/json" },
    data,
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
        return callback(error);
      } else {
        console.log(JSON.stringify(response))
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
    { "content-type": "application/json", Authorization: "Token " + token },
    data,
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    { "content-type": "application/json", Authorization: "Token " + token },
    data,
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    { "content-type": "application/json", Authorization: "Token " + token },
    data,
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
        return callback(error);
      } else {
        return callback(null, response);
      }
    }
  );
};
exports.addAmbulance = function(data, callback) {
  api.post(
    addr + "/api/v1/users",
    { "content-type": "application/json", Authorization: "Token " + token },
    data,
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    {
       "content-type": "application/json",
       "Authorization": "Token "+token
   },function(error, response){
        //callback of the method here
        console.log("error", error);
         if(error){
            console.log(error);
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
   {
      "content-type": "application/json",
      "Authorization": "Token "+token
  },function(error, response){
       //callback of the method here
       console.log("error", error);
        if(error){
           console.log(error);
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
   {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
   api.get(addr+"/api/v1/followups?created_from="+from+"&created_to="+to,
   {
      "content-type": "application/json",
      "Authorization": "Token "+token
  },function(error, response){
       //callback of the method here
       console.log("error", error);
        if(error){
           console.log(error);
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
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    addr + "/api/v1/girls?created_from="+from+"&created_to="+to,
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    addr + "/api/v1/mapping_encounters?created_from="+from+"&created_to="+to,
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
     {
       "content-type": "application/json",
       Authorization: "Token " + token
     },
     function(error, response) {
       //callback of the method here
       console.log("error", error);
       if (error) {
         console.log(error);
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
    addr + "/api/v1/subcountys",
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    addr + "/api/v1/appointments?status="+status+"&created_from="+from+"&created_to="+to,
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    {
       "content-type": "application/json",
       "Authorization": "Token "+token
   },function(error, response){
        //callback of the method here
        console.log("error", error);
         if(error){
            console.log(error);
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
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    {
      "content-type": "application/json",
      Authorization: "Token " + token
    },
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
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
    { "content-type": "application/json", Authorization: "Token " + token },
    data,
    function(error, response) {
      //callback of the method here
      console.log("error", error);
      if (error) {
        console.log(error);
        return callback(error);
      } else {
        return callback(null, response);
      }
    }
  );
};
