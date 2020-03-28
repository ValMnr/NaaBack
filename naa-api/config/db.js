
var db = {
    'database': process.env.NODE_ENV == 'test' ? 'mongodb://localhost/DashboardProject' : 'mongodb://localhost/DashboardProject'
    };
  
    module.exports = db;
  