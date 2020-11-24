var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req, res){	
	Campground.find({}, function(err, item){
		if(err){
			console.log("Error Occured: Could'nt retrieve data !");
			console.log(err);
		} else{
			res.render("campgrounds/index", {campgrounds: item});
		}
	});	
});

router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.create(
	{
		name: req.body.name,
		image: req.body.image,
		desc: req.body.desc,
		author: {
			id: req.user._id,
			username: req.user.username
		},
		price: req.body.price
	}, function(err, item){
		if(err){
			console.log("Could'nt Save it to Database !");
			console.log(err);
		}
		else{
			console.log( item + "  Saved to the Database");
			res.redirect("/campgrounds");
		}
	});	
});

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/newCamp");
});

router.get("/:id", function(req, res){
	var tempID = req.params.id;
	Campground.findById(tempID).populate("comments").exec(function(err, item){
		if(err){
			console.log("Error Occured: in show page");
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground: item}); 
		}
	})
});

//EDIT CAMPGROUND
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		res.render("campgrounds/edit", {campground: campground});
	});
});
//UPDATE CAMPGROUND
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err, campground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else{
			req.flash("success", "Successfully Deleted Campground");
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;