import { User } from '../../../user/models/entities/user.entity';

export class AuthResponse {
    token: string;
    user: User
}