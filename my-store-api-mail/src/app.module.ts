import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailService } from './services/mail.service';
import { MailController } from './controllers/mail.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      //<- imported the config module
      isGlobal: true,
    }),
  ],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
