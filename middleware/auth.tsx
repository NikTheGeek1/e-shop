import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export interface NextApiRequestWithUser extends NextApiRequest {
  user?: string;
}

export default async (req: NextApiRequestWithUser, res: NextApiResponse, next: () => void) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  if (token) {
    //signed in
    req.user = token.sub;
    next();
  } else {
    res.status(401).json({ message: "Not signed in :" });
  }
  /*
  res.end();
  */
};
