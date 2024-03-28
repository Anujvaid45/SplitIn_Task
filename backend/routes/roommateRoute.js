const express = require('express')
const router = express.Router()

//controller functions
const { createRoommateController, getAllRoommateController, updateRoommateController, deleteRoommateController, getRoommateController } = require('../controllers/roommateController')

//routing 
//get all roommates
router.get('/api/roommates',getAllRoommateController)

//get a particular roommate
router.get('/api/roommates/:roommate_id',getRoommateController)

//create a new roommate
router.post('/api/roommates',createRoommateController)

//update a roommate
router.put('/api/roommates/:roommate_id',updateRoommateController)

//delete a roommate
router.delete('/api/roommates/:roommate_id',deleteRoommateController)

module.exports = router

