import { user } from "./userData.mjs";

let users = user;

export const idChecks = (req, res, next) => {
    const {body, params: {id}} = req;
    const parsedID = parseInt(id);
    if(isNaN(parsedID)) return res.status(400).send("Invalid Id.....!");
    const findUser = users.findIndex((user) => user.id === parsedID);
    console.log(findUser)
    if(findUser === -1) return res.status(400).send("User not found.....!");
    req.findUser = findUser
    next();
}