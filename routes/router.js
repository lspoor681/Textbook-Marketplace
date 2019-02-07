var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Textbook = require('../models/textbook');
var path = require('path');


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/../pages/login.html'));
});

router.get('/register', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/../pages/register.html'));
});


//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/marketplace');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/marketplace');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

router.post('/postText', function (req, res, next) {
  if (req.body.title &&
    req.body.author &&
    req.body.isbn &&
    req.body.price &&
    req.body.make) {

    var textbookData = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      price: req.body.price,
      make: req.body.make,
    }

    Textbook.create(textbookData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/marketplace');
      }
    });
  }else{ return res.redirect('/marketplace');}
});

// GET route after registering
router.get('/marketplace', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.render(path.join(__dirname + '/../pages/marketplace.ejs'), {User : user});
        }
      }
    });
});

router.get('/postText', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.sendFile(path.join(__dirname + '/../pages/posttextbook.html'));
        }
      }
    });
});

router.get('/textbook', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.sendFile(path.join(__dirname + '/../pages/textbook.html'));
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;