const blogModel = require("../models/blogsModel");
const authorModel = require("../models/authorModel");
const validation = require("../validator/validation");
let { isValidName, isValidObjectId } = validation;

//_create blog >>

const createBlog = async function (req, res) {
  try {
    let data = req.body;

    let { title, body, authorId, category } = data;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide key in request body" });
    }

    if (!title || title == "") {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide title" });
    }

    if (!body || body == "") {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide body of blog" });
    }

    if (!category || category == "") {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide category" });
    }

    if (!isValidName(title)) {
      return res
        .status(400)
        .send({ status: false, msg: "title should be alphabets only" });
    }

    if (!isValidName(category)) {
      return res
        .status(400)
        .send({ status: false, msg: "category should be alphabets only" });
    }

    if (!isValidObjectId(authorId)) {
      return res
        .status(400)
        .send({ status: false, msg: "Provide a valid author id" });
    }

    if (!authorId || authorId == "")
      return res
        .status(400)
        .send({ status: false, message: "please provide authorId" });

    let checkAuthorId = await authorModel.findById(authorId);
    if (!checkAuthorId) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide valid author id" });
    }

    let create = await blogModel.create(data);

    res.status(201).send({ status: true, data: create });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

// _get api >>>

const getBlogs = async function (req, res) {
  try {
    let { authorId, category, tags, subcategory } = req.query;
    let filter = { isDeleted: false, isPublished: true };
    if (authorId) {
      filter.authorId = authorId;
    }
    if (category) {
      filter.category = category;
    }
    if (tags) {
      filter.tags = tags;
    }
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    let savedData = await blogModel.find(filter);
    if (savedData.length == 0) {
      return res
        .status(404)
        .send({ status: false, msg: "Such Blogs Not Available" });
    } else {
      return res.status(200).send({ status: true, data: savedData });
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// _update api >>>

const updatedBlog = async function (req, res){
  try {
    let alldata = req.body;
    let blogId = req.params.blogId;
    if (Object.keys(alldata).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Blog Details For Updating" });
    if (!blogId)
      return res
        .status(400)
        .send({ status: false, msg: "Blog Id is required" });
    let findBlogId = await blogModel.findById(blogId);
    if (findBlogId.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, msg: "Blogs already deleted" });
    }
    let updatedBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      {
        $set: {
          title: alldata.title,
          body: alldata.body,
          category: alldata.category,
          publishedAt: new Date(),
          isPublished: true,
        },
        $push: { tags: req.body.tags, subcategory: req.body.subcategory },
      },
      { new: true, upsert: true }
    );
    return res.status(200).send({ status: true, msg: updatedBlog });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//_delete blog api 1

const deletedBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let checkBlogId = await blogModel.findById(blogId);
    if (!checkBlogId || checkBlogId.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog has been already deleted " });
    }
    let deletedBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      msg: "Blog has been deleted successfully",
      data: deletedBlog,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//_____delete blogs api 2 by given fields

const deleteByQueryParams = async function (req, res) {
  try {
    let data = req.query;
    const deleteByQuery = await blogModel.updateMany(
      { $and: [data, { isDeleted: false }] },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true, upsert: true }
    );
    let count = deleteByQuery.modifiedCount;
    if (deleteByQuery.modifiedCount == 0) {
      return res.status(404).send({ status: false, msg: "No Blog Found" });
    }
    res.status(200).send({ status: true, msg: "No of blogs deleted:", count });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//=========== =====module exporting ========= ========
module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updatedBlog = updatedBlog;
module.exports.deletedBlog = deletedBlog;
module.exports.deleteByQueryParams = deleteByQueryParams;
