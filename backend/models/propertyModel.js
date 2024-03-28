const mongoose =require( "mongoose");

const propertySchema = new mongoose.Schema(
  {
    location : {
        type: String,
        required: true,
    },
    budget : {
        type: Number,
        required: true,
        min:1000,
    },
    size : {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property',propertySchema)