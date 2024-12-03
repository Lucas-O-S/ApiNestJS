import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto{
    
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minSymbols:0,
        minUppercase:0,
        minNumbers:0,
        minLowercase:0
    })
    password: string;
}