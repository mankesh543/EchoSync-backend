import jwt from "jsonwebtoken";//we want to use jwt to verify the token
import User from "../models/user.model.js";//importing the user model to find the user in the database and related to authentication


//this middleware will be used to protect routes that require authentication
export const protectRoute = async (req, res, next) => {//next is a function that we call to pass control to the next middleware in the stack
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();//after verifying the token or authentication the user, we call next function and update the profile in auth.route.js
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
