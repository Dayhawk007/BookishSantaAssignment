# Bookish Santa Assignment

## Enviornment variables to add in the .env file

> PORT MONGODB_URL TOKEN_SECRET

## Install all the node modules with

`npm i`

## All API Endpoints 
### Here I am using 3000 as default port

http://localhost:3000/user/register    --registers user \n
http://localhost:3000/user/login       --logins user \n
http://localhost:3000/restaurant/loginRestaurant   --logins restaurant \n
http://localhost:3000/restaurant/createRestaurant  --registers restaurant \n
http://localhost:3000/restaurant/:id/AddItem        --Adds Item to Restaurant \n
http://localhost:3000/restaurant/:rest_id/UpdateItem/:item_id     --Updates qty of Item \n
http://localhost:3000/item/searchItem/:q          --Searches Items that have the query in it \n
http://localhost:3000/user/:user_id/:rest_id/createOrder   --Creates an order and generates invoice \n
http://localhost:3000/user/:user_id/rest_id/giveRating     --Gives rating to the particular restaurant by the user \n

