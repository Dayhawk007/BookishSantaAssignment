import Users from "../models/User.js";
import Restaurants from "../models/Restaurant.js";
import Items from "../models/Item.js";
import Orders from "../models/Order.js";

export const createOrder = async(req,res)=>{
    try {
        const user_id=req.params.user_id;
        const rest_id=req.params.rest_id;
        const user=await Users.findById(user_id);
        const restaurant=await Restaurants.findById(rest_id);
        const restaurant_name=restaurant.name;
        const address=user.address;
        const items=req.body;
        var price=0;
        const item_details=[]
        const order= await Orders.create({
            restaurant_name,
            address
        })
        for(var i=0;i<items.length;i++){
            const item=await Items.findById(items[i]["id"]);
            const quanty=items[i]["qty"]
            order.items.item.push(item);
            order.items.qty.push(quanty);
            price+=quanty*item.price;
            const new_qt=item.qty-quanty;
            if(new_qt<0){
                return res.status(401).json({
                    "message":"Item out of stock",
                })
            }
            await item.update({qty:new_qt});
            item_details.push({item_name:item.name,price:item.price,qty:quanty})
        }
        order.price=price;
        order.save()
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        

        
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        res.status(200).json({
            "invoice":{
                user_name:user.name,
                restaurant_name,
                date: formattedToday,
                address,
                items:item_details,
                amount:price,
            }
        });

    } catch (error) {
        res.status(401).json({error})
    }
    
}