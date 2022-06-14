import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {User} from "./entities/user.entity";
import {AuthLoginDto} from "./dto/login.dto";
import {AuthRegisterDto} from "./dto/register.dto";

@Controller('auth')
export class SubscriptionPlanController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    login(
        @Body() body: AuthLoginDto,
    ): Promise<User> {
        return this.authService.login(body);
    }

    @Post('/register')
    register(
        @Body() body: AuthRegisterDto,
    ): Promise<User> {
        return this.authService.register(body);
    }
}
