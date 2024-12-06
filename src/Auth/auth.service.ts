import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/Prisma/prisma.service";


@Injectable({})
export class Authservice{
    constructor(private readonly jwtService: JwtService, private readonly prismaService : PrismaService) {}

    async CreateToken(){
        //return this.jwtService.sign()
    }

    async CheckToken(){
        //return this.jwtService.verify()
    }

    async Login(email : string,password: string){
        const user = this.prismaService.user.findFirst({
            where:{
                email,
                password
            }
        })

        if(!user){
            throw new UnauthorizedException("Email ou senha incorreto");
        }

        return user
    }

    async Reset(password: string, token : string){
        const id =0

        await this.prismaService.user.update({
            where: {
                id
            },
            data: {
                password
            }
        });
        return true
    }

    async Forget(email: string){
        const user = this.prismaService.user.findFirst({
            where:{
                email,
            }
        })

        if(!user){
            throw new UnauthorizedException("Email incorreto");
        }

        return user
    }
}