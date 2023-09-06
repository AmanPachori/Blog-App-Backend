const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const VerifyToken = asyncHandler(
  async (
    req: { headers: { authorization: string }; user: any },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: string): void; new (): any };
      };
    },
    next: () => void
  ) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.secretKey);

        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (err) {
        console.log(err);
        res.status(400);
        throw new Error("Not authorised");
      }
      if (!token) {
        res.status(403).json("Not authorised no Token!");
      }
    }
  }
);
module.exports = { VerifyToken };
