// let jwt = require("jsonwebtoken");
// const blogModel = require("../models/blogModel");

// // Authentication:->>>
// const authentication = async function (req, res, next) {
// try { 
// // check token : -
// let token = req.headers ["x-api-key"];
// if (!token) req.headers ["x-api-key"];
// if (!token)
// return res.status (401).send({ status: false, msg: "Token Must be Filled" });
// // verify token :
// let decodedToken = jwt.verify(token, "project1");
// if (!decodedToken)
// return res.status (400).send({status: false,msg: "Token Not Verified Please Enter Valid Token"})
// req.token = decodedToken;
// next();
// } catch (err) {
// res.status (500).send({ status: false, msg: err.message });
// }
// };