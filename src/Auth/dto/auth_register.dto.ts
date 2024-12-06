import { IsString } from "class-validator";
import { AuthLoginDto } from "./auth_login.dto";


export class AuthRegisterDto extends AuthLoginDto{
    @IsString()
    name: string
}