import { Body, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './models/entities/user.entity';
import { CreateUserDto } from './models/dto/request/create-user.dto';
import { UserErrors } from '../../shared/errors/user/user.errors';
import { CommonErrors } from 'src/shared/errors/common/common.errors';
import { UserResponse } from '././models/dto/response/user.response';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>) {}
    
    /* create new user */
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

    /* get all users */
    async getAllUsers() {
        
        try {
            return await this.userRepository.find();
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }
    /* find user by email */
    async findUserByEmail(email: string) {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    }

    /* find user by id */
    async getUserByID(id:number) {
        const user = await this.userRepository.findOne({where: {id: id}});
        if(!user){
            throw new NotFoundException(UserErrors.UserNotFound);
        } 

        try {
            return await user;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }
    
}
