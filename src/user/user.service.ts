import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { CreateUserDto } from "./DTO/create_user.dto";
import { UpdatePutUserDto } from "./DTO/update_put-user.dto";
import { UpdatePatchUserDto } from "./DTO/update_patch-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService{
    
    constructor(private readonly prisma: PrismaService){

    }
    
    async Create(body: CreateUserDto){


        body.password = await bcrypt.hash(body.password, await bcrypt.genSalt());
        
        return this.prisma.user.create({
            data: body
            
        });
    }

    async List(){
        return this.prisma.user.findMany();
    }

    async Show(id : number){
        await this.exist(id);

        return this.prisma.user.findUnique({
            where : {
                id
            }
        });
    }

    async Update({email, name, password, role} : UpdatePutUserDto, id:number){
        await this.exist(id);
        
        password = await bcrypt.hash(password, await bcrypt.genSalt());

        return this.prisma.user.update({
            data: {email, name, password, role},
            where: {
                id
            }
        });
    }
    async UpdatePartial({email, name, password, role} : UpdatePatchUserDto, id:number){
        await this.exist(id);
        if(!password){
            password = await bcrypt.hash(password, await bcrypt.genSalt());

        }

        return this.prisma.user.update({

            data: {email, name, password, role},
            where: {
                id
            }
        });
    }

    async Delete(id: number ){
        await this.exist(id);
        return this.prisma.user.delete({
            where : {
                id
            }
        });
 
    }

    private async exist(id: number){
        if(!(await this.prisma.user.count({
            where: {id}
        }))){
            throw new NotFoundException(`O usuario de id ${id} não foi encontrado`);
        }
    }
}
