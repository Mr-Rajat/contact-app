const express = require('express');
const router = express.Router();

const fetchuser = require('../middleware/fetchuser');

const Contacts = require('../models/Contacts');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get All the Contacts using: GET "/api/contacts/fetchallcontacts" Login Required
router.get('/fetchallcontacts', fetchuser, async (req, res) => {

    try {

        const contacts = await Contacts.find({ user: req.user.id });
        res.json(contacts)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

//ROUTE 2: Add a new contact using: POST "/api/contacts/addcontact" Login Required
router.post('/addcontact', fetchuser, [
    body('name', 'Enter a valid title').isLength({ min: 3 }),
    body('email', 'Description must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {

    try {
        // destructured data from the body
        const { name, email, tag } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // setting values as defined in schema 
        const contact = new Contacts({
            name, email, tag, user: req.user.id
        })
        // once contact is set 
        const savedContact = await contact.save()

        res.json(savedContact);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router