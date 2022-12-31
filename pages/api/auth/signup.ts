import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../utils/db/db";
import { validateEmail } from "../../../utils/validation/signup";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { createActivationToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmail";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    await db.connect();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: cryptedPassword,
    });
    const addedUser = await newUser.save();
    const activationToken = createActivationToken({
        id: addedUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/activate/${activationToken}`;
    sendEmail(email, url, "verify your email address", "activate");
    await db.disconnect();
    res
      .status(201)
      .json({ message: "User created successfully", user: addedUser });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default handler;
