const express=require('express');

const {getAllContacts,createContact,getContact,updateContact,deleteContact} =require('../controllers/contact');

const router=express.Router();

//get all contacts
router.get('/',getAllContacts);
//create new contact
router.post('/',createContact);
//get new contact
router.get('/:id',getContact);
//update a contact
router.put('/:id',updateContact);
//delete a contact
router.delete('/:id',deleteContact);

module.exports=router;