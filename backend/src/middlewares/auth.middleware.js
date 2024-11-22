import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ message: "Unauthorized" });
      } else {
        try {
          const user = await User.findById(decodedToken.id);
          if (!user) {
            return res.status(401).json({ message: "User not found" });
          }
          req.user = user;
          next();
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Something went wrong" });
        }
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
export default protectRoute;
