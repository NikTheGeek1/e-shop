import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User, { IUser, SessionUser } from "../../../models/User";
import bcrypt from "bcryptjs";
import db from "../../../utils/db/db";
import { JWT } from "next-auth/jwt";
db.connect();

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials: any): Promise<IUser | null> {
        const email = credentials.email;
        const password = credentials.password;
        const user: IUser | null = await User.findOne({ email });
        if (user) {
          return await signInUser({ password, user });
        } else {
          throw new Error("This email does not exist.");
        }
      },
    }),
    // OAuth authentication providers...
    // Auth0Provider({
    //   clientId: process.env.AUTH0_CLIENT_ID as string,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
    //   issuer: process.env.AUTH0_ISSUER as string,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      const user = await User.findById(token.sub);
      if (!user) return session;
      if (session.user){
        //  what type is the session.user? Answer: 
        (session.user as SessionUser).id = token.sub || user._id.toString();
        (session.user as SessionUser).role = user.role || "user";
        (token).role = user.role || "user";
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
});

const signInUser = async ({
  password,
  user,
}: {
  password: string;
  user: IUser;
}) => {
  // password check
  if (!user.password) {
    throw new Error("Please enter your password.");
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Email or password is wrong!");
  }
  return user;
};
