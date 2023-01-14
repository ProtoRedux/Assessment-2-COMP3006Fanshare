let http = require ("http");
var express = require("express");
var bodyParser = require ("body-parser");
var mongoose = require ("mongoose");
var app = express();
var session = require ("express-session");
const mongoAtlasUri = "mongodb+srv://Chaz:oueNekPAQDvGjIew@cluster0.aide3vs.mongodb.net/COMP3006_FanShare?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

//using ressions to track logged in users
app.use(session({
  secret: "listening with fanshare",
  resave: true,
  saveUninitialized:false
}));

//connecting to MongoDB via mongoose
mongoose.connect(mongoAtlasUri, {useUnifiedTopology: true, useNewUrlParser: true},()=> console.log("Mongoose connection success, Application running"));
var db = mongoose.connection;

// mongo error
db.on('error', console.error.bind(console, 'connection error:'));
var db = mongoose.connection;


//mongodb error handler for connections

db.on("error",console.error.bind(console,"connection error: "));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /Statics
app.use(express.static(__dirname + '/Statics'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/Views');

// include routes
var routes = require('./Routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(9000,function(){
    console.log("Express app listening on port 9000")
});

