import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./DTO/create-user.dto";
import { UpdatePutUserDto } from "./DTO/update-put-user.dto";

@Controller("users")
export class UserController{

    @Post()
    async create(@Body() {name, email, password}: CreateUserDto){
        return {name, email, password};
    }

    @Get()
    async read(){
        return {users:[]}
    }

    @Get(':id')
    async readOne( @Param("id", ParseIntPipe) id: number){
        return {users:[], id}
    }

    @Put(":id")
    async update(@Body() {name, email, password} : UpdatePutUserDto, @Param("id", ParseIntPipe) id: number){
        return {
            method: "put",
            name, email, password,
            id
        }
    }

    @Patch(":id")
    async updatePartical(@Body() body, @Param("id", ParseIntPipe) id: number){
        return {
            method: "put",
            body,
            id
        }    
    }
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id : number){
        return{
            id
        } 
    } 
    
}