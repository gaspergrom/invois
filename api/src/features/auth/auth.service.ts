import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {AuthLoginDto} from "./dto/login.dto";
import {AuthRegisterDto} from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {}

    async login(loginData: AuthLoginDto): Promise<User> {
        return this.repo.save(loginData);
    }

    async register(registerData: AuthRegisterDto): Promise<User> {
        return this.repo.save(registerData);
    }
}
