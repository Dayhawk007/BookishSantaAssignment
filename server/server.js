import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import user from './routes/user.js'
import restaurant from './routes/restaurant.js'
import item from './routes/item.js'

const app = express();
dotenv.config()
app.use(helmet());
app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));


app.use('/user/',user );
app.use("/restaurant/",restaurant);
app.use("/item/",item);

const PORT=process.env.PORT || 3000;
const CONNECTION_URL=process.env.MONGODB_URL;
mongoose.connect(CONNECTION_URL,{ useNewUrlParser : true , useUnifiedTopology:true})
.then(() => app.listen(PORT,() => console.log(`Server is running on port: ${PORT}`)))
.catch((error) => console.log(error.message) );
