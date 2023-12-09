const Contacts = require('../models/Contacts');

exports.update=async (req, res) => {
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
}

exports.delete = async (req, res) => {

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
}
