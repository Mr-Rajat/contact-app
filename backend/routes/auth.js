const express = require('express');
const router = express.Router();
const User = require('../models/User');
// express-valiator
const { body, validationResult } = require('express-validator');
// bcryptjs package for salting, pepper and hashing
const bcrypt = require('bcryptjs')
// middleware 
var fetchuser = require('../middleware/fetchuser');
// jwt auth token
const JWT_SECRET = 'Rajatisagoodb$oy' // add it as env for not hardcoding same
var jwt = require('jsonwebtoken');


// Create a User using: POST "/api/auth/createuser". Doesn't require Auth

router.post('/createuser', [
    // Validation check
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;
    //to add user without validatin 
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // error handling
    try {

        // Check whether the user with this email exist already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
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
        const authToken = jwt.sign(data, JWT_SECRET, {
            expiresIn: '120s' // expires in 2min
        });
        console.log({ authToken });

        success = true;
        res.json({ success, authToken })
        // sending response
        // res.json(user)
    }
    // Catch Error
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

//ROUTE 2: Authenticate a User using: POST "/api/auth/login" NO LOGIN REQUIRED

router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    // body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success: success, error: "Please try to login with correct Credentials" });
        }

        // console.log(user);
        
        // console.log(user._id, "id")
        const data = {
            user: {
                id: user.id
            }
        }
        // console.log(data, "data value");

        // console.log(data.user, "Data")

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

//ROUTE 3: Get loggedin User details using: POST "/api/auth/getuser" Login Required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        // select fields except password
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router