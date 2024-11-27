const express = require('express');
var router = express.Router();
//let mongoose = require('mongoose');
//let Assignment = require('../model/assignment');
const Assignment = require('../model/assignment');
//let assignmentController = require('.../controllers/assignment.js')

/*CRUD*/
/*Read operation --> Get route for the assignment tracker */
router.get('/assignmentslist', async(req, res) => {
    res.render('assignments/assignmentslist', 
        {title:'Assignments List'});
});
/*Create operation --> Get route for Add page */
router.get('/add', async(req,res,next)=>{
    try{
       const newAssignment = new Assignment(req.body);
       await newAssignment.save();
       res.redirect('/');
    
    }
    catch(err){
        next(err);
    }
});

/*Create operation --> Post route for processing the Add page */
router.post('/add', async(req,res,next)=>{
    try{
        let newAssignment = Assignment({
            Name:req.body.Name,
            Due:req.body.Due,
            Description:req.body.Description,
            Class:req.body.Class
        });
        await newAssignment.save();
            res.redirect('/assignmentslist');
       
    }
    catch(err){
        console.error(err);
        res.render('Assignment/assignmentslist', {
            error:'Error on server'
        })
    }
});
/*Update operation --> Get route for Edit page */
router.get('/edit/:id', async (req,res,next) => {
    try{
        const assignment = await Assignment.findById(req.params.id);
        res.render('assignments/edit', {title: "Edit Assignment", assignment});
    }
    catch(err){
        next(err);
    }
    
});
/*Update operation --> Post route for processing Edit page */
router.post('/edit/:id', async(req,res,next)=>{
    try{
        await Assignment.findByIdAndUpdate(req.params.id, req.body,
            {new:true});
            res.redirect('/');
        }
        catch(err){
            next(err)
        }
});
/*Delete operation --> Get route for Deletion */
router.get('/delete/:id',async (req,res,next)=>{
    try{
       await Assignment.findByIdAndDelete(req.params.id);
       res.redirect('/');
    }
    catch(err){
        next(err)
    }
});

router.use((err,req,res,next) => {
    console.error(err);
    res.render('assignments/assignmentslist', {error:'Error on server'})
});
module.exports = router;