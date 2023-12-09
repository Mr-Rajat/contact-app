const express = require('express');
const router = express.Router();

const fetchuser = require('../middleware/fetchuser');

const Contacts = require('../models/Contacts');
const { body } = require('express-validator');
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
router.get('/fetchallcontacts', fetchuser, contactController.fetchContacts);

//ROUTE 2: Add a new contact using: POST "/api/contacts/addcontact" Login Required
router.post('/addcontact', fetchuser, upload.single('image'),
    [
        body('name', 'Enter a valid title').isLength({ min: 3 }),
        body('email', 'Description must be atleast 5 characters').isLength({ min: 5 }),

    ], 
    contactController.createContacts
    )

//ROUTE 3: Update an existing contact using: PUT "/api/contacts/updatecontact" Login Required

router.put('/updatecontact/:id', fetchuser, contactController.update)

//ROUTE 4: Delete an existing contact using: DELETE "/api/contacts/deletecontact" Login Required

router.delete('/deletecontact/:id', fetchuser, contactController.delete)

module.exports = router