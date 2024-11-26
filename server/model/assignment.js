// MVC --> Model, View, Controller (Routers)
const mongoose = require('mongoose');
// create a model class
const assignmentModel = new mongoose.Schema({
    Name:{type: String, required:true},
    Due:{type: String, required:true},
    Description:{type: String, required:true},
    Class:{type: String, required:true}
},
{
    collection:"Assignment_tracker"
})
const Assignment = mongoose.model('Assignment',assignmentModel)
module.exports = Assignment;