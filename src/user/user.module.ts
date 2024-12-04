import { Module } from "@nestjs/common";
import { UserController } from "./user.controllers";
import { UserService } from "./user.service";
import { PrismaModule } from "src/Prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    controllers:[UserController],
    providers: [UserService],
    exports: []
})
export class UserModule {}