const propertyModel = require('../models/propertyModel')

const getAllPropertyController = async(req,res) =>{
    try {
        const properties = await propertyModel.find({})
        res.status(200).send({
            success:true,
            message:'Fetched All properties',
            properties
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in showing all properties"
        })
    }
}

const getPropertyController = async(req,res) =>{
    try {
        const property = await propertyModel.findOne({_id:req.params.property_id})
        res.status(200).send({
            success:true,
            message:'Fetched Single Property',
            property
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in showing property"
        })
        
    }
}

const createPropertyController = async(req,res) =>{
    try {
        const {location,budget,size} = req.body;
        if(!location){
            return res.send({error:"Location is requried"});
        }
        if(!budget){
            return res.send({error:"Budget is required"});
        }
        if(!size){
            return res.send({error:"Size is Required"});
        }

        const property = await new propertyModel({
            location,
            budget,
            size,
        }).save();
       
        res.status(201).send({
            success:true,
            message:"Property Added successfully",
            property,
        });   
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in creating property"
        })
        
    }
}

const updatePropertyController = async(req,res) =>{
    try {
        const {location,budget,size} = req.body
        switch(true){
            case !location:
                return res.status(500).send({error:"Location is Required"})
            case !budget:
                return res.status(500).send({error:"Budget is required"})
            case !size:
                return res.status(500).send({error:"Size is Required"})
        }
        const properties = await propertyModel.findByIdAndUpdate(req.params.property_id,
            {...req.body},{new:true}
            )
        
            await properties.save()
            res.status(201).send({
                success:true,
                message:'Property updated successfully',
                properties,
            })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in updating property"
        })
    }
}

const deletePropertyController = async(req,res) =>{
    try {
        await propertyModel.findByIdAndDelete({_id:req.params.property_id})
        res.status(200).send({
            success:true,
            message:'Property deleted successfully',
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success:false,
            error,
            message:"Error in deleting property"
        })  
    }
}
module.exports = {getAllPropertyController,getPropertyController,createPropertyController,updatePropertyController,deletePropertyController}