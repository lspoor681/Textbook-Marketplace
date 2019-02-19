var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Textbook = require('../models/textbook');
//var Report = 
var path = require('path');

var textID;

// GET route for reading data
router.get('/', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          res.sendFile(path.join(__dirname + '/../pages/login.html'));
        } else {
          return res.redirect('/marketplace');
        }
      }
    });
});

router.get('/register', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/../pages/register.html'));
});

// GET route after registering or logging in
router.get('/marketplace', function (req, res, next) {
  User.findById(req.session.userId).exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          Textbook.find().exec(function (error, textbooks) {
            if (error) {
              return next(error);
            }
            let userSearch = req.query.Search;
            if (typeof userSearch !== 'undefined'){
              //console.log(userSearch);
              if (!isNaN(parseFloat(userSearch))){
              textbooks = textbooks.filter(element => element.isbn.includes(userSearch));
              }
              else if ((textbooks.filter(element => element.author.toLowerCase().includes(userSearch.toLowerCase()))).length != 0)
              textbooks = textbooks.filter(element => element.author.toLowerCase().includes(userSearch.toLowerCase()));
              else {
              textbooks = textbooks.filter(element => element.title.toLowerCase().includes(userSearch.toLowerCase()));
              }
              return res.render(path.join(__dirname + '/../pages/marketplace.ejs'), {User : user , textbooks});
            }
            else{
              return res.render(path.join(__dirname + '/../pages/marketplace.ejs'), {User : user , textbooks});
            }
          });
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

router.get('/textbookModify', function (req, res, next) {
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
          Textbook.findById(req.query.textid).exec(function (error, textbook) {
            if (error) {
              return next(error);
            }else {
              User.findById(textbook.seller).exec(function (error, seller) {
                if (error) {
                  return next(error);
                } else {
                  return res.render(path.join(__dirname + '/../pages/textbookModify.ejs') , { User : user , Textbook : textbook , Seller : user });
                }
              });
            }
          });
        }
      }
    });
});

router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId).exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          Textbook.find({ seller : req.session.userId }).exec(function (error, textbooks) {
            if (error) {
              return next(error);
            } 
            let userSearch = req.query.Search;
            if (typeof userSearch !== 'undefined'){
              //console.log(userSearch);
              if (!isNaN(parseFloat(userSearch))){
              textbooks = textbooks.filter(element => element.isbn.includes(userSearch));
              }
              else if ((textbooks.filter(element => element.author.toLowerCase().includes(userSearch.toLowerCase()))).length != 0)
              textbooks = textbooks.filter(element => element.author.toLowerCase().includes(userSearch.toLowerCase()));

              else {
              textbooks = textbooks.filter(element => element.title.toLowerCase().includes(userSearch.toLowerCase()));
              }
              return res.render(path.join(__dirname + '/../pages/profile.ejs'), {User : user , textbooks});
            }
            else{
              return res.render(path.join(__dirname + '/../pages/profile.ejs'), {User : user , textbooks});
            }
          });
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
          Textbook.findById(req.query.textid).exec(function (error, textbook) {
            if (error) {
              return next(error);
            }else {
              User.findById(textbook.seller).exec(function (error, seller) {
                console.log(seller);
                if (error) {
                  return next(error);
                } else {
                  return res.render(path.join(__dirname + '/../pages/textbook.ejs') , { User : user , Textbook : textbook , Seller : seller });
                }
              });
            }
          });
        }
      }
    });
});

router.get('/report', function (req, res, next) {
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
          return res.sendFile(path.join(__dirname + '/../pages/report.html'));
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

router.post('/marketplace', function (req, res, next){

});

router.post('/postText', function (req, res, next) {
  if (req.body.title &&
    req.body.author &&
    req.body.isbn &&
    req.body.price > 0 &&
    req.body.make) {

      var textbookData = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        price: req.body.price,
        make: req.body.make,
        seller: req.session.userId,
      }

      Textbook.create(textbookData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          return res.redirect('/profile');
        }
      });
  }else if(req.body.price.value < 0){ window.alert("Please enter a price greater or equal than 0");
} else { return res.redirect('/marketplace'); }
});

router.post('/textbookModify', function (req, res, next) {
  if(req.body.submit === "Delete"){
    Textbook.findByIdAndRemove(req.query.textid, function(error) {
      if(error){
        return next(error);
      } else {
        return res.redirect("/profile");
      }
    });
  }
  if(req.body.submit === "Modify"){
    var textbookData = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        price: req.body.price,
        make: req.body.make,
        seller: req.session.userId,
      }

      Textbook.findByIdAndUpdate(req.query.textid, textbookData, function(error) {
        if(error){
        return next(error);
      } else {
        return res.redirect("/profile");
      }
      });
  } else {
    return res.redirect("/profile");
  }
});

module.exports = router;