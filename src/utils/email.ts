import { sendEmail, generateVerificationEmailHTML } from "@/lib/mail";
import { env } from "@/config/env";

export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const verificationLink =
    `${env.APP_URL}/api/auth/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Verify Your Email",
    html: generateVerificationEmailHTML(verificationLink),
  });
};
