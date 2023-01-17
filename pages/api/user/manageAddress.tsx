import nc from "next-connect";
import User, { AddressType } from "../../../models/User";
import db from "../../../utils/db/db";
import auth, { NextApiRequestWithUser } from "../../../middleware/auth";
import { NextApiResponse } from "next";
import mongoose from "mongoose";
const handler = nc().use(auth);

handler.put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    db.connect();
    const { id } = req.body;
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });
    const user_addresses = user.address;
    const addresses = [];
    for (let i = 0; i < user_addresses.length; i++) {
      let temp_address = {};
      if (user_addresses[i]._id == id) {
        temp_address = { ...(user_addresses[i] as mongoose.Document & AddressType).toObject(), active: true };
        addresses.push(temp_address);
      } else {
        temp_address = { ...(user_addresses[i] as mongoose.Document & AddressType).toObject(), active: false };
        addresses.push(temp_address);
      }
    }
    await user.updateOne(
      {
        address: addresses,
      },
      { new: true }
    );
    db.disconnect();
    return res.json({ addresses });
  } catch (error) {
    return res.status(500).json({ message: (error as any).message });
  }
});

handler.delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    db.connect();
    const { id } = req.body;
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.updateOne(
      {
        $pull: { address: { _id: id } },
      },
      { new: true }
    );
    db.disconnect();
    res.json({ addresses: user.address.filter((a) => a._id != id) });
  } catch (error) {
    return res.status(500).json({ message: (error as any).message });
  }
});

export default handler;
