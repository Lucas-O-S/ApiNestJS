import { Body, Controller, Delete, Get, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "./DTO/create-user.dto";
import { UpdatePutUserDto } from "./DTO/update-put-user.dto";
import { UserService } from "./user.service";
import { UpdatePatchUserDto } from "./DTO/update-patch-user.dto";
import { LogInterceptor } from "src/Interceptors/log.interceptors";
import { ParamId } from "src/decorators/param-id.decorator";


@UseInterceptors(LogInterceptor)
@Controller("users")
export class UserController{

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() {name, email, password}: CreateUserDto){
        return this.userService.Create( {name, email, password});
    }

    @Get()
    async read(){
        return this.userService.List();
    }

    @Get(':id')
    async readOne( @ParamId() id: number){
        return this.userService.Show(id);
    }

    @Put(":id")
    async update(@Body() {name, email, password} : UpdatePutUserDto,@ParamId() id: number){
        return this.userService.Update({name,email,password}, id);
    }

    @Patch(":id")
    async updatePartical(@Body() {name, email, password} : UpdatePatchUserDto, @ParamId() id: number){
        return this.userService.Update({name,email,password}, id);

    }
    @Delete(":id")
    async delete(@ParamId() id: number){
        return this.userService.Delete(id);
    } 
    
}