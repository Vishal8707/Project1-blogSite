const express = require('express');
const router = express.Router();
const AuthorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController");
const auth = require("../middleware/auth");

//post api (author creation)

router.post("/authors", AuthorController.createAuthor)

// post api for Login aouthor >>>

router.post("/login", AuthorController.loginAuthor);

//post api (blog creation)_

router.post("/blogs", auth.authentication, blogController.createBlog);

//__ get api (blog document)_

router.get("/blogs", auth.authentication, blogController.getBlogs);

// put api (blog updation) 

router.put("/blogs/:blogId", auth.authentication, auth.authorization, blogController.updatedBlog);

// delete api-1

router.delete("/blogs/:blogId", auth.authentication, auth.authorization, blogController.deletedBlog);

//delete api-2

router.delete("/blogs", auth.authentication, auth.authoriseByQuery, blogController.deleteByQueryParams)



module.exports = router