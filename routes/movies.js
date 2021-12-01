import { getMoviebyId, createMovies, updateMoviebyId, deleteMoviebyId,getMovies } from "../helper.js";
import express from "express";

const router = express.Router();      //import Router from express

router.route("/").get(async (req,res) => {
   
    let filter = req.query;     //json object of query parameters
    if(filter.rating){
        filter.rating = parseFloat(filter.rating);
    }
    console.log(filter);
    const  filterMovies = await getMovies(filter);
    res.send(filterMovies);
    
})
.post( async (req,res)=> {                            //doing chaining as route is same for both methods - /movies
    const data = req.body;                            //data is given from postman -> body -> raw -> Json
    const result = await createMovies(data);    
    res.send(result);
})

router.route("/:id").get(async (req,res) => {
  
    const { id } = req.params;                                        //getting id using object destructuring
    const movie = await getMoviebyId(id)      //using code refactoring so that the code can be reused   //pass id to search
    console.log(movie);
    movie ? res.send(movie) : res.send("No match found")              
    
}).put(async (req,res) => {

    const { id } = req.params;
    const data = req.body;
    const result = await updateMoviebyId(id, data);           //update the movie
    const movie = await getMoviebyId(id);                     //displaying the updated movie
    result.modifiedCount > 0 ? res.send(movie) : res.status(404).send({ message: "No Movie Found" });   //console.log(result) to get its attributes

}).delete(async (req,res) => {

    const { id } = req.params;
    const result = await deleteMoviebyId(id);
    result.deletedCount > 0 ? res.send(result) : res.status(404).send({ message: "No Matching movie found" });   
    
})







export const moviesRouter = router;



