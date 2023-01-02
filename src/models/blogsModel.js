const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    body:{
        type: String,
        required: true,
        trim: true,
    },
    authorId:{
        type: ObjectId,
        required: true,
        ref: "Author",
    },
    tags: {
        type: [String],
        trim: true,
    },
    category:{
        type: String,
        required: true,
        trim: true,
    },
    subcategory: {
        type: [String],
        trim: true,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    isDeleted: {
        type: Boolean, 
        default: false
    },
    publishedAt: {
        type: Date,
        default: null,
    },
    isPublished: {
        type: Boolean,
        default: false
    },
},{timestamps: true});
module.exports = mongoose.model("Blog", blogSchema)


// { title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string}, category: {string, mandatory}, subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}, publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}