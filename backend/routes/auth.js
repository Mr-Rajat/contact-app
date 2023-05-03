const express = require('express');
const router = express.Router();
const User = require('../models/User');
// express-valiator
const { body, validationResult } = require('express-validator');


// Create a User using: POST "/api/auth/createuser". Doesn't require Auth

router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res)=>{
  
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({  errors: errors.array() });
    }

    try{

        // Check whether the user with this email exist already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        
        user = await User.create({ 
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            // password: secPass
        })
    
        res.json(user)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
        // .then(user => res.json(user))
    // .catch (error => {console.log(error)
    // res.json({err: 'Please enter a unique value for email', message:error.message})}) 
    // {
        // console.error(error.message);
        // res.status(500).send("Internal Server Error")
    // }
    // res.send(req.body)
    // res.send("hello")
})

module.exports = router