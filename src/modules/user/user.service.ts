import { Body, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './models/entities/user.entity';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UserErrors } from '../../shared/errors/user/user.errors';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>) {}

    async createUser(@Body() createUserDto:CreateUserDto): Promise<User> {

        const user = await this.userRepository.create(createUserDto);
        try {
            await user.save();  
        } catch (err) {
            if(err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(UserErrors.Conflict);
            } else {
                throw new InternalServerErrorException();
            }
        }
        delete user.password;
        return user;   
    }
}
