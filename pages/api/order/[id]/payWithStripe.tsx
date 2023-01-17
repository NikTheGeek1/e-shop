import { NextApiResponse } from "next";
import nc from "next-connect";
import auth, { NextApiRequestWithUser } from "../../../../middleware/auth";
import Order from "../../../../models/Order";
import db from "../../../../utils/db/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = nc().use(auth);

handler.post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    await db.connect();
    const { amount, id } = req.body;
    const order_id = req.query.id;
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "USD",
      description: "M74JJI Store",
      payment_method: id,
      confirm: true,
    });
    const order = await Order.findById(order_id);
    if (order) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: payment.id,
        status: payment.status,
        email: payment.email_address,
      };
      await order.save();
      res.json({
        success: true,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
    db.disconnect();
  } catch (error) {
    console.log(error);
    db.disconnect();
    res.status(500).json({ message: (error as any).message });
  }
});

export default handler;
