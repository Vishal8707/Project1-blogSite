const authorModel  = require("../models/authorModel");
const jwt = require("jsonwebtoken");
const validation = require("../validator/validation");
let {isEmpty, isValidName, isValidEmail, isValidPassword} = validation;
//post Api for creating author >>>

const createAuthor = async function (req, res) {
try {
const data = req.body;
// if (Object.keys (data).length == 0) {
// return res.status (400).send({ status: "false", message: "All fields are mandatory" });
// }
let {fname, lname, title, email, password } = data;
// if (!isEmpty (fname)) {
// return res.status (400).send({ status: false, msg: "fname must be present " });
// }
// if (!isEmpty (lname)) {
// return res.status (400).send({ status: false, msg: "lname must be present" });
// }
// //Validation for title
// if (!isEmpty (title)) {
// return res.status (400).send({status: false,msg: "Title is Missing or does not have a valid input"});
// }
// else {
//     if (title != "Mr" && title != "Mrs" && title != "Miss") {
//         return res.status (400).send({status: false,msg: "Title can only be Mr Mrs or Miss"});
//     }
//     if (!isEmpty(email)) {
//       return res.status (400).send({status: false, msg: "email is compulsory"});
//     }
//     if (!isEmpty (password)) {
//       return res.status (400).send({ status: false, msg: "Password is mandatory"}); 
//     }
//     if(!isValidName (fname)) {
//         return res.status (400).send({status: "false", message: "first name must be in alphabetical order"
//     });
//     }
//       if (!isValidName (lname)) {
//         return res.status (400).send({status: "false", message: "last name must be in alphabetical order"});
//       }
    //   if(!isValidPassword (password)) {
    //     return res.status (400).send({status: "false",message: "Password must contain atleast 8 character"
    //   });

    if (!isValidEmail (email)) {
        return res.status (400).send({status: "false", message: "provide a valid emailId"});
      }
      let checkEmail = await authorModel.findOne({email: email});
      if(checkEmail) {
        return res.status (400).send({status: false, msg: "email is already registered "});
      }
      const result = await authorModel.create (data);
      res.status (201).send({ status: true, msg: "new author is created", data: result });
    }

    catch (err) { I
      return res.status (500).send({ msg: err.message });
    }
}
 

    
    

// const createAuthor = async function (req, res){
//     const data = req.body
//     const email = data.email
//     const checkEmail = await authorModel.findOne({email:email})
//     if(checkEmail) return res.send({msg:"not uniqe email"})
//     const saveData = await authorModel.create(data)
//     res.status(201).send({status: true, msg: saveData})
//}



module.exports.createAuthor = createAuthor


