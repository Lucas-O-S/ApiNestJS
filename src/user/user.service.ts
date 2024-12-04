import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { CreateUserDto } from "./DTO/create-user.dto";
import { UpdatePutUserDto } from "./DTO/update-put-user.dto";
import { NotFoundError } from "rxjs";


@Injectable()
export class UserService{
    
    constructor(private readonly prisma: PrismaService){

    }
    
    async Create({name,email,password}: CreateUserDto){
        return this.prisma.user.create({
            data: {name,email,password}
            
        });
    }

    async List(){
        return this.prisma.user.findMany();
    }

    async Show(id : number){
        return this.prisma.user.findUnique({
            where : {
                id
            }
        });
    }

    async Update(data : UpdatePutUserDto, id:number){
        await this.exist(id);

        return this.prisma.user.update({
            data: data,
            where: {
                id
            }
        });
    }
    async UpdatePartial(data : UpdatePutUserDto, id:number){
        await this.exist(id);

        return this.prisma.user.update({
            data: data,
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
        if(!(await this.Show(id))){
            throw new NotFoundException(`O usuario de id ${id} não foi encontrado`);
        }
    }
}
