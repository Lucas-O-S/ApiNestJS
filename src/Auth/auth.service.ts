import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDto } from "./dto/auth_register.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";
import { count } from "console";

@Injectable({})
export class AuthService{

    private audience: string = "users";
    private issuer: string = "login";

    constructor(
        private readonly jwtService: JwtService, 
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private readonly userService: UserService,
        private readonly mailer: MailerService
    ) {}



    CreateToken(user: UserEntity){
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
            await this.CheckToken(token);
            return true;
        }
        catch(ex){
            return false;
        }
    }


    async Login(email : string,password: string){
        const user = await this.userRepository.findOne({
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
            
            const data : UserEntity = await this.jwtService.verify(token,{
                audience: "users",
                issuer: "forget",
            });
             if(isNaN(Number(data.id))){

                throw new BadRequestException("Token invalido")
            }
            await this.userRepository.update(
                data.id,
                {

                    password: await bcrypt.hash(password, await bcrypt.genSalt())
                });
            return this.CreateToken(await this.userService.Show(data.id))

        }
        catch(ex){
            throw new BadRequestException(ex);
        }


    }

    async Forget(email: string){
        const user = await this.userRepository.findOne({
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
        console.log(data)
        return this.CreateToken(user)
    }
}