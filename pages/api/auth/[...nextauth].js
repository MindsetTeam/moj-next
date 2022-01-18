import database from "@/middlewares/database";
import User from "@/models/User";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import nc from "next-connect";

const handler = nc();
handler.use(database);
handler.use(
  NextAuth({
    providers: [
      Providers.Credentials({
        name: "Credentials",
        async authorize(credentials, req) {
          const user = await User.findOne({
            nationalityIDNum: credentials.username,
          });

          if (!user) {
            throw new Error("No user found");
          }
          if (!user.approval || user.suspended) {
            throw new Error("Please ask for approval");
          }
          const isValid = await compare(credentials.password, user.password);

          if (!isValid) {
            throw new Error("Password not match");
          }
          const {
            id,
            firstNameLatin,
            lastNameLatin,
            firstName,
            lastName,
            role,
            department,
            photo,
            latestOfficerStatus,
            moderatorType,
          } = user;
          return {
            id,
            firstNameLatin,
            lastNameLatin,
            firstName,
            lastName,
            role,
            department,
            latestOfficerStatus,
            photo,
            moderatorType,
          };
        },
      }),
    ],
    session: {
      jwt: true,
    },
    callbacks: {
      jwt: async (token, user, account, profile, isNewUser) => {
        user && (token.user = user);
        return token;
      },
      session: async (session, user, sessionToken) => {
        const {
          firstNameLatin,
          lastNameLatin,
          firstName,
          lastName,
          role,
          department,
          latestOfficerStatus,
          photo,
          moderatorType,
        } = await User.findById(user.user.id);
        session.user = {
          ...user.user,
          firstNameLatin,
          lastNameLatin,
          firstName,
          lastName,
          role,
          department,
          latestOfficerStatus,
          photo,
          moderatorType,
        };
        return session;
        // old solutions
        // session.user = user.user;
        // return session;
      },
    },
  })
);

export default handler;
