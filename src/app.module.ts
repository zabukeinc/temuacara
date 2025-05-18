import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostMaritalModule } from './modules/talk/post-marital/post-marital.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChecklistModule } from './modules/checklist/checklist.module';
import { InvitationModule } from './modules/invitation/invitation.module';
import { GiftModule } from './modules/gift/gift.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostMaritalModule,
    ChecklistModule,
    InvitationModule,
    GiftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
