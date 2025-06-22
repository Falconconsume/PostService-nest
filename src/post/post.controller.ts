import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto, UpdatePostDto } from 'src/post/dto/createPost.dto'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { User } from '@prisma/client'

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts()
    }

    @Post()
    @UseGuards(AuthGuard)
    createPost(
        @Body() createPostDto: CreatePostDto,
        @Req() req: { user: User }
    ) {
        return this.postService.createPost(createPostDto, req.user)
    }

    @Get(':id')
    getPost(@Param() params: { id: string }) {
        return this.postService.getPostById(params.id)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postService.updatePost(id, updatePostDto)
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        await this.postService.deletePost(id)
        return 'Success!'
    }
}
