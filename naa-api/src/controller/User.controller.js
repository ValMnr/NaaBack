var User = require('../models/User.model');

var mongoose = require('mongoose')

 createUser = (req,res,next) =>{
    console.log("Post Request"+req.body.firstName)
     
    var user = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        pseudo: req.body.pseudo,
        createdAt: Date.now()
    });
    user.save( (err,user)=>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            console.log("User saved : "+user)
            return res.status(200).json(user);
        }
    } )
    
}


module.exports = {createUser}  ; 