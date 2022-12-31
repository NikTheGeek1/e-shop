import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../utils/db/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    await db.connect();
    const user = await User.findById(req.body.userId);
    const password = req.body.password;
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({ password: cryptedPassword });
    res.status(201).json({ message: "Password updated successfully", email: user.email });
    await db.disconnect();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default handler;
