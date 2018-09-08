//imported files
var htmlRoutes = require("./app/routing/htmlRoutes.js");
var apiRoutes = require("./app/routing/apiRoutes.js");
var friends = require('./app/data/friends.js');

//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

//port selection
var PORT = process.env.PORT || 3000;

//initializing body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './app/public')))
//importing routes
htmlRoutes(app, path);
apiRoutes(app);

//function that compares user scores to find the closest match
module.exports.lookForFriends = function () {
	let scoreArray = [];
	let current = apiRoutes.user;

	//loops through the array of stored friends. For all friends whose names
	//are different than the current user...
	for (let i = 0; i < friends.array.length; i++) {
		let friendScore = 0;
		if (friends.array[i].name !== current.name) {

			//we loop through their scores and find the difference from the 
			//current user's scores.  
			for (let j = 0; j < friends.array[i].scores.length; j++) {
				let score = friends.array[i].scores[j];
				let difference = Math.abs(score - current.scores[j])
				friendScore+=difference;
			}

			//we then store the scores along with the friend they correspond with
			//in an object, and push it into an array
			let friendObj = {};
			friendObj.friend = friends.array[i];
			friendObj.score = friendScore;
			scoreArray.push(friendObj)
		}
	}

	//the array is sorted to find which friend has the lowest score
	//lowest score === greatest compatibility.
	scoreArray.sort(function (a,b) {
		return a.score - b.score;
	});

	//the lowest score is returned.
	return scoreArray[0]
}

//setting the app to listen on the selected 
app.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});