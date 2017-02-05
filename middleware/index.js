var Tip = require("../models/tip"),
    Comment = require("../models/comment");

var middleWareObject = {
    LoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You have to login first.")
        res.redirect("/login");
    },
    checkTipOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Tip.findById(req.params.id,function(err, foundTip){
                if(err){
                    req.flash("error", "The Study Tip was not found.");
                    res.redirect("back");
                } else{
                    if(foundTip.author.id.equals(req.user._id)){
                        next();
                    } else{
                        req.flash("error", "You don't have the permission to do that.");
                        req.redirect("back");
                    }
                }
            });
        } else{
            req.flash("error", "To do that you have to be logged in.");
            req.redirect("back");
        }  
    },
    checkCommentOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.commentID,function(err,foundComment){
                if(err){
                    req.flash("error", "The comment was not found.");
                    res.redirect("back");
                } else{
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    } else{
                        req.flash("error","You don't have the permission to do that.");
                        res.redirect("back");
                    }
                }
            });
        } else{
            req.flash("error", "You first must be logged in.");
            res.redirect("back");
        }
    }
}

module.exports = middleWareObject;