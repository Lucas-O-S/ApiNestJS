import { IsJWT, IsStrongPassword, MinLength } from 'class-validator';

export class AuthResetDto {
  @IsStrongPassword({
    minLength: 6,
    minSymbols: 0,
    minUppercase: 0,
    minNumbers: 0,
    minLowercase: 0,
  })
  @MinLength(6)
  password: string;

  @IsJWT()
  token: string;
}
