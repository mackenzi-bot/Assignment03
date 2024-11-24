// MVC --> Model, View, Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let assignmentModel = mongoose.Schema({
    Name:String,
    Due:String,
    Description:String,
    Class:String
},
{
    collection:"Assignment_tracker"
})
module.exports = mongoose.model('Assignment',assignmentModel)