var db = require('../../config/db');
var Bookmark = require('../../models/bookmark');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'bookmarker'});

module.exports = {

	createBookmark : function(bookmarkName, bookmarkUrl, userId) {
		log.info(JSON.stringify(bookmarkName));

		var bookmark = new Bookmark();
		bookmark.name = bookmarkName;
		bookmark.url = bookmarkUrl;
		bookmark.user = parseInt(userId);

		bookmark.save(function(err){
			if (err) {
				throw err;
			}
		});
	},

    //get all bookmarks from a user
    getBookmarks : function(userId) {
        var user = parseInt(userId);
        var bookmarks = Bookmark.find({user : user}).exec();

        return bookmarks;
    }

}