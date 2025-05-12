import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostMaritalModule } from './modules/talk/post-marital/post-marital.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, UserModule, PostMaritalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
