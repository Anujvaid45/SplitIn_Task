const express = require('express')
const router = express.Router()

//controller functions
const { getAllPropertyController, getPropertyController, createPropertyController, updatePropertyController, deletePropertyController } = require('../controllers/propertyController')

//routing 
//get all properties
router.get('/api/properties',getAllPropertyController)

//get a particular property
router.get('/api/properties/:property_id',getPropertyController)

//create a new property
router.post('/api/properties',createPropertyController)

//update a property
router.put('/api/properties/:property_id',updatePropertyController)

//delete a property
router.delete('/api/properties/:property_id',deletePropertyController)

module.exports = router

