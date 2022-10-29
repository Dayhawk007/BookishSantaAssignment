import mongoose from "mongoose";

const OrderSchema= mongoose.Schema({
    items:{
        item:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"items"
            }
        ],
        qty:[
            {
                type:Number,
            }
        ]
    },
    price:{
        type:Number,
    },
    restaurant_name:{
        type:String,
    },
    address:{
        type:String,
    },
})

const Orders=mongoose.model("orders",OrderSchema);

export default Orders;