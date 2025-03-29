import jwt from "jsonwebtoken";
import bcrypt, { hashSync } from "bcrypt";

let USERS = [
    
];

export const users = (req , res) => {
    res.json(USERS)
}

export const signup = async (req , res) =>{
    try {
        const salt = await bcrypt.genSalt();
        const hasedPassword = await bcrypt.hash(req.body.password , salt)
        const user = {name : req.body.name ,email : req.body.email ,password : hasedPassword }
        if (USERS.some(user => user.email === req.body.email)){
            return res.status(400).json({ error: 'User already exists' });
        }
        USERS.push(user);
        res.status(201).send("User Created")
    } catch (error) {
        console.log("Signup error")
        res.status(500).send()
    }
    
};

export const login = async (req , res) =>{
    const user = USERS.find(user => user.name === req.body.name && user.email === req.body.email)
    if (user == null){
        return res.status(400).json({ error: 'Cannot find user' });
    }
    try {
        if (await bcrypt.compare(req.body.password , user.password)){
            const token = jwt.sign(user , process.env.ACCESS_SECRET_KEY);
            res.json({
                accesstoken : token,
                user : {name : user.name , email : user.email}
            });
            console.log(token)
        }else{
            res.send("Denied");
        }
    } catch (error) {
        console.log("Login error")
        res.status(500).send()        
    }
};

export const logout = (req , res) =>{
    //since jwt is stateless that means deleting the token is enough as the token contains all the required data.
    res.json({ message: 'Logout successful' });
};
