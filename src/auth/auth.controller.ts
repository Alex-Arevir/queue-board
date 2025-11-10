import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService){}

    @Post('register')
    async register(@Body() dto:{email:string; password: string; name: string; role?: string}){
        return this.auth.register(dto.email, dto.password, dto.name, dto.role);
    }
    @Post('login')
    async login(@Body() dto: {email: string; password: string;}){
        return this.auth.login(dto.email, dto.password);
    }

}
