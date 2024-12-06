import { IsJWT, IsStrongPassword, MinLength } from "class-validator"


export class AuthResetDto{
    
    @IsStrongPassword()
    @MinLength(6)
    password:string

    @IsJWT()
    token: string
}