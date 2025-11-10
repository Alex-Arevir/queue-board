import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { transcode } from 'buffer';


@Injectable()
export class AuthService {
    constructor(
        private prisma : PrismaService,
        private jwtService: JwtService,
    ){}

    async register(email:string, password: string, name: string, role: string = 'USER') {



        const hashedPassword = await bcrypt.hash(password,10);
        const user = await this.prisma.user.create({
            data:{email, password: hashedPassword,name},
        });
        return{ message: 'User Register Succesfully', user};
        }
        
        async login ( email: string, password: string){
            const user = await this.prisma.user.findUnique({
                where:{email} });
                if(!user || !(await bcrypt.compare(password, user.password))){
                    throw new UnauthorizedException('Invalid Credencials');
                }
                const payload = {sub: user.id, role: user.role};
                const token = this.jwtService.sign(payload);
                return { access_token: token, user};
        }

        async verifyToken(token:string){
            try{
                return this.jwtService.verify(token);
                
            }catch{
                throw new UnauthorizedException('Invalid or expired Token');
            }
        }
    }

