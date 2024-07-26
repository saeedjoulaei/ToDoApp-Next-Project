import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(credentials);

        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error in connecting to DB");
        }
        if (!email || !password) {
          throw new Error("invalid data");
        }
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("user doesn't exist");
        }
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("username or password is incorrect");
        }

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
