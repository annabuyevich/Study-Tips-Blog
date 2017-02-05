var express = require("express"),
    router = express.Router(),
    Tip = require("../models/tip"),
    middleWare = require("../middleware"),
    request = require("request");
    
// INDEX
router.get("/", function(req, res){
    // Retrieve all tips from database
    Tip.find({},function(err, allTips){
        if(err){
            console.log(err);
        } else{
             request('https://maps.googleapis.com/maps/api/geocode/json?address=sardine%20lake%20ca&key=AIzaSyBtHyZ049G_pjzIXDKsJJB5zMohfN67llM', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body); // Show the HTML for the Modulus homepage.
                res.render("tips/index",{tips: allTips});
            }
        
             });         
        }
    });
});

// CREATE
router.post("/", middleWare.LoggedIn, function(req, res){
    // retrieve data from form & add to tips array
    var name = req.body.name,
        rate = req.body.rate,
        image = req.body.image,
        input = req.body.input,
        author = {
            id: req.user._id,
            username: req.user.username
        };
    
    var newTip = {name: name, rate: rate, image: image, input: input, author: author}
    
    // create a new tip and save to the database
    Tip.create(newTip, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            // redirect to the tips page
            console.log(newlyCreated);
            res.redirect("/tips");
        }
    });
});

// NEW
router.get("/new",middleWare.LoggedIn, function(req, res){
    res.render("tips/new");
});

// SHOW
router.get("/:id", function(req, res){
    // find the tip with given ID
    Tip.findById(req.params.id).populate("comments").exec(function(err, foundTip){
        if(err){
            console.log(err);
        } else{
            console.log(foundTip);
            res.render("tips/show",{tip: foundTip});
        }
    });
});

// EDIT
router.get("/:id/edit", middleWare.checkTipOwnership, function(req, res) {
   console.log("Currently Editing...");
   Tip.findById(req.params.id, function(err, foundTip){
       if(err){
           console.log(err);
       } else {
           res.render("tips/edit", {tip: foundTip});
       }
   });
});

// UPDATE
router.put("/:id", middleWare.checkTipOwnership, function(req,res){
    var newData = {name: req.body.name, image: req.body.image, input: req.body.input};
    Tip.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedTip){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else{
            req.flash("success", "Successfully update the tip!");
            res.redirect("/tips/" + updatedTip._id);
        }
    });
});

// DESTROY
router.delete("/:id",middleWare.checkTipOwnership, function(req, res) {
    Tip.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/tips");
        } else{
            res.redirect("/tips");
        }
    });
});

module.exports = router;


