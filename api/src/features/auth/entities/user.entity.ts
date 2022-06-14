import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserDto} from "../dto/user.dto";

@Entity({ schema: 'auth' })
export class User implements UserDto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    profilePhoto: string;
}
