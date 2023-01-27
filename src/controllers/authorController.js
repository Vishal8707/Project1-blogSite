const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");
const validation = require("../validator/validation");
let { isValidName, isValidEmail } = validation;

//post Api for creating author >>>

const createAuthor = async function (req, res) {
  try {
    const data = req.body;
    let { fname, lname, title, email, password } = data;
    
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: "false", message: "All fields are mandatory" });
    }
    

    //Validation for fname
    if (!fname || fname == "") {
      return res
        .status(400)
        .send({ status: false, msg: "fname must be present " });
    }
    //Validation for lname
    if (!lname || lname == "") {
      return res
        .status(400)
        .send({ status: false, msg: "lname must be present" });
    }
    //Validation for title
    if (!title || title == "") {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Title is Missing or does not have a valid input",
        });
    }

    if (title != "Mr" && title != "Mrs" && title != "Miss") {
      return res
        .status(400)
        .send({ status: false, msg: "Title can only be Mr Mrs or Miss" });
    }
    if (!email || email =="") {
      return res
        .status(400)
        .send({ status: false, msg: "email is compulsory" });
    }
    if (!password || password == "") {
      return res
        .status(400)
        .send({ status: false, msg: "Password is mandatory" });
    }
    if (!isValidName(fname)) {
      return res.status(400).send({
        status: "false",
        message: "first name must be in alphabetical order",
      });
    }
    if (!isValidName(lname)) {
      return res
        .status(400)
        .send({
          status: "false",
          message: "last name must be in alphabetical order",
        });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: "false", message: "provide a valid emailId" });
    }

    let checkEmail = await authorModel.findOne({ email: email });

    if (checkEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "email is already registered " });
    }
    
    const result = await authorModel.create(data);
    res
      .status(201)
      .send({ status: true, msg: "new author is created", data: result });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

//________post api: Login author

let loginAuthor = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (Object.keys(req.body).length == 0) {
      // Object.keys () array of keys will return
      return res
        .status(400)
        .send({ status: false, message: "Please provide email and password" });
    }
    let checkData = await authorModel.findOne({
      email: email,
      password: password,
    });
    if (!checkData) {
      return res
        .status(400)
        .send({ status: false, msg: "email or the password is not correct" });
    }
    let token = jwt.sign(
      {
        userId: checkData._id.toString(),
      },
      "functionup-project-very-secret-key"
    );
    res.setHeader("x-api-key", token);
    res.send({ status: true, token: token });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;
