import { Exclude } from 'class-transformer';
import { UserRole } from 'src/enums/role.enum';

export class UserResponse  {
    @Exclude({ toPlainOnly: true })
    id: number;

    firstName: string;

    lastName: string;

    email: string;

    @Exclude({ toPlainOnly: true })
    role: UserRole;

    @Exclude({ toPlainOnly: true })
    password: string;

    @Exclude()
    createdAt: Date;
    
    @Exclude()
    updatedAt: Date;

    constructor(partial: Partial<UserResponse>) {
        Object.assign(this, partial);
    }
}