var express = require("express");
var router = express.Router({mergeParams: true});
var Tip = require("../models/tip");
var Comment = require("../models/comment");
var middleWare = require("../middleware");

// NEW
router.get("/new", middleWare.LoggedIn, function(req,res){
    Tip.findById(req.params.id,function(err, tip){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{tip:tip});
        }
    });
});

// CREATE
router.post("/", middleWare.LoggedIn, function(req, res){
    Tip.findById(req.params.id, function(err,tip){
        if(err){
            res.redirect("/tips");
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    console.log(err);
                } else{
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    
                    newComment.save();
                    tip.comments.push(newComment);
                    tip.save();
                    console.log(newComment);
                    req.flash("success", "Created new comment.");
                    res.redirect("/tips/" + tip._id);
                }
            });
        }
    });
});

// EDIT
router.get("/:commentID/edit", middleWare.LoggedIn, function(req, res){
    Comment.findById(req.params.commentID, function(err, theComment){
        if(err){
            console.log(err);
        } else{
            res.render("comments/edit",{tip_id: req.params.id, comment: theComment});
        }
    });
});

// UPDATE
router.put("/:commentID", function(req, res){
    Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, function(err, theComment){
        if(err){
            res.render("edit");
            console.log(err);
        } else{
            res.redirect("/tips/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:commentID", middleWare.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.commentID, function(err){
        if(err){
            console.log("There was a problem trying to delete the comment");
        } else{
            res.redirect("/tips/" + req.params.id);
        }
    });
});

module.exports = router;