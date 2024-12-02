import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller("users")
export class UserController{

    @Post()
    async create(@Body() body){
        return {body};
    }

    @Get()
    async read(){
        return {users:[]}
    }

    @Get(':id')
    async readOne(@Param() param){
        return {users:[], param}
    }

    @Put(":id")
    async update(@Body() body, @Param() param){
        return {
            method: "put",
            body,
            param
        }
    }

    @Patch(":id")
    async updatePartical(@Body() body, @Param() param){
        return {
            method: "put",
            body,
            param
        }    
    }
    @Delete(":id")
    async delete(@Param() param){
        return{
            param
        } 
    } 
    
}