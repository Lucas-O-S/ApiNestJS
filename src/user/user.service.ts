import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { CreateUserDto } from "./DTO/create_user.dto";
import { UpdatePutUserDto } from "./DTO/update_put-user.dto";


@Injectable()
export class UserService{
    
    constructor(private readonly prisma: PrismaService){

    }
    
    async Create(body: CreateUserDto){
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

    async Update(body : UpdatePutUserDto, id:number){
        await this.exist(id);

        return this.prisma.user.update({
            data: body,
            where: {
                id
            }
        });
    }
    async UpdatePartial(body : UpdatePutUserDto, id:number){
        await this.exist(id);

        return this.prisma.user.update({
            data: body,
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
