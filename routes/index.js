var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// HOME PAGE
router.get("/", function(req,res){
    res.render("home");
});

// REGISTER FORM
router.get("/register", function(req, res){
    res.render("register");
});

// REGISTER LOGIC 
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "You successfully Signed Up! Nice to meet you " + req.body.username);
            res.redirect("/tips");
        });
    });
});

// LOGIN FORM
router.get("/login", function(req, res) {
    res.render("login");
});

// LOGIN LOGIC
router.post("/login", passport.authenticate("local", {successRedirect: "/tips", failureRedirect:"/login"}), function(req,res){
});

// LOGOUT FORM
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are logged out.");
    res.redirect("/tips");
});

module.exports = router;