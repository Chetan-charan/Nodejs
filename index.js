import  express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { moviesRouter } from './routes/movies.js';
import cors from "cors";


dotenv.config();
// console.log(process.env);
const app = express()

app.use(cors());

const PORT = process.env.PORT;   

app.use(express.json())    //every request in the app body will be parsed as json

const MONGO_URL = process.env.MONGO_URL;   //only line to be changed to make the database online(atlas)



async function createConnection(){                          //creating mongodb connection
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongodb connected");
    return client;
}

export const client = await createConnection();

app.get('/',(req,res) => {
    res.send("Hello  🌎 ***")
})

app.use("/movies",moviesRouter);



app.listen(PORT, () => console.log("App is started in Port",PORT));


