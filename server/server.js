'use strict';

var express = require('express');
var mongoose = require('mongoose');
var sparcifyRoutes = require('./routes/sparcifyRoutes');
var passport = require('passport');
var updateTinderToken = require('./lib/updateTinderToken');
var updateLoc = require('./lib/updateLoc');
var updateRecs = require('./lib/updateRecs');
var calculateRatio = require('./lib/calculateRatio');
var finalRecs = require('./lib/finalRecs');
var storePics = require('./lib/storePics');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/sparcify_development');

var app = express();
app.set('appSecret', process.env.SECRET || 'bullseye');
app.use(passport.initialize());
require('./lib/passport_strat')(passport);

//app.use(express.static(__dirname + '/public'));

var sparcifyRouter = express.Router();
var userRouter = express.Router();

sparcifyRoutes(sparcifyRouter, app.get('appSecret'));
require('./routes/userRoutes')(userRouter, passport, app.get('appSecret'));

app.use('/api/v1', sparcifyRouter);
app.use('/api/v1', userRouter);

app.listen((process.env.PORT || 3000), function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));

  var femaleRecArray = [];
  var finalFemaleRecArray = [];
  var maleRecArray = [];
  var finalMaleRecArray = [];

  var updateRecsTimeoutFunction1 = function() { updateRecs('capitol hill', true, femaleRecArray, finalRecs, finalFemaleRecArray);};
  var updateRecsTimeoutFunction2 = function() { updateRecs('capitol hill', true, femaleRecArray, finalRecs, finalFemaleRecArray);};

  var updateRecsTimeoutFunction3 = function() { updateRecs('capitol hill', false, maleRecArray, finalRecs, finalMaleRecArray);};
  var updateRecsTimeoutFunction4 = function() { updateRecs('capitol hill', false, maleRecArray, finalRecs, finalMaleRecArray);};

 // Updates capitol hill male tinder recommendations
  // updateTinderToken('capitol hill', true);
  // updateLoc('capitol hill', true);

  //for (var i = 0; i < 4; i++) {
  //  setTimeout(updateRecsTimeoutFunction1, 10000*i);
  //  setTimeout(updateRecsTimeoutFunction2, 20000*i);
  //  setTimeout(updateRecsTimeoutFunction3, 30000*i);
  //  setTimeout(updateRecsTimeoutFunction4, 40000*i);
  //}

 //Updates capitol hill female tinder recommendations
  //updateTinderToken('capitol hill', false);
  //updateLoc('capitol hill', false);
  //updateRecs('capitol hill', false);

 //Calculates ratio and saves to database
 //calculateRatio('capitol hill', true, false);

 storePics('capitol hill', true);
 storePics('capitol hill', false);
 
});




