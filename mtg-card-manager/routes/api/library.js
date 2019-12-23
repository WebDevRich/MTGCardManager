const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/user");

// @route POST api/users/library
// @desc save to library
// @access Public
router.post("/updateLibrary", (req, res) => {

	User.findOne({ email: req.body.email }).then(user => {

		const newlibraryItems = req.body.newlibraryItems;

		user.library.addToSet(newlibraryItems)
		user.save()
		.then(user => res.json(user))
		.catch(err => console.log(err));
	});

});

module.exports = router;
