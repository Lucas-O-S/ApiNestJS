import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/Prisma/prisma.module";


@Module({
    imports: [
        JwtModule.register({
            secret: `rUPqeMp@!4J$}1yVRMaKxq.GJ*r^K<6J`
        }),
        UserModule,
        PrismaModule
    ],
    controllers: [AuthController]
})
export class AuthModule{
    
}