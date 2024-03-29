const axios = require('axios');
exports.get =  function(requesturl="", headers={}, callback){
  let error_ = null;
  axios({
    method: 'get',
    url: requesturl,
    responseType: 'json',
    headers: headers,
  })
  .then(function(res){
    return callback(error_, res);
  })
  .catch(function (error) {
    error_ = error;
    return callback(error_);
  })
}
exports.html =  function(requesturl="", headers={}, callback){
  let error_ = null;
  let data_ = {};
  axios({
    method: 'get',
    url: requesturl,
    responseType: 'html',
    headers: headers,
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


exports.post =  function(requesturl="", headers={}, data_sent={}, callback){
  let error_ = null;
  let data_ = {};
  axios({
    method: 'post',
    url: requesturl,
    responseType: 'json',
    headers: headers,
    data:JSON.stringify(data_sent)
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