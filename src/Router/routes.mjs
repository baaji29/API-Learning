import { Router } from "express";
import { checkSchema, matchedData, query, validationResult } from "express-validator"; 
import { user } from "../util/userData.mjs";
import { idChecks } from "../util/idCheck.mjs";
import { UserValidation } from "../util/validation.mjs";


const userrouter = Router();

const users = user;

userrouter.get("/users/filtered", 
    // checkSchema(UserValidation),
    query("value").isString().isLength({min: 3, max: 8}).withMessage("Must be atleast 3 character and should not exceed 8 char").notEmpty().withMessage("should not Empty") ,
    (req,res) => {
    const result = validationResult(req);

    const {query: {filter, value}} = req

    // !result.isEmpty()
    if(result.isEmpty()){
        if(filter && value) {
            return res.send(
                users.filter((user) => user[filter].includes(value))
            );
        }
    }
    return res.send(users);
})


userrouter.get("/users",(req, res) => {
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if(err) {
            console.log("error".err);
        } else {
            console.log("session Data",sessionData)
        }
    })
    return res.status(200).send(users)
 })
 

userrouter.get("/users/:id", idChecks, (req, res) => {
    const {findUser} = req;
    const findusers = users[findUser]
    if(!findusers) return res.status(400).send("Invalid Id..!");
 
    return res.status(200).send(findusers)
 })

//  post method
userrouter.post("/users/filtered", checkSchema(UserValidation),
    // body("name").isString().notEmpty().isLength({min: 3, max: 18}).withMessage("Minimum 3 character and Maximum 18 character"), 
    (req,res) => {
    const result = validationResult(req);
    if(!result.isEmpty())
        return res.status(400).send({error: result.array()})

    const data = matchedData(req);
    const newUser = { id: users[users.length - 1].id + 1, ...data}
    users.push(newUser)
    return res.status(200).send(users);
})

// put method 
userrouter.put("/users/:id", idChecks, (req, res) => {
    const {body, findUser} = req;
    users[findUser] = {id:users[findUser].id, ...body}
    return res.status(200).send(users)
})

// path method 
userrouter.patch("/users/:id", idChecks, (req, res) => {
    const {body, findUser} = req;
    users[findUser] = {...users[findUser], ...body}
    return res.status(200).send(users)
})

// delete method 
userrouter.delete("/users/:id", idChecks,  (req, res) => {
    const {findUser} = req;
    users.splice(findUser, 1);
    return res.status(200).send(users);
})

export default userrouter;