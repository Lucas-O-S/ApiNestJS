import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/Prisma/prisma.service";
import { AuthRegisterDto } from "./dto/auth_register.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable({})
export class AuthService{

    private audience: string = "users";
    private issuer: string = "login";

    constructor(
        private readonly jwtService: JwtService, 
        private readonly prismaService : PrismaService,
        private readonly userService: UserService,
        private readonly mailer: MailerService
    ) {}



    CreateToken(user: User){
        return {accessToken: this.jwtService.sign({
            id: user.id,
            name: user.name,
            email: user.email

        },
        {
            expiresIn: "7 days" ,
            subject: String(user.id),
            issuer: this.issuer,
            audience: this.audience,
            

        })};
    }

    CheckToken(token: string){
        try{
            const data = this.jwtService.verify(token,{
                audience: this.audience,
                issuer: this.issuer
            });

            return data
        }
        catch(ex){
            throw new BadRequestException(ex);
        }

    }
    async IsValidToken(token: string){
        try{
            this.CheckToken(token);
            return true;
        }
        catch(ex){
            return false;
        }
    }


    async Login(email : string,password: string){
        const user = await this.prismaService.user.findFirst({
            where:{
                email,
            }
        })
        const passwordTest = await bcrypt.compare(password, user.password);

        if(!user && !passwordTest){
            throw new UnauthorizedException("Email ou senha incorreto");
        }


        return this.CreateToken(user)
    }


    async Reset(password: string, token : string){


        try{
            
            const data : any= this.jwtService.verify(token,{
                audience: "users",
                issuer: "forget",
            });

            if(isNaN(Number(data.id))){
                throw new BadRequestException("Token invalido")
            }

            const user = await this.prismaService.user.update({
                where: {
                    id: Number(data.id)
                },
                data: {
                    password: await bcrypt.hash(password, await bcrypt.genSalt())

                }
            });

            return this.CreateToken(user)
        }
        catch(ex){
            throw new BadRequestException(ex);
        }


    }

    async Forget(email: string){
        const user = await this.prismaService.user.findFirst({
            where:{
                email,
            }
        })
        if(!user){
            throw new UnauthorizedException("Email incorreto");
        }
        const token = this.jwtService.sign(
            {
                id: user.id
            },
            {
                expiresIn: "30 minutes",
                subject: String(user.id),
                issuer: "forget",
                audience: "users",
            }
        );

        await this.mailer.sendMail({
            subject: "Recuperação de senha",
            to: "bobbie.oberbrunner@ethereal.email",
            template: "forget",
            context: {
                name :  user.name,
                token 
            }
        });

        return user;
    }

    async Register(data: AuthRegisterDto){
        const user = await this.userService.Create(data)

        return this.CreateToken(user)
    }
}