import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { AuthModule } from './auth/auth.module'
import { PostModule } from './post/post.module'
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [AuthModule, PostModule, CommentModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
