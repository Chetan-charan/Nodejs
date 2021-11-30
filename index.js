import  express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
console.log(process);
const app = express()

const PORT = 9000

app.use(express.json())    //every request in the app body will be parsed as json

const MONGO_URL = process.env.MONGO_URL;   //only line to be changed to make the database online(atlas)

//mongodb+srv://chetan:<password>@cluster0.hz7iv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

async function createConnection(){                          //creating mongodb connection
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongodb connected");
    return client;
}

const client = await createConnection();

app.get('/',(req,res) => {
    res.send("Hello  🌎 !!!")
})

app.get('/movies',async (req,res) => {
   
    let filter = req.query;     //json object of query parameters
    if(filter.rating){
        filter.rating = parseFloat(filter.rating);
    }
    console.log(filter);
    const  filterMovies = await client.db("b28wd").collection("movies").find(filter).toArray();
    res.send(filterMovies);
    
})

app.get('/movies/:id',async (req,res) => {
  
    const { id } = req.params;                                        //getting id using object destructuring
    const movie = await getMoviebyId(id)      //using code refactoring so that the code can be reused   //pass id to search
    console.log(movie);
    movie ? res.send(movie) : res.send("No match found")              
    
})

app.post("/movies", async (req,res)=> {
    const data = req.body;                            //data is given from postman -> body -> raw -> Json
    const result = await client.db("b28wd").collection("movies").insertMany(data);    
    res.send(result);
})

app.put("/movies/:id",async (req,res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await updateMoviebyId(id, data);
    const movie = await getMoviebyId(id);
    result.modifiedCount > 0 ? res.send(movie) : res.status(404).send({ message: "No Movie Found" });
})

app.delete("/movies/:id",async (req,res) => {
    const { id } = req.params;
    const result = await deleteMoviebyId(id);
    result.deletedCount > 0 ? res.send(result) : res.status(404).send({ message: "No Matching movie found" });   
    
})

app.listen(PORT, () => console.log("App is started in Port",PORT));

async function deleteMoviebyId(id) {
    return await client.db("b28wd").collection("movies").deleteOne({ id: id });
}

async function updateMoviebyId(id, data) {
    return await client.db("b28wd").collection("movies").updateOne({ id: id }, { $set: data });
}

async function getMoviebyId(id) {
    return await client.db("b28wd").collection("movies").findOne({ id: id });
}
