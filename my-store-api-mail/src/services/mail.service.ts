import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'mystoreynov@gmail.com',
      pass: 'bkdjfkdfzuagoadl',
    },
    logger: true,
    debug: true,
  });

  async sendEmail(subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'mystoreynov@gmail.com',
      to: process.env.ADMIN_MAIL,
      subject,
      text,
    };

    const result = await this.transporter.sendMail(mailOptions);
    console.log('Email sent:', result.messageId);
  }
}
