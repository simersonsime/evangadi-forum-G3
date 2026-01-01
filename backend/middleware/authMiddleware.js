import jwt from "jsonwebtoken";
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication invalid",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.user = {
      userid: decoded.userid,
      username: decoded.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authorization invalid",
    });
  }
};

export default authMiddleware;
