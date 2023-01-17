import nc from "next-connect";
import User from "../../../models/User";
import Order from "../../../models/Order";
import db from "../../../utils/db/db";
import auth, { NextApiRequestWithUser } from "../../../middleware/auth";
import { NextApiResponse } from "next";
const handler = nc().use(auth);

handler.post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    db.connect();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });
    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();
    db.disconnect();
    return res.json({
      order_id: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (error as any).message });
  }
});

export default handler;
