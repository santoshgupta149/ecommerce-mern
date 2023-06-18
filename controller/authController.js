import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT  from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const{ name, email, address, phone, password } = req.body;
        //validations
        if(!name){
            return res.send({error: "Name is required"});
        }
        if(!email){
            return res.send({error: "Email is required"});
        }
        if(!address){
            return res.send({error: "Address is required"});
        }
        if(!phone){
            return res.send({error: "Phone no is required"});
        }
        if(!password){
            return res.send({error: "{Password} is required"});
        }

        //check user
        const existingUser = await userModel.findOne({email});

        //existing user
        if(existingUser){
            return res.status(200).send({
                success : true,
                message : "Already registered, Please login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        console.log(hashedPassword);

        //save 
        const user = await new userModel({name, email, address, phone, password: hashedPassword}).save()

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
    }
}

// export default {registerController}

//POST LOGIN
export const LoginController = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const passMatch = await comparePassword(password, user.password)
        if(!passMatch){
            return res.status(404).send({
                success: false,
                message: "Passwoed does not match"
            })
        }

        //create token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn : "7d"});
        res.status(200).send({
            user : {
                name:user.name,
                email: user.email,
                phone: user.phone
            },
        token
    });

    } catch (error) { 
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while login",
            error
        })
    }
}

//test controller

export const testController = (req, res) =>{
    res.send('protected route')
}