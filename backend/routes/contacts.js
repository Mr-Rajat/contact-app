const express = require('express');
const router = express.Router();

const fetchuser = require('../middleware/fetchuser');

const Contacts = require('../models/Contacts');
const { body, validationResult } = require('express-validator');
const contactController = require('../controllers/contactController');
const multer = require('multer');

const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});

//ROUTE 1: Get All the Contacts using: GET "/api/contacts/fetchallcontacts" Login Required
router.get('/fetchallcontacts', fetchuser, async (req, res) => {

    try {

        const contacts = await Contacts.find({ user: req.user.id });
        // console.log(contacts, "contacts")
        return res.json(contacts)

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error")
    }

})

//ROUTE 2: Add a new contact using: POST "/api/contacts/addcontact" Login Required
router.post('/addcontact', fetchuser, upload.single('image'),
    // [
    //     body('name', 'Enter a valid title').isLength({ min: 3 }),
    //     body('email', 'Description must be atleast 5 characters').isLength({ min: 5 }),

    // ], 

    async (req, res) => {

        // return console.log("fileData", req.file);
        // console.log(req.body, "Form Data");
        // console.log(req.uploads);

        try {
            // destructured data from the body
            const { name, email, tag } = req.body;

            // console.log("Name", name, "email", email);
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // setting values as defined in schema 
            const contact = new Contacts({
                name, email, tag, user: req.user.id, image: req.file.filename
            })
            // once contact is set 
            const savedContact = await contact.save()

            res.status(200).send({ data: savedContact, msg: "Successfully Added Data" });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }

    })

//ROUTE 3: Update an existing contact using: PUT "/api/contacts/updatecontact" Login Required

router.put('/updatecontact/:id', fetchuser, contactController.update)

//ROUTE 4: Delete an existing contact using: DELETE "/api/contacts/deletecontact" Login Required

router.delete('/deletecontact/:id', fetchuser, contactController.delete)

module.exports = router