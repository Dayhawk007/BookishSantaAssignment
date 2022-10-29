import Restaurants from '../models/Restaurant.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createRestaurant=async(req,res)=>{
    try {
        const { name, email, password,phone } = req.body;
        const emailFormat=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!(email && password && name && phone)) {
            return res.status(400).send("All input is required");
        }
        if(!email.match(emailFormat)){
            return res.status(401).send("Email is invalid")
        }
        const oldRestaurant = await Restaurants.findOne({ email });
    
        if (oldRestaurant) {
          return res.status(409).send("Restaurant Already Exists. Please Login");
        }
        if(String(phone).length!=10){
            return res.status(401).send("Phone number should be of 10 digits")
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        const restaurant = await Restaurants.create({
          name,
          email: email.toLowerCase(),
          phone,
          password: encryptedPassword,
        });
        const token = jwt.sign(
            { user_id: restaurant._id, email },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "2h",
            }
          );    
        restaurant.token = token;
        res.status(201).json(restaurant);
      } catch (err) {
        console.log(err);
      }
}