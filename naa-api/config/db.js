
var db = {
    'database': process.env.NODE_ENV == 'test' ? 'mongodb://localhost/NaaAPI' : 'mongodb://localhost/NaaAPI'
    };
  
module.exports = db;
  