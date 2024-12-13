import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "./DTO/create_user.dto";
import { UpdatePutUserDto } from "./DTO/update_put-user.dto";
import { UserService } from "./user.service";
import { UpdatePatchUserDto } from "./DTO/update_patch-user.dto";
import { LogInterceptor } from "../Interceptors/log.interceptors";
import { ParamId } from "../decorators/param_id.decorator";
import { Role } from "../enums/role.enum";
import { Roles } from "../decorators/role.decorator";
import { RoleGuard } from "../Guards/role.guard";
import { AuthGuard } from "../Guards/auth.guard";
import { ThrottlerGuard } from "@nestjs/throttler";

@UseGuards(AuthGuard,RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller("users")
export class UserController{

    constructor(private readonly userService: UserService){}
    
    @UseGuards(ThrottlerGuard)
    @Roles(Role.Admim)
    @Post()
    async create(@Body() body: CreateUserDto){
        return this.userService.Create( body);
    }

    @UseGuards(ThrottlerGuard)
    @Roles(Role.Admim, Role.User)
    @Get()
    async read(){
        return this.userService.List();
    }
    
    @UseGuards(ThrottlerGuard)
    @Roles(Role.Admim, Role.User)
    @Get(':id')
    async readOne( @ParamId() id: number){
        return this.userService.Show(id);
    }

    @Roles(Role.Admim)
    @Put(":id")
    async update(@Body() body: UpdatePutUserDto,@ParamId() id: number){
        return this.userService.Update(body, id);
    }

    @Roles(Role.Admim)
    @Patch(":id")
    async updatePartical(@Body() body : UpdatePatchUserDto, @ParamId() id: number){
        return this.userService.UpdatePartial(body, id);

    }

    @Roles(Role.Admim)
    @Delete(":id")
    async delete(@ParamId() id: number){
        return this.userService.Delete(id);
    } 
    
}