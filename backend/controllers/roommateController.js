const roommateModel = require('../models/roommateModel')

const getAllRoommateController = async(req,res) =>{
    try {
        const roommates = await roommateModel.find({})
        res.status(200).send({
            success:true,
            message:'Fetched all roommates',
            roommates
        })      
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in showing all roommates"
        })
    }
}

const getRoommateController = async(req,res) =>{
    try {
        const roommate = await roommateModel.findOne({_id:req.params.roommate_id})
        res.status(200).send({
            success:true,
            message:'Fetched roommate',
            roommate
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in showing roommate"
        })
    }
}

const createRoommateController = async(req,res) =>{
    try {
        const { name, age, gender, vegNonveg, propertyId } = req.body;
        if(!name){
            return res.send({error:"Name is requried"});
        }
        if(!age){
            return res.send({error:"Age is required"});
        }
        if(!gender){
            return res.send({error:"Gender is Required"});
        }
        if(!vegNonveg){
            return res.send({error:"Veg/nonVeg is Required"});
        }
        if(!propertyId){
            return res.send({error:"PropertyId is Required"});
        }

        const roommate = await new roommateModel({
            name, 
            age, 
            gender, 
            vegNonveg, 
            propertyId
        }).save();

        res.status(201).send({
            success:true,
            message:"roommate Added successfully",
            roommate,
        });   
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in creating roommate"
        })
    }
}

const updateRoommateController = async(req,res) =>{
    try {
        const {name, age, gender, vegNonveg, propertyId} = req.body
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is Required"})
            case !age:
                return res.status(500).send({error:"Age is required"})
            case !gender:
                return res.status(500).send({error:"Gender is Required"})
            case !vegNonveg:
                return res.status(500).send({error:"Veg/NonVeg is required"})
            case !propertyId:
                return res.status(500).send({error:"PropertyId is Required"})
        }
        const roommates = await roommateModel.findByIdAndUpdate(req.params.roommate_id,
            {...req.body},{new:true}
            )
            await roommates.save()
            res.status(201).send({
                success:true,
                message:'Roommate updated successfully',
                roommates,
            })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in updating roommate"
        })
    }
}

const deleteRoommateController = async(req,res) =>{
    try {
        await roommateModel.findByIdAndDelete({_id:req.params.roommate_id})
        res.status(200).send({
            success:true,
            message:'Roommate deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in deleting roommate"
        })
    }
}

module.exports = {getAllRoommateController,createRoommateController,getRoommateController,updateRoommateController,deleteRoommateController}