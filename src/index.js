const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();

 mongoose.set('strictQuery', true)

app.use(express.json());

mongoose.connect("mongodb+srv://vishalsharma:8423354673@vishal-db.bpwswlx.mongodb.net/Blog", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)


app.listen(3000, function () {
    console.log('Express app running on port ' + 3000)
});