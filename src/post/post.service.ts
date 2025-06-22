import { User } from '@prisma/client'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreatePostDto, UpdatePostDto } from 'src/post/dto/createPost.dto'

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

    getAllPosts() {
        return this.prisma.post.findMany({
            include: {
                author: true,
                comments: true,
            },
        })
    }

    createPost(post: CreatePostDto, user: User) {
        return this.prisma.post.create({
            data: {
                title: post.title,
                content: post.content,
                authorId: user.id,
            },
        })
    }

    getPostById(id: string) {
        return this.prisma.post.findUnique({
            where: { id },
            include: { author: true },
        })
    }

    updatePost(id: string, updatePostDto: UpdatePostDto) {
        return this.prisma.post.update({
            where: { id },
            data: updatePostDto,
            include: { author: true },
        })
    }

    async deletePost(id: string) {
        try {
            await this.prisma.post.delete({ where: { id } })
        } catch (_) {
            throw new BadRequestException('This post has been deleted already!')
        }
    }
}
