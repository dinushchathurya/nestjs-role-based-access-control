import { User } from '../../../user/models/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
    @ApiProperty()
    token: string;
    
    @ApiProperty()
    user: User
}