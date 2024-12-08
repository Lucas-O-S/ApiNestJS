import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/Prisma/prisma.module";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";


@Module({
    imports: [
        JwtModule.register({
            secret: `rUPqeMp@!4J$}1yVRMaKxq.GJ*r^K<6J`
        }),
        forwardRef(()=> UserModule),
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports:[AuthService]
})
export class AuthModule{
    
}