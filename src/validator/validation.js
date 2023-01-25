const mongoose = require('mongoose');

//Name Validation

const isValidName = function (name) {
  const nameRegex = /^[a-zA-Z ]+$/;
  return nameRegex.test(name);
};

//Email Validation

const isValidEmail = function (email) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const isValidObjectId = function (objectId){
  return mongoose.Types.ObjectId.isValid(objectId);
};

module.exports = {
  isValidName,
  isValidEmail,
  isValidObjectId,
  
}
