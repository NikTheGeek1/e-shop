import nc from "next-connect";
import User, { AddressType } from "../../../models/User";
import db from "../../../utils/db/db";
import auth, { NextApiRequestWithUser } from "../../../middleware/auth";
import { NextApiResponse } from "next";
const handler = nc().use(auth);

handler.post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    db.connect();
    const { address }: {address: AddressType} = req.body;
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.updateOne({
      $push: {
        address: address,
      },
    });
    db.disconnect();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: (error as any).message });
  }
});

export default handler;
