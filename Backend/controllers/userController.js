import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }); 
    if (!user) {
      return res.json({success:false, message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.json({success:false,message:"invalid Credentails"})
    }

    const token = createToken(user._id);
    res.json({success:true,token });

  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error" }) 
    
    
  }
}

const createToken = (id) => {
    return  jwt.sign({id},process.env.JWT_SECRET)
  }

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ Success: false, message: "User Already Exists" });
    }
    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ Success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ Success: false, message: "Please enter a strong password" });
    }
    // Hashing User password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Creating new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword,
    });

    // Saving user to database
    const user = await newUser.save();
    const token = createToken(user._id);

    // Sending response with the alert message and indicating the redirection
    res.json({
      Success: true,
      token,
      message: "Your Food Is Waiting For You 🤤",

    });
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: "Error" });
  }
};

export { loginUser, registerUser };