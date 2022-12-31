import nodemailer from "nodemailer";
import { google } from "googleapis";
import { activateEmailTemplate } from "../emails/activateEmailTemplate";
import { resetEmailTemplate } from "../emails/resetEmailTemplate";

const OAuth2 = google.auth.OAuth2;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
}: {
    [key: string]: string | undefined;
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
);

// send email
export const sendEmail = async (
  to: string,
  url: string,
  subject: string,
  type: "activate" | "reset"
) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    // @ts-ignore
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS as string,
      clientId: MAILING_SERVICE_CLIENT_ID as string,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET as string,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN as string,
      accessToken,
    },
  });
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to,
    subject,
    html: type === "activate" ? activateEmailTemplate(to, url): resetEmailTemplate(to, url),
  };
  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) {
      return err;
    }
    return info;
  });
};
