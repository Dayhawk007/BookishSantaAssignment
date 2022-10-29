import mongoose from "mongoose";

const ItemSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80"
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurants"
    }
})

const Items=mongoose.model("items",ItemSchema);

export default Items;