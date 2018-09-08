var friends = require('../data/friends.js');
var server = require('../../server.js');

module.exports = function(app){
	let user;
	app.post("/api/friends", function (req, res) {
		module.exports.user = req.body;
		friends.array.push(req.body);
		console.log(`${req.body.name} successfully added!`)
		res.json({});
	});

	app.get("/bestFriend", function (req,res) {
		let bestFriend = server.lookForFriends();
		res.json(bestFriend);

	});

	app.get("/api/:friends?", function(req, res) {
	  res.json(friends.array);
	});
}