const mongoose = require("mongoose");

const roommateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
            min: 18,
            max: 60
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female']
        },
        vegNonveg: {
            type: String,
            required: true,
            enum: ['Veg', 'Nonveg']
        },
        propertyId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Property',
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Roommate', roommateSchema)