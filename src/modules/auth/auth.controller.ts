import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import AuthUser from 'src/common/decorators/auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';

import { UserRoleValidationPipe } from 'src/validations/user/user-role-validation.pipe';
import { CreateUserDto } from '../user/models/dto/create-user.dto';
import { User } from '../user/models/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthResponse } from './models/entities/auth-response.dto';
import { UserLoginDto } from './models/entities/user-login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    /* create new user */
    @Post('/register')
    @UsePipes(new UserRoleValidationPipe())
    register(@Body() createUserDto:CreateUserDto): Promise<AuthResponse> {
        return this.authService.register(createUserDto);
    }
    
    /* login existing user */
    @Post('/login')
    async login(@Body() authLoginDto: UserLoginDto) {
        return this.authService.login(authLoginDto);
    }

    /* get logged user details */
    @Get('/profile')
    @UseGuards(AuthGuard('jwt'))
    getLoggedUser(@AuthUser() user: User): User {
        return user;
    }
    
}


