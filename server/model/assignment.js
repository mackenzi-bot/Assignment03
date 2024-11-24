// MVC --> Model, View, Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let assignmnetModel = mongoose.Schema({
    Name:String,
    DaysDue:Number,
    Description:String,
    Class:String
},
{
    collection:"Assignment_tracker"
})
module.exports = mongoose.model('Assignment',assignmentModel)