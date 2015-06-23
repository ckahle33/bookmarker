
var bookmark = require('../controllers/bookmark/index');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'bookmarker'});


module.exports = function(app, passport) {
	app.get('/', function(req, res){
		res.render('login', {message: req.flash('loginMessage')});
	});


	app.get('/sign-up', function(req, res){
		res.render('sign-up', {message: req.flash('signupMessage')});
	})

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/',
		failureFlash : true
	}))

	app.post('/sign-up', function(req, res, next ) {
		passport.authenticate('local-signup', {
			successRedirect : '/profile',
			failureRedirect : '/sign-up',
			failureFlash : true
		})(req, res, next);
	});

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile', {
			user : req.user,
            bookmarks : bookmark.getBookmarks(req.user._id)
		});
	});

	app.get('/logout', function(req, res){
		res.logout();
		res.redirect('/');
	});

	app.post('/bookmark', function(req, res){
        console.log(JSON.stringify(req.user._id));
        if (req.user._id) {
            bookmark.createBookmark(req.body.bookmarkName, req.body.bookmarkUrl, req.user._id);
        } else {
            res.redirect('/');
        }

		res.redirect('/profile');
	})

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}


}

