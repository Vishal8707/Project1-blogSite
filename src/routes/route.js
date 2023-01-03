const express = require('express');
const router = express.Router();
const AuthorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController");
//const auth = require("../middleware/auth");

//post api (author creation)

//router.post("/authors", AuthorController.createAuthor)

// post api for Login aouthor >>>

//router.post("/login", AuthorController.loginAuthor);

//post api (blog creation)_

// router.post("/blogs", auth.authentication, blogController.createBlog);

router.post("/blog",blogController.createBlog)

//get api (blog document) >>>

//router.get("/blog",blogController.getBlog)
router.get("/blog",blogController.filterBlog)









module.exports = router