const express = require('express');
const router = express.Router();
const User = require('../models/User');
// express-valiator
const { body, validationResult } = require('express-validator');
// bcryptjs package for salting, pepper and hashing
const bcrypt = require('bcryptjs')
// jwt auth token
const JWT_SECRET = 'Rajatisagoodb$oy' // add it as env for not hardcoding same
var jwt = require('jsonwebtoken');


// Create a User using: POST "/api/auth/createuser". Doesn't require Auth

router.post('/createuser',[
    // Validation check
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res)=>{
//to add user without validatin 
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({  errors: errors.array() });
    }
    // error handling
    try{

        // Check whether the user with this email exist already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        // creating salt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt); //req.body.password

        // create user
        user = await User.create({ 
            name: req.body.name,
            email: req.body.email,
            // password: req.body.password,
            password: secPass
        });

        // jwt token setting
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log({authToken});
        res.json({ authToken })
    // sending response
        // res.json(user)
    }
    // Catch Error
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router