
var db = {
    'database': process.env.NODE_ENV == 'test' ? 'mongodb+srv://dbUser:dbUserPassword@cluster0-qmnqf.mongodb.net/test?retryWrites=true&w=majority' : 'mongodb+srv://dbUser:dbUserPassword @cluster0-qmnqf.mongodb.net/test?retryWrites=true&w=majority'
    };
  
module.exports = db;
  

