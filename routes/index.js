var express = require('express');
var router = express.Router();
const passport=require('passport')
let DB = require('../server/views/config/db')
let userModel = require('../model/User')
let User = userModel.User;

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Home',
    displayName:req.user ? req.user.displayName:''
  });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { 
    title: 'Home',
    displayName:req.user ? req.user.displayName:''
  });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index', { 
    title: 'About Me',
    displayName:req.user ? req.user.displayName:''
  });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { 
    title: 'Projects',
    displayName:req.user ? req.user.displayName:''
  });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { 
    title: 'Contact Me',
    displayName:req.user ? req.user.displayName:''
  });
});

//get and post router of login.ejs
router.get('/login', function(req,res,next){
  if(!req.user)
  {
    res.render('Auth/login',{
      title:'Login',
      message:req.flash('loginMessage'),
      displayName:req.user ? req.user.displayName:''
    })
  }
  else{
    return res.redirect('/');
  }
})
router.post('/login', function(req,res,next){
  passport.authenticate('local',(err,user,info)=>{
    if(err)
    {
      return next(err);
    }
    if(!user)
    {
      req.flash('loginMessage', 'AuthenticationError');
      return res.redirect('/login')
    }
    req.login(user, (err)=>{
      if(err)
      {
        return next(err)
      }
      return res.redirect('assignmentslist');
    })
  })(req,res,next)
})
//get and post router of register.ejs
router.get('/register', function(req,res,next){
  if(!res.user)
  {
    res.render('Auth/register',
      {
        title:'Register',
        message:req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName:''
      }
    )
  }
  else
  {
    return res.redirect('/')
  }
})
router.post('/register', function(req,res,next){
  let newUser = new User({
    username: req.body.username,
    //password:req.body.password,
    email:req.body.email,
    displayName:req.body.displayName
  })
  User.register(newUser, req.body.password,(err)=>{
    if(err){
      console.log("Error:Insulting the new user");
      if(err.name=="UserExistsError")
      {
        req.flash('registerMessage',
          'Registration Error: User already exists');
      }
      return res.render('Auth/register',
        {
          title:'Register',
          message:req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName:''
        })
    }
    else{
      return passport.authenticate('local')(req,res,()=>{
        res.redirect('/assignmentslist')
      })
    }
  })
})
router.get('/logout', function(req,res,next){
  req.logout(function(err){
    if(err)
    {
      return next(err)
    }
  })
  res.redirect('/')
})
module.exports = router;
