var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");

var middlewareObj = {
	checkCampgroundOwnership: 
		function(req, res, next){
			if(req.isAuthenticated()){
				Campground.findById(req.params.id, function(err, item){
					if(err){
						res.redirect("/campgrounds");
					} else{
						if(item.author.id.equals(req.user._id)){
							next();
						} else{
							req.flash("error", "You don't have permission to do that!");
							res.redirect("back");
						}
					}
				});
			} else{
				req.flash("error", "Please Login before you do that!");
				res.redirect("back");
			}
		},
	checkCommentOwnership:
		function(req, res, next){
			if(req.isAuthenticated()){
				Comment.findById(req.params.Cid, function(err, comment){
					if(err){
						req.flash("error", "Campground not found!");
						res.redirect("back");
					} else{
						if(comment.author.id.equals(req.user._id)){
							next();
						} else{
							req.flash("error", "You don't have permission to do that!");
							res.redirect("back");
						}
					}
				});
			} else{
				req.flash("error", "Please Login before you do that!");
				res.redirect("/login");
			}
		},
	isLoggedIn:
		function(req, res, next){
			if(req.isAuthenticated()){
				return next();
			}
			req.flash("error", "Please Login before you do that!");
			res.redirect("/login");
		}
};

module.exports = middlewareObj;