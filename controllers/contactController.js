const asyncHandler =require("express-async-handler")
const Contact = require("../models/contactModel")
//@desc Get all COntacts
//@route Get /api.contacts
//@acess private 

const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
});

//@desc create new   COntact
//@route Post /api/contacts
//@acess private 

const createContact = asyncHandler(async (req,res) => {
    console.log("the request body is",req.body); 
    const {name,email,phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandotory")
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc update   COntact
//@route put /api/contacts/id
//@acess private 

const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("contact not Found")
    };
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to update other user constacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

//@desc get   COntact
//@route GET /api/contacts/id
//@acess private 

const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("contact not Found")
    }
    res.status(200).json(contact);
});

//@desc delete   COntact
//@route Delete /api/contacts/id
//@acess private 

const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("contact not Found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to delete other user constacts")
    }
     await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json(contact)
});

module.exports ={getContact,createContact,updateContact,getContacts,deleteContact};