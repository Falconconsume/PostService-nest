import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDto } from 'src/auth/dto/UserDto.dto'
import { AuthGuard } from 'src/auth/guard/auth.guard'

export interface UserAuth extends Request {
    user: {
        id: string
        password: string
    }
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() user: UserDto) {
        return this.authService.registerUser(user)
    }

    @Post('login')
    async login(@Body() userDto: UserDto) {
        return this.authService.loginUser(userDto)
    }

    @UseGuards(AuthGuard)
    @Get('users')
    async getUsers() {
        return this.authService.getUsers()
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() request) {
        return this.authService.getProfile(request.user)
    }
}
