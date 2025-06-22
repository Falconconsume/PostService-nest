import { Comment } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllComments() {
        return this.prisma.comment.findMany()
    }

    async createComment(comment: Comment, postId: string) {
        return this.prisma.comment.create({
            data: { content: comment.content, title: comment.title, postId },
        })
    }
}
