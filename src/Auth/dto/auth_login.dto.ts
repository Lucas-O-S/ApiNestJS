import { IsEmail, IsStrongPassword, MinLength } from "class-validator"


export class AuthLoginDto{
    
    @IsEmail()
    email:string

    @IsStrongPassword()
    @MinLength(6)
    password:string
}