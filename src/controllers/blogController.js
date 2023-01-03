// const blogModel = require("../models/blogModel");
// const authorModel = require("../models/authorModel");
// const validation = require("../validator/validation");
// let {isEmpty, isValidName, isValidObjectId} = validation;
//__create blogs_
// const createBlog = async function (req, res) {
// try {
// let data = req.body;
// let { title, body, authorId, category} = data;
// if(object.keys (data).length == 0) {
//     return res.status (400).send({ status: false, msg: "Please provide key in request body" });
//   }
//   if(!isEmpty (authorId)){
//     return res.status (400).send({ status: false, msg: "Please provide author ID" });
//   }
//   if (!isEmpty(title)) {
//     return res.status (400).send({ status: false, msg: "Please provide title" });
//   }
//   if (!isEmpty (body)) {
//     return res.status (400).send({ status: false, msg: "Please provide body of blog" });
//   }
//   if (!isEmpty(category)) {
//     return res.status (400).send({ status: false, msg: "Please provide category" });
//   }
//   if(object.keys (data).length == 0) {
//   return res.status (400).send({ status: false, msg: "Please provide key in request body" });
// }
// if(!isEmpty (author Id)){
//   return res.status (400).send({ status: false, msg: "Please provide author ID" });
// }
// if (!isEmpty(title)) {
//   return res.status (400).send({ status: false, msg: "Please provide title" });
// }
// if (!isEmpty (body)) {
//   return res.status (400).send({ status: false, msg: "Please provide body of blog" });
// }
// if (!isEmpty(category)) {
//   return res.status (400).send({ status: false, msg: "Please provide category" });
// }
// if(!isValidName (title)){
// return res.status (400).send({ status: false, msg: "title should be alphabets only" });
// }
// if(!isValidName (category)) {
// return res.status (400).send({ status: false, msg: "category should be alphabets only" });
// }
// if(!isValidObjectId(authorId)){
// return res.status (400).send({ status: false, msg: "Provide a valid author id" });
// }
// let checkAuthorId = await authorModel.findById(data.authorId);
// if (!checkAuthorId) {
// return res.status (400).send({ status: false, msg: "please provide valid author id" });
// } I
// let blogData = await blogModel.create (data);
// res.status (201).send({ status: true, msg: "Blog has been created", data: blogData, });
// } catch (err) {
// return res.status (500).send({ Satus: false, msg: err.message });
// }
// };





//=========== =====module exporting ========= ========
// module.exports.createBlog = createBlog;
// module.exports.getBlogs = getBlogs;
// module.exports.updatedBlog = updatedBlog;
// module.exports.deletedBlog = deletedBlog;
// module.exports.deleteByQueryParams = deleteByQueryParams;



const blogModel = require("../models/blogsModel")
const authorModel  = require("../models/authorModel");

const createBlog = async function(req,res){
try{
let data = req.body

let authorId=data.authorId

if(!authorId) return res.status(400).send({status:false,message:"please provide authorId"})
let checkAuthorId = await authorModel.findById(authorId);
if (!checkAuthorId) {
return res.status (400).send({ status: false, msg: "please provide valid author id" });
}

let create = await blogModel.create(data)

 res.status(201).send({status:true,data:create})


}catch(err){

    res.status(500).send({ msg: err.message})
}
 
}

// const getBlog = async function(req,res){

// let data = await blogModel.find({isDeleted:false, isPublished:true})
// if(!data)  return res.status(404).send({status:false, msg: "not match any document with this id" })

// res.status(200).send({status:true,data:data})


// }

const filterBlog = async function(req,res){
    let data = req.query
    let {authorId, category, tag, subcategory } = data;
    let myData = await blogModel.find({$or:[{authorId:authorId}, {category:category}, {tag:tag}, {subcategory:subcategory}]})
    if(!myData)  return res.status(404).send({status:false, msg: "not match any document with this id" })

    res.status(200).send({status:true,data:myData})
}



module.exports.createBlog=createBlog
//module.exports.getBlog=getBlog
module.exports.filterBlog=filterBlog

