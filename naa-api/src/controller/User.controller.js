var User = require('../models/User.model');
var bcrypt = require('bcrypt')

var mongoose = require('mongoose');

createUser = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, result) => {
        if (result != null) {
            console.log("User with this email exist")
            return res.status(500).json('user already exists')
        } else {
            var user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                pseudo: req.body.pseudo,
                createdAt: Date.now()
            });
            user.save((err, user) => {
                if (err) {
                    return res.status(500).send(err)
                }
                else {
                    console.log("User saved : " + user)
                    return res.status(200).json(user);
                }
            })
        }
    });
}

authUser = (req, res, next) => {
    console.log(req.body)

    crtUser = User.findOne({ email: req.body.email }, (err, result) => {
        console.log("resr :", result.password)
        if (result == null) {
            console.log("couldn't find user")
            return res.status(500).json("email_not_exist")
        } else {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                return res.status(200).json("auth_ok")

            } else {
                return res.status(500).json("incorrect_password")
            }
        };
    });
}

async getUser(req,res){

    try {
        var users = await User.find().lean().exec();
        
        return res.status(200).json(users);

    }
    catch (err) {
        return res.json(err);
    }

     
}


  
}

module.exports = { createUser, authUser }; 
