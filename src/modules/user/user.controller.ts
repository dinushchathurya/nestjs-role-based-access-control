import { ClassSerializerInterceptor, Controller, Get, NotAcceptableException, Param, UseInterceptors } from '@nestjs/common';
import { serialize, deserialize } from 'class-transformer';

import { UserService } from './user.service';
import { User } from './models/entities/user.entity';
import { UserResponse } from '././models/dto/response/user.response';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController { 

    constructor(private readonly userService:UserService) { }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    
    @Get('/:id')
    getUserById(@Param('id') id:number): Promise<UserResponse> {
        return this.userService.getUserByID(id);
    }
    
}
