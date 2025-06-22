import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class UserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5, { message: 'Your name should be bigger than 5 characters' })
    @MaxLength(40, {
        message: "Your name should be less than 45 characters' })",
    })
    username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Пароль має містити мінімум 8 символів' })
    @MaxLength(20, { message: 'Пароль не може перевищувати 20 символів' })
    password: string
}
