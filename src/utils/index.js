import moment from "moment";
const service = require("../api/services");
export const capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const prevMonthFirstDay = moment()
  .subtract(1, "months")
  .date(1)
  .local()
  .format("YYYY-MM-DD");
export const endOfDay = new Date().setHours(23, 59, 59, 999);
export const dateFormatter = function(cell) {
  return moment(new Date(cell)).format("Do MMM YY hh a");
};
export const enumFormatter = function(cell, row, enumObject) {
  return enumObject[cell];
};
export const ageFormatter = function(cell, row) {
  return moment().diff(row.girl.dob, "years");
};
export const trimesterFormatter = function(cell, row) {
  if (row.girl.trimester === 1) {
    return row.girl.trimester + "st";
  } else if (row.girl.trimester === 2) {
    return row.girl.trimester + "nd";
  } else if (row.girl.trimester === 3) {
    return row.girl.trimester + "rd";
  } else {
    return row.girl.trimester;
  }
};
export const nameFormatter = function(cell, row) {
  return (
    row.girl.first_name +
    " " +
    row.girl.last_name +
    " - " +
    row.girl.phone_number
  );
};
export const chewFormatter = function(cell, row) {
  return (
    row.user.first_name + " " + row.user.last_name + " - " + row.user.phone
  );
};

export const getData = function(action, callback) {
  switch (action.name) {
    case "Appointments":
      service.Appointments(action.status, action.from, action.to, function(
        error,
        response
      ) {
        if (error) {
          return callback(error);
        } else {
          return callback(null, response);
        }
      });
      break;
    case "deliveries":
      service.deliveries(
        action.delivery_location,
        action.from,
        action.to,
        function(error, response) {
          if (error) {
            return callback(error);
          } else {
            return callback(null, response);
          }
        }
      );
      break;
    case "users":
      service.users(
        action.role,
        function(error, response) {
          if (error) {
            return callback(error);
          } else {
            return callback(null, response);
          }
        }
      );
      break;
    case "getHealthFacilities":
      service.getHealthFacilities(function(error, response) {
        if (error) {
          return callback(error);
        } else {
          return callback(null, response);
        }
      });
      break;
      case "listSms":
          service.listSms(function(error, response) {
            if (error) {
              return callback(error);
            } else {
              return callback(null, response);
            }
          });
          break;
    default:
      service[action.name](action.from, action.to, function(error, response) {
        if (error) {
          return callback(error);
        } else {
          return callback(null, response);
        }
      });
      break;
  }
};
