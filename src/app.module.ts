import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './Auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { MailerModule} from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
    throttlers: [{
      ttl : 60000,
      limit: 50
    }]
  }) ,
  forwardRef(()=> UserModule), 
  forwardRef(()=> AuthModule),
  MailerModule.forRoot({
    transport: 'smtps://trevor.casper@ethereal.email:WVVyS6PXgePFBsBTzv@smtp.ethereal.email',
    defaults: {
      from: '"nest-modules" <trevor.casper@ethereal.email>',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  })
],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule]
})
export class AppModule {}
