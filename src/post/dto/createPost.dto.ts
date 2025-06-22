import { MaxLength, MinLength } from 'class-validator'

export class CreatePostDto {
    @MinLength(3, {
        message: 'Title of the post should be more than 3 characters',
    })
    @MaxLength(25, {
        message: 'Title of the post should be less than 25 characters',
    })
    title: string

    @MinLength(10, { message: 'The post should be more than 10 characters' })
    content: string
}

export class UpdatePostDto {
    @MinLength(3, {
        message: 'Title of the post should be more than 3 characters',
    })
    @MaxLength(25, {
        message: 'Title of the post should be less than 25 characters',
    })
    title?: string

    @MinLength(10, { message: 'The post should be more than 10 characters' })
    content?: string
}
