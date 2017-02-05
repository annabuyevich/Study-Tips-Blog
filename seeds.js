var mongoose = require("mongoose");
var Tip = require("./models/tip");
var Comment = require("./models/comment");

var data =  new Tip(
    {
     name: "Set Study Goals",
     image: "http://yourhealthylivingcoach.com/wp-content/uploads/2015/12/health-goals-ailis-brosnan.jpg",
     input: "In order to not procrastinate you must set goals. I recommend setting small goals so you feel more accomplished and motivated to continue."
    },
    {
     name: "Take Breaks",
     image: "http://rmagazine.com/wp-content/uploads/post/10-unique-ways-to-take-breaks-at-work/Unique-Breaks.jpg",
     input: "You can only work so hard. In order to keep your mind fresh take breaks! You can work for an hour and then take a five minute break, walk around or just relax."
    },
    {
     name: "Be Optimistic",
     image: "https://i.ytimg.com/vi/5XXlDS7TtwY/maxresdefault.jpg",
     input: "Even if you don't get everything you wanted done, this tends to happen a lot, remain positive because at least you got something done! Also maintaining a good attitude well help allow your work to have greater quality."
    }
)



function seedDB(){
    Tip.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log("Removed tip.");
        
        // CREATE SOME TIP
        data.forEach(function(seed){
            Tip.create(seed, function(err, tip){
                if(err){
                    console.log(err);
                } else{
                    console.log("Added a Tip!");
                    
                    // CREATE A COMMENT FOR THE TIP
                    Comment.create(
                        {
                            text: "I completely agree with the tip. Follow it and you'll see an amazing change in the quality of your work and your overall productivity!",
                            author: "Lily Stiefer"
                        }, function(err, newComment){
                            if(err){
                                console.log(err);
                            } else{
                                tip.comments.push(newComment);
                                tip.save();
                                console.log("Just created a new comment!");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;