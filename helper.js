import { ObjectId } from "mongodb";
import { client } from "./index.js";

 async function createMovies(data) {
    return await client.db("b28wd").collection("movies").insertMany(data);
}
 async function deleteMoviebyId(id) {
    return await client.db("b28wd").collection("movies").deleteOne({ id: ObjectId(id) });    //converts the id into objectId
}
 async function updateMoviebyId(id, data) {
    return await client.db("b28wd").collection("movies").updateOne({ _id: ObjectId(id)  }, { $set: data });
}
 async function getMoviebyId(id) {
    return await client.db("b28wd").collection("movies").findOne({ _id: ObjectId(id) });
}

async function getMovies(filter) {
    return await client.db("b28wd").collection("movies").find(filter).toArray();   //convert cursor to array
}

export { getMoviebyId, createMovies, updateMoviebyId, deleteMoviebyId, getMovies };