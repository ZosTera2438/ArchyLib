import jwt from "jsonwebtoken";
import User from "../models/User.js";
//signUp
export const Register = async (req, res) => {
  const { username, password, fullName } = req.body;

  try {
    const newUser = User({ username, password, fullName });
    await newUser.save();
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    const url = `http://localhost:3000/verify${token}`;

    res.status(201).json({ message: "Created", url });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//login
export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Not Found" });
    }
    
    console.log(password, user.password)

    if (password!=user.password) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    ); 

    console.log("success")
    res.status(200).json({
      message: "success",
      token,
      user: {
        username: user.username,
        role: user.role,
        id: user._id,
        name: user.fullName,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
