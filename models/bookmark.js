var mongoose = require('mongoose');

var bookmarkSchema = mongoose.Schema({
	name : String,
	url : String,
	user : Number
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);