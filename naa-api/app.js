var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require ("mongoose");
var indexRouter = require('./routes/index.js');
var config = require ('./config/db')

var app = express();

//mongoose setup
mongoose.Promise = Promise;
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database`);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});


app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',indexRouter);


app.listen(app.get('port'), (err) => {
  if (err) {
    console.log("problem")
    throw err
  }
  console.log(`server is listening on port ${app.get('port')}`)
})
module.exports = app;
