var express = require("express");
var router = express.Router();
var User = require("../Models/user")

//GET/home page
router.get("/",function(req,res,next) {
    return res.render("index",{title: "Home"} );
});
//GET/about page
router.get ("/about", function(req,res,next){
    return res.render("about", {title: "About"});
});

//GET/contact page

router.get ("/contact", function (req,res,next)
{
    return res.render("contact", {title: "Contact"})
})

//Get /login
router.get("/login", function(req,res,next){
    return res.render("login",{title: "login"})
});

//POST login
router.post("/login", function(req,res,next){
    if (req.body.username && req.body.password)
    {
        User.authenticate(req.body.username, req.body.password, function (error,user)
        {
            if (error|| !user)
            {
                var err= new Error("Somethings not quite right... please check your username and password are correct.");
                err.status=401;
                return next(err);
            }
            else
            {
                req.session.userId = user._id;
                return res.redirect("/profile");
            }
        });
    } 
    else
     {
        var err=new Error("We need your email and password to log you in.");
        err.status = 401;
        return next(err);
    }
});

//GET /register
router.get("/register", function(req,res,next){
    return res.render("register", {title: "Sign Up"})
});

//POST /register
router.post("/register", function(req,res,next){
    if (req.body.email &&
        req.body.name &&
        req.body.username &&
        req.body.password &&
        req.body.confirmPassword) {
            //making sure both passwords match
            if (req.body.password !== req.body.confirmPassword)
            {
                var err = new Error("Your passwords don't match please try again");
                err.status=400;
                return next(err);
            }
            //create object from form input
            var userData = {
                email: req.body.email,
                name: req.body.name,
                username: req.body.username,
                password: req.body.password
            }; 

            //use Schema to create and insert doc into mongodb
            User.create(userData, function (error,user) {
                if (error){
                    return next (error);
                } else {
                    req.session.userId = user._id;
                    return res.redirect("/profile");
                }
            });

        }
        else
        {
            var err=new Error("Sorry! But you need to complete all fields.");
            err.status=400;
            return next(err);
        }
})

//GET /profile
router.get("/profile", function(req,res,next)
    {
        if(! req.session.userId)
        {
            var err = new Error("Sorry! but your not allowed to view this page");
            err.status = 403;
            return next(err);
        }
        User.findById(req.session.userId)
            .exec(function(error,user)
            {
                if(error)
                {
                    return next(error);
                }
                else
                {
                    return res.render("profile", {title: "profile", name: user.name,})
                }
            });

    });


module.exports = router;