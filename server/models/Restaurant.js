import mongoose from "mongoose";

const RestaurantSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    token:{
        type:String,
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Items"
    }],
    ratings:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        },
        rating:{
            type:Number,
        }
    }],
    avg_rating:{
        type:Number,
    }
})

const Restaurants=mongoose.model("Restaurants",RestaurantSchema);

export default Restaurants;