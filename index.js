var express = require("express");
var path    = require('path');
var rweb    = require('./routes/web');
var app     = express();

// thiet lap duong dan static
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(3000);

app.use('/', rweb);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
