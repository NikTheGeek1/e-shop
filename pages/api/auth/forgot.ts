import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db/db";
import { sendEmail } from "../../../utils/sendEmail";
import { createResetPasswordToken } from "../../../utils/tokens";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    await db.connect();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const userId = createResetPasswordToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${userId}`;
    sendEmail(email, url, "Reset your password", "reset");
    await db.disconnect();
    res
      .status(201)
      .json({ message: "Reset email sent successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default handler;
