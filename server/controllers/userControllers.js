import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password ,} = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please enter all fields",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        msg: "User already exists",
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hasedPassword,
    });
    return res.status(201).json({
      success: true,
      msg: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please enter all fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "enter valid email",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
       return res.status(400).json({
         success: false,
         msg: "invailid password",
       });
    }
    generateToken(res,user,`welcome back ${user.name}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "login failed" });
  }
};
