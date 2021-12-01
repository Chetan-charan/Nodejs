import { client } from "./index.js";

 async function createMovies(data) {
    return await client.db("b28wd").collection("movies").insertMany(data);
}
 async function deleteMoviebyId(id) {
    return await client.db("b28wd").collection("movies").deleteOne({ id: id });
}
 async function updateMoviebyId(id, data) {
    return await client.db("b28wd").collection("movies").updateOne({ id: id }, { $set: data });
}
 async function getMoviebyId(id) {
    return await client.db("b28wd").collection("movies").findOne({ id: id });
}

async function getMovies(filter) {
    return await client.db("b28wd").collection("movies").find(filter).toArray();   //convert cursor to array
}

export { getMoviebyId, createMovies, updateMoviebyId, deleteMoviebyId, getMovies };