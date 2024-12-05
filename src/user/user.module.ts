import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controllers";
import { UserService } from "./user.service";
import { PrismaModule } from "src/Prisma/prisma.module";
import { UserIdCheckMiddleware } from "src/Middlewares/user-id-check.middleware";

@Module({
    imports:[PrismaModule],
    controllers:[UserController],
    providers: [UserService],
    exports: []
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }
}