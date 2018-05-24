// require path for our routing and the data from our friend.js file.
var path = require("path");
var friends = require("../data/friends")

module.exports = function (app) {

	// GET route will return the current matches in the database
	app.get("/api/friends", function (req, res) {

		res.json(friends);
	})

	app.post("/api/friends", function (req, res) {
	
		// Create the model where we will store the best match as we loop through the data and calculate score differences.

		var bestMatch = {
			name: "",
			picture: "",
			totalDifference: 100
		}
		
		// Here we create a variable to store the input from new users as they take the survey.

		var newUser = req.body;
		var userScore = newUser.score;

		// Here we will loop through the matches array. As we loop through each match, we also loop through their scores 
		// calculating the absolute value of the difference between user score and the possible matches.

		for (let i = 0; i < friends.length; i++) {

			var difference = 0;

			for (let m = 0; m < userScore.length; m++) {

				difference += Math.abs(friends[i].score[m]) - Math.abs(userScore[m]);
			}

			if (difference < bestMatch.totalDifference) {

				bestMatch.name = friends[i].name;
				bestMatch.picture = friends[i].picture;
				bestMatch.totalDifference = difference;
			};
		};

		friends.push(newUser);
		res.json(bestMatch);
	});
}