import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import AuthUser from 'src/modules/auth/decodators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';

import { UserRoleValidationPipe } from 'src/validations/user/user-role-validation.pipe';
import { CreateUserDto } from '../user/models/dto/create-user.dto';
import { User } from '../user/models/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthResponse } from './models/entities/auth-response.dto';
import { UserLoginDto } from './models/entities/user-login.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

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
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get('/profile')
    getLoggedUser(@AuthUser() user: User): User {
        return user;
    }
    
}


