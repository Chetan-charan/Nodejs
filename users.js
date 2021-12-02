import  express from "express";
import { client } from "./index.js";
import bcrypt from "bcrypt";
import { getUsers,createUser,getUserbyName } from "./helper.js"

const router = express.Router();

async function genPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}

router.route("/signup")
.post( async (req,res) => {
    const {username,password} = req.body;
    const user = await getUserbyName(username);
    if(user){
        res.status(401).send({message: "User already exists"})
        return;
    }
    if(password.length<8){
        res.send({message: "password must be longer"})    
        return;                    //so that execution stops here and doesnt go furthur
    }
    const hashedPassword = await genPassword(password);
    const result = await createUser({username, password: hashedPassword});
    res.send(result);
  
})


router.route("/")
.get(async (req,res) => {
   
    const users = await getUsers();
    res.send(users);

})

router.route("/login")
.post( async (req,res) => {
    const {username,password} = req.body;
  
        const user = await getUserbyName(username);
        if(!user){                                                   //if user doesnt exist
            res.status(401).send({ message: "Invalid credentials" })        
            return;
        }
        const storedPassword = user.password;

        const isPasswordMatch = await bcrypt.compare(password,storedPassword);
        if(isPasswordMatch){
            res.send({ message: "Successfully logged In !!!" });
        }else {
            res.send({ message: "Invalid Credentials" })                   //if password is wrong
        }

})


export const usersRouter = router;