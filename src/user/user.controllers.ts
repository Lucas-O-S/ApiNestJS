import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./DTO/create-user.dto";
import { UpdatePutUserDto } from "./DTO/update-put-user.dto";
import { UserService } from "./user.service";
import { UpdatePatchUserDto } from "./DTO/update-patch-user.dto";

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
    async readOne( @Param("id", ParseIntPipe) id: number){
        return this.userService.Show(id);
    }

    @Put(":id")
    async update(@Body() {name, email, password} : UpdatePutUserDto, @Param("id", ParseIntPipe) id: number){
        return this.userService.Update({name,email,password}, id);
    }

    @Patch(":id")
    async updatePartical(@Body() {name, email, password} : UpdatePatchUserDto, @Param("id", ParseIntPipe) id: number){
        return this.userService.Update({name,email,password}, id);

    }
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id : number){
        return this.userService.Delete(id);
    } 
    
}