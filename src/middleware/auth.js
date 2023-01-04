let jwt = require("jsonwebtoken");
const blogModel = require("../models/blogsModel");

// // Authentication:->>>

const authentication = async function (req, res, next) {
try { 
// check token : -
let token = req.headers["x-auth-token"];
if (!token) req.headers["x-auth-token"];
if (!token)
return res.status (401).send({ status: false, msg: "Token Must be Filled" });

// // verify token :

let decodedToken = jwt.verify(token, "functionup-project-very-secret-key");
if (!decodedToken)
return res.status (400).send({status: false,msg: "Token Not Verified Please Enter Valid Token"})
req.token = decodedToken;

next();

} catch (err) {
res.status (500).send({ status: false, msg: err.message });
}
};

// // Authorization:->>>==
const authorization = async function (req, res, next) {
    try {
    let authorLoggedIn = req.token.userId;
    let blogId = req.params.blogId;
    let checkBlogId = await blogModel.findById(blogId)
    if (!checkBlogId)
    return res.status (404).send({status: false, message: "Blog not Found"})
if (checkBlogId.authorId != authorLoggedIn) 
return res.status (403).send({status: false,msg: "loggedin author not allowed to modify changes"});
next();
} catch (err) {
return res.status(500).send({ status: false, msg: err.messge });
}
};

module.exports.authentication = authentication
module.exports.authorization = authorization