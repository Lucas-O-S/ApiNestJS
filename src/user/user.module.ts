import { Module } from "@nestjs/common";
import { UserController } from "./user.controllers";

@Module({
    imports:[],
    controllers:[UserController],
    providers: [],
    exports: []
})
export class UserModule {}