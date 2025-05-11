import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostMaritalModule } from './modules/talk/post-marital/post-marital.module';

@Module({
  imports: [PostMaritalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
