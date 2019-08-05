const express = require("express");
const router = express.Router();

// Load User model
const Library = require("../../models/library");
const User = require("../../models/user");

// @route POST api/users/library
// @desc save to library
// @access Public
router.post("/updateLibrary", (req, res) => {

	User.findOne({ email: req.body.email }).then(user => {
		const addToLibrary = new Library({
			library: req.body.newlibraryItems
		})

		user.library.push(addToLibrary)
		user.save()
	});
});

module.exports = router;
