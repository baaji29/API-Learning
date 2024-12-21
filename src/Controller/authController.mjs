import UserModal from "../modal/userModal.mjs";
import bcrypt from "bcrypt"
import JWT from 'jsonwebtoken'

export const login = async (req, res) => {

    const {email, password} = req.body;

    if(!email || !password) return res.status(401).send({message: `ID or Password Missing`})
    
    const user = await UserModal.findOne({email});
    if(!user) return res.status(404).send({message: `user not found`})

    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched) return res.status(404).send({message: `Invalid Credentials`});

    const token = JWT.sign({
        id:user._id,
        name: user.name,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    })

    res.status(200).send({message: `${token}`})

}

export const register = async (req, res) => {
    try {        
        const {email, name, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);    
        const newUser = new UserModal({email, name, password: hashedPassword, role});
        await newUser.save();    
        res.status(200).send({message: `User Registered, Name: ${name}, Email: ${email}`})
    } catch (error) {
        res.status(400).send({message: `something went wrong ${error}`})   
    }
}