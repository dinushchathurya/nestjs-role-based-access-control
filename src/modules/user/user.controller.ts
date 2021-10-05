import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { User } from './models/entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UserRoleValidationPipe } from 'src/validations/user/user-role-validation.pipe';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService) { }

    @Post()
    @UsePipes(new UserRoleValidationPipe())
    createUser(@Body() createUserDto:CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto)
    } 
}
