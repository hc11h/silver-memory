import env from '@/config/env';
import nodemailer from 'nodemailer';

type MailOptions = {
  to: string;
  subject: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.email.auth.user,
    pass: env.email.auth.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendEmail({ to, subject, html }: MailOptions): Promise<void> {
  await transporter.sendMail({ from: env.email.from, to, subject, html });
}
