import mongoose from "mongoose";

const UserSchema= mongoose.Schema({
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
        unique:true,
    },
    address:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    orders:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order"
    }
})

const Users=mongoose.model("Users",UserSchema);

export default Users;