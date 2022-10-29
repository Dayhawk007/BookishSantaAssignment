import Users from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Restaurants from "../models/Restaurant.js";
dotenv.config();

export const registerUser= async(req,res) => {
  try {
    const { name, email, password,phone,address } = req.body;
    const emailFormat=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!(email && password && name && phone && address)) {
        return res.status(400).send("All input is required");
    }
    if(!email.match(emailFormat)){
        return res.status(401).send("Email is invalid")
    }
    
    const oldUser = await Users.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }
    if(String(phone).length!=10){
        return res.status(401).send("Phone number should be of 10 digits")
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: encryptedPassword,
      address,
    });
    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );    
    user.token = token;
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}

export const loginUser= async(req,res)=>{
    try {
        const {email,password}=req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await Users.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "2h",
              }
            );      
            user.token = token;
      
            res.status(200).json(user);
          }
          res.status(400).json({
            "error":"Invalid Credentials"
          })
    } catch (error) {
        res.status(401).json({error});
    }
}

export const giveRating= async(req,res)=>{
  try {
    const rest_id=req.params.rest_id;
    const user_id=req.params.user_id;
    const {rating}=req.body;
    var avg_rating=0;
    if(rating <0 || rating>5){
      return res.status(402).json({
        "message":"Rating should be between 0-5",
      })
    }
    const restaurant=await Restaurants.findById(rest_id);
    const user=await Users.findById(user_id);
    restaurant.ratings.push({user,rating});
    console.log("check")
    const all_ratings=restaurant.ratings;
    for(var i=0;i<all_ratings.length;i++){
      avg_rating+=(all_ratings[i]["rating"]/all_ratings.length);
    }
    console.log("check")
    if(restaurant.avg_rating){
      restaurant.update({avg_rating});
    }
    else{
      restaurant.avg_rating=avg_rating;
    }
    console.log("check")
    restaurant.save();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(401).json({error});
  }
}