const express = require('express');
const router = express.Router();

const fetchuser = require('../middleware/fetchuser');

const Contacts = require('../models/Contacts');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get All the Contacts using: GET "/api/contacts/fetchallcontacts" Login Required
router.get('/fetchallcontacts', fetchuser, async (req, res) => {

    try {

        const contacts = await Contacts.find({ user: req.user.id });
        return res.json(contacts)

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error")
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

        res.status(200).send({data:savedContact,msg:"Successfully Added Data"});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

//ROUTE 3: Update an existing contact using: PUT "/api/contacts/updatecontact" Login Required

router.put('/updatecontact/:id', fetchuser, async (req, res) => {
    const { name, email, tag } = req.body;
    try {

        //create a newContact object

        const newContact = {};
        if (name) { newContact.name = name };
        if (email) { newContact.email = email };
        if (tag) { newContact.tag = tag };

        // find the user who is updating  // param mean id from the url /updatecontact/:id
        let contact = await Contacts.findById(req.params.id);
        if (!contact) {
            return res.status(404).send("Not Found")
        }
        //  find the note to be updated and update it
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // update the the contact with new values, and new true means if there is new contact values then those will be added
        contact = await Contacts.findByIdAndUpdate(req.params.id, { $set: newContact }, { new: true })
        // res.json({ contact });
        res.status(200).send({data:contact, msg:"Contact has been updated Successfully"});
        // const note = Notes.findByIdAndUpdate()

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE 4: Delete an existing contact using: DELETE "/api/contacts/deletecontact" Login Required

router.delete('/deletecontact/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it
        let contact = await Contacts.findById(req.params.id);
        if (!contact) {
            return res.status(404).send("Not Found")
        }
        //  Allow Deletion only if user owns this note

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        contact = await Contacts.findByIdAndDelete(req.params.id)
        // res.json({ "Success": "Contact has been deleted", contact: contact });
        res.status(200).send({data:contact, msg:"Contact has been deleted"});
        // const note = Notes.findByIdAndUpdate()

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router