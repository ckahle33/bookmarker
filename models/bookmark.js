var mongoose = require('mongoose');

var bookmarkSchema = mongoose.Schema({
	name : String,
	url : String,
	_creator : {type: Number, ref: 'User'}
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);