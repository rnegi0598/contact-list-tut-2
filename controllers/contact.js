const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");

//@desc get all contacts of a user logged in 
//@route GET /api/contacts/
//@access public
const getAllContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({userId:req.user.id});
  res.json(contacts);
});

//@desc create contact
//@route POST /api/contacts/
//@access public
const createContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.statusCode = 400;
    throw new Error("name ,email or phone incomplete");
  }

  const contact = new Contact({
    userId:req.user.id,
    name,
    email,
    phone,
  });
  await contact.save();
  res.json(contact);
});

//@desc get a contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res, next) => {
  const id=req.params.id;
  const contact=await Contact.findById(id);
  if(contact.userId.toString()!==req.user.id){
    res.statusCode=403;
    throw new Error('canot acces other users contacts');
  }

  res.json(contact);
});


//@desc update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res, next) => {
  const id=req.params.id;
  const {name,email,phone}=req.body;
  if(!name || !email || !phone){
    res.statusCode=400;
    throw new Error('incomplete fields');
  }
  const contact=await Contact.findById(id);
  if(contact.userId.toString()!== req.user.id){
    res.statusCode=403
    throw new Error('cannot update other user contact')
  }
  contact.name=name;
  contact.email=email;
  contact.phone=phone;
  await contact.save();
  res.json(contact);
});

//@desc delete a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res, next) => {
  const id =req.params.id;
  const contact=await Contact.findByIdAndDelete(id);
  if(contact.userId.toString()!==req.user.id){
    res.statusCode=403;
    throw new Error('cannot delete other users contact')
  }
  res.json(contact);
});




module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
