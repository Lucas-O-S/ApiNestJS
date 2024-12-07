import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth_login.dto";
import { AuthRegisterDto } from "./dto/auth_register.dto";
import { AuthForgetDto } from "./dto/auth_forget.dto";
import { UserService } from "src/user/user.service";
import { AuthService as AuthService } from "./auth.service";
import { AuthResetDto } from "./dto/auth_reset.dto";



@Controller('auth')
export class AuthController{

    constructor(private readonly userService: UserService, private readonly authService:AuthService){}

    @Post("login")
    async Login(@Body() body : AuthLoginDto){
        return this.authService.Login(body.email,body.password)
    }

    
    @Post("register")
    async Register(@Body() body : AuthRegisterDto){
        return this.authService.Register(body);
    }
    @Post("forget")
    async Forget(@Body() body : AuthForgetDto){
        return this.authService.Forget(body.email);
    }

    @Post("reset")
    async Reset(@Body() body : AuthResetDto){
        return this.authService.Reset(body.password, body.token);

    }

}