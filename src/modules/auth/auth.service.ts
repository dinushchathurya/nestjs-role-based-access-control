import { ConflictException, Get, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from '../user/models/entities/user.entity';
import { UserLoginDto } from './models/entities/user-login.dto';
import { UserErrors } from 'src/shared/errors/user/user.errors';
import { CreateUserDto } from '../user/models/dto/request/create-user.dto';
import { AuthResponse } from './models/entities/auth-response.dto';

@Injectable()
export class AuthService {

    constructor(private userService:UserService, private jwtService:JwtService) { }

    /* create new user */
    async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
        const user = await this.userService.createUser(createUserDto);
        return {
            user,
            token: this.jwtService.sign({  id: user.id, role: user.role }) 
        }
    }

    /* login existing user */
    async login(authLoginDto: UserLoginDto) {
        const user = await this.validateUser(authLoginDto);
        const payload = {
            role: user.role,
            id: user.id
           
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    /* validate user */
    async validateUser(userLoginDto: UserLoginDto): Promise<User> {
        const { email, password } = userLoginDto;
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new ConflictException(UserErrors.NotFound);
        } else if (!(await user.validatePassword(password))) {
            throw new UnauthorizedException(UserErrors.Unauthorized);
        } else {
            return user;
        }
    }

}


