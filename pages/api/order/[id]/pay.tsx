import { NextApiResponse } from "next";
import nc from "next-connect";
import auth, { NextApiRequestWithUser } from "../../../../middleware/auth";
import Order from "../../../../models/Order";
import db from "../../../../utils/db/db";

const handler = nc().use(auth);

handler.put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email: req.body.email_address,
    };
    const newOrder = await order.save();
    await db.disconnect();
    res.json({ message: "Order is paid.", order: newOrder });
  } else {
    await db.disconnect();
    res.status(404).json({ message: "Order is not found." });
  }
});

export default handler;
