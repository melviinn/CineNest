import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 60 * 5,
  //     strategy: "compact",
  //   },
  // },
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url }) => {
  //     await resend.emails.send({
  //       // from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
  //       from: 'onboarding@resend.dev',
  //       to: user.email,
  //       subject: "Verify your email",
  //       react: VerifyEmail({ username: user.name, verifyUrl: url }),
  //     })
  //   },
  //   sendOnSignUp: true,
  // },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
        unique: false,
      },
      lastName: {
        type: "string",
        required: false,
        unique: false,
      },
    },
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
