// src/mail.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from '../services/mail.service';

@Controller('api')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  async sendEmail(
    @Body() body: { subject: string; text: string },
  ): Promise<string> {
    const { subject, text } = body;

    if (!subject || !text) {
      throw new Error('Fields "subject", and "text" are required.');
    }

    await this.mailService.sendEmail(subject, text);
    return 'Email sent successfully!';
  }
}
