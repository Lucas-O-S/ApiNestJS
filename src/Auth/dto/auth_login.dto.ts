import { IsEmail, IsStrongPassword, MinLength } from "class-validator"


export class AuthLoginDto{
    
    @IsEmail()
    email:string

    @IsStrongPassword({
        minLength: 6,
        minSymbols:0,
        minUppercase:0,
        minNumbers:0,
        minLowercase:0
    })
    @MinLength(6)
    password:string
}