import Restaurants from "../models/Restaurant.js";
import Items from "../models/Item.js";

export const AddItem= async(req,res) =>{
    try {
        const{name,price,qty,desc,img_link}=req.body;
        const id=req.params.id;
        const item= await Items.create({
        name,
        price,
        qty,
        desc,
        img_link,
        restuarant:id
        })
        await item.save();
        const restaurant=await Restaurants.findById(id);
        restaurant.items.push(item);
        await restaurant.save();
        res.status(200).json(item);    
    } catch (error) {
        res.status(401).json({error});
    }
}

export const UpdateItem= async(req,res) =>{
    try {
        const item_id=req.params.item_id;
        const {qty}=req.body;
        await Items.findOneAndUpdate({_id:item_id},{qty}); 
        res.status(200).json({
            message:"Updated Item Qty"
        })
    } catch (error) {
        res.status(401).json({error})
        
    }
}

export const FindItem= async(req,res) =>{
    try {
        const q=req.params.q;   
        const items=await Items.find({name:{$regex: new RegExp(q)}});
        res.status(200).json(items);
    } catch (error) {
        res.status(401).json({error})
    }
}