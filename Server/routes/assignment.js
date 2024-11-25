var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Assignment = require('../model/assignment');
const assignment = require('../model/assignment');
let assignmentController = require('.../controllers/assignment.js')

/*CRUD*/
/*Read operation --> Get route for the assignment tracker */
router.get('/', async(req, res, next) => {
    try{
        const AssignmentTracker= await assignment.find()
        res.render('Assignment/tracker', {
            title:'Assignments',
            AssignmentTracker:AssignmentTracker
        })
    }
    catch(err){
        console.error(err)
        res.render('Assignment/tracker', {
            error:'Error on Server'})
    }
})
/*Create operation --> Get route for Add page */
router.get('/add', async(req,res,next)=>{
    try{
        res.render('Assignment/add',{
            title:"Add Assignment",
        });
    }
    catch(err){
        console.error(err)
        res.render('Assignment/tracker', {
        error:'Error on Server'})
    }
});
/*Create operation --> Post route for processing the Add page */
router.post('/add', async(req,res,next)=>{
    try{
        let newAssignment = Assignment({
            "Name":req.body.Name,
            "Due":req.body.Due,
            "Description":req.body.Description,
            "Class":req.body.Class
        });
        Assignment.create(newAssignment).then(()=>{
            res.redirect('/assignmentstracker')
        })
    }
    catch(err){
        console.error(err);
        res.render('Assignment/tracker', {
            error:'Error on server'
        })
    }
});
/*Update operation --> Get route for Edit page */
router.get('/edit/:id', async(req,res,next)=>{
    try{
        const id=req.params.id;
        const assignmentToEdit=await Assignment.findById(id);
        res.render('Assignment/edit', 
            {
                title:'Edit Assignment',
                Assignment:assignmentToEdit
            })
    }
    catch(err){
        console.error(err);
        next(err);
    }
});
/*Update operation --> Post route for processing Edit page */
router.post('/edit/:id', async(req,res,next)=>{
    try{
        let id = req.params.id;
        let updatedAssignment = Assignment({
            "_id":id,
            "Name":req.body.Name,
            "Due":req.body.Due,
            "Description":req.body.Description,
            "Class":req.body.Class
        })
        Assignment.findByIdAndUpdate(id,updatedAssignment).then(()=>{
            res.redirect('/assignmentstracker')
        })
    }
    catch(err){
        console.error(err);
        res.render('Assignment/tracker', {
            error:'Error on server'
        })
    }
});
/*Delete operation --> Get route for Deletion */
router.get('/delete/:id',(req,res,next)=>{
    try{
        let id=req.params.id;
        Assignment.deleteOne({_id:id}).then(()=>{
            res.redirect('/assignmentstracker')
        })
    }
    catch(err){
    console.error(err);
    res.render('Assignment/tracker', {
        error:'Error on server'
    })
    }
});
module.exports = router;