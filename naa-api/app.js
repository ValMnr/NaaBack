var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var cors = require('cors')
var logger = require('morgan');
var mongoose = require ("mongoose");
var indexRouter = require('./routes/index.js');
var config = require ('./config/db')

var app = express();
app.use(cors())
//mongoose setup
mongoose.Promise = Promise;
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())



// ROUTER DECLARATION
app.use("/",indexRouter);

app.listen(app.get('port'), (err) => {
  if (err) {
    console.log("problem")
    throw err
  }
  console.log(`server is listening on port ${app.get('port')}`)
})
module.exports = app;
