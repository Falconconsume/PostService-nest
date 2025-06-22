import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CommentService } from './comment.service'
import { Comment } from '@prisma/client'

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    getAllComments() {
        return this.commentService.getAllComments()
    }

    @Post(':postId')
    createPost(@Param('postId') postId: string, @Body() comment: Comment) {
        return this.commentService.createComment(comment, postId)
    }
}
