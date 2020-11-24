var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Salmon Creek",
		image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "Salmon Creek Campground is located in the North Yuba River area. Visitors enjoy a wide variety of recreational activities in the area, including hiking, biking, hunting, fishing, and gold panning. This facility is operated and maintained by the Tahoe National Forest."
	},
	{
		name: "Granite Hill",
		image: "https://images.pexels.com/photos/2496880/pexels-photo-2496880.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "Granite Hill Camping Resort is nestled on a 150-acre property in beautiful Adams County. As such, Granite Hill has a long and varied colonial and agricultural history"
	},
	{
		name: "Mountain Goat's Rest",
		image: "https://images.pexels.com/photos/111362/pexels-photo-111362.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "Mountain goats and hikers are meeting in dangerously close proximity at Heart Lake in the Bitterroot Mountains. The goats near the popular backpacking destination south of Superior, Montana, have given up the safety of the state-line cliffs, lured by human-related salts and foods around the mountain lake."
	},
	{
		name: "Los Domos",
		image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?auto=compress&cs=tinysrgb&h=350",
		desc: "Eco Domos Lago Verde invites you to a unique experience: comfortable space with low environmental impact and perfect integration with the environment. Enjoy a different accommodation in the heart of Los Alerces National Park."
	}
]


function seedDB(){
	//remove from database
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} else{
			console.log("REMOVED CAMPGROUNDS !");
			//add to database
			// data.forEach(function(campground){
			// 	Campground.create(campground, function(err, item){
			// 		if(err){
			// 			console.log(err);
			// 		} else{
			// 			console.log("Campground Added!");
			// 			Comment.create({
			// 				text: "This place is really Great, Wanna camp there!",
			// 				author: "Ron Weasley"
			// 			}, function(err, comment){
			// 				if(err){
			// 					console.log(err);
			// 				} else{
			// 					item.comments.push(comment);
			// 					item.save();
			// 					console.log("Added a Comment");
			// 				}
			// 			});
			// 		}
			// 	});
			// });
		}
	});
	
}

module.exports = seedDB;