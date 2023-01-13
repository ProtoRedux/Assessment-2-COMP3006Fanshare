var express = require("express");
var router = express.Router();

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

//GET /register
router.get("/register", function(req,res,next){
    return res.render("register", {title: "Sign Up"})
});

//POST /register
router.post("/register", function(req,res,next){
    return res.send("user created");
})

module.exports = router;