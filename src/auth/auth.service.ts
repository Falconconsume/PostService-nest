import * as bcrypt from 'bcrypt'
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from 'src/auth/dto/UserDto.dto'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async loginUser(user: UserDto) {
        const userData = await this.prisma.user.findFirst({
            where: { username: user.username },
        })

        if (!userData?.id) {
            throw new NotFoundException('User not found')
        }

        const isPasswordValid = await bcrypt.compare(
            user.password,
            userData.password
        )

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid password')
        }

        const payload = { id: userData.id, password: userData.password }

        const token = await this.jwtService.signAsync(payload)

        return {
            accessToken: token,
        }
    }

    async registerUser(user: UserDto) {
        const userData = await this.prisma.user.findFirst({
            where: { username: user.username },
        })

        if (userData) {
            throw new BadRequestException(
                'This User with this name already exists'
            )
        }

        const salt = await bcrypt.genSalt()

        const password = await bcrypt.hash(user.password, salt)

        const userDataCreated = await this.prisma.user.create({
            data: { username: user.username, password, role: 'ADMIN' },
        })

        return userDataCreated
    }

    async getUsers() {
        const users = await this.prisma.user.findMany()
        return users
    }

    async getProfile(userData: User) {
        const user = await this.prisma.user.findUnique({
            where: { id: userData.id },
        })

        return user
    }
}
