var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.render("comments/newComment", {campground: campground});
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, item){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong! Try Again");
					console.log(err);
				} else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					item.comments.push(comment);
					item.save(function(err){
						if(err){
							console.log(err);
						} else{
							req.flash("success", "Something added Comment");
							res.redirect("/campgrounds/" + item._id);
						}
					});
				}
			});
		}
	});
});

//EDIT COMMENT
router.get("/:Cid/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.Cid, function(err, comment){
		if(err){
			res.redirect("/campgrounds/" + req.params.id);
		} else{
			res.render("comments/edit", {campgroundId: req.params.id, comment: comment});
		}
	});
});
//UPDATE COMMENT
router.put("/:Cid", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.Cid, req.body.comment, function(err, comment){
		if(err){
			res.redirecti("back");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY COMMENT
router.delete("/:Cid", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.Cid, function(err){
		if(err){
			res.redirect("back");
		} else{
			req.flash("success", "Successfully Deleted Comment");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


module.exports = router;