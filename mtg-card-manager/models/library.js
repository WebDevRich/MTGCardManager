const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's user structure

const LibrarySchema = new Schema({
	library: {
		type: [],
		required: true
	}
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("library", LibrarySchema);
