const authorModel  = require("../models/authorModel");

const createAuthor = async function (req, res){
    const data = req.body
    const saveData = await authorModel.create(data)
    res.status(201).send({status: true, msg: saveData})
}



module.exports.createAuthor = createAuthor


