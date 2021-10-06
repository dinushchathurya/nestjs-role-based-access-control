import { ClassSerializerInterceptor, Controller, Get, NotAcceptableException, Param, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from './models/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController { 

    constructor(private readonly userService:UserService) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
    
    @Get('/:id')
    async findByEmail(@Param('id') id: number): Promise<User>{
       return await this.userService.findUserById(id);
    }

    
}


