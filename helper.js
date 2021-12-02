import { ObjectId } from "mongodb";
import { client } from "./index.js";

 async function createMovies(data) {
    return await client.db("b28wd").collection("movies").insertMany(data);
}
 async function deleteMoviebyId(id) {
    return await client.db("b28wd").collection("movies").deleteOne({ _id: ObjectId(id) });    //converts the  string id into objectId
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

async function createUser(data) {
    return await client.db("b28wd").collection("users").insertOne(data);
}

async function getUserbyName(username) {
    return await client.db("b28wd").collection("users").findOne({ username: username });
}

async function getUsers() {
    return await client.db("b28wd").collection("users").find().toArray();   //convert cursor to array
}

export { getUsers,getUserbyName,createUser,getMoviebyId, createMovies, updateMoviebyId, deleteMoviebyId, getMovies };