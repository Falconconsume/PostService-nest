import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { AuthModule } from './auth/auth.module'
import { AuthController } from 'src/auth/auth.controller'
import { AuthService } from 'src/auth/auth.service'
import { PostModule } from './post/post.module';

@Module({
    imports: [AuthModule, PostModule],
    controllers: [AuthController],
    providers: [PrismaService, AuthService],
})
export class AppModule {}
