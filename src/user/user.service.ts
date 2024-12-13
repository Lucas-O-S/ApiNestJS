import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./DTO/create_user.dto";
import { UpdatePutUserDto } from "./DTO/update_put-user.dto";
import { UpdatePatchUserDto } from "./DTO/update_patch-user.dto";
import * as bcrypt from 'bcrypt'
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    
    constructor(        
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){}
    
    async Create(body: CreateUserDto){

        await this.RepeatedEmail(body.email);

        body.password = await bcrypt.hash(body.password, await bcrypt.genSalt());

        const user = this.userRepository.create(body);

        
        await this.userRepository.save(user);
        
        return user;
    }

    async List(){
        return this.userRepository.find();
    }

    async Show(id : number){
        await this.Exist(id);

        return this.userRepository.findOne({
            where : {
                id
            }
        });
    }

    async Update({email, name, password, role} : UpdatePutUserDto, id:number){
        await this.Exist(id);
        
        password = await bcrypt.hash(password, await bcrypt.genSalt());

        await this.userRepository.update(id,{
            email, name, password, role
        });

        return await this.userRepository.findOneBy({id})
    }
    async UpdatePartial({email, name, password, role} : UpdatePatchUserDto, id:number){
        await this.Exist(id);
        if(password){
            password = await bcrypt.hash(password, await bcrypt.genSalt());

        }

        await this.userRepository.update(id,{
            email, name, password, role
        });
        return await this.userRepository.findOneBy({id})

    }

    async Delete(id: number ){
        await this.Exist(id);
        return this.userRepository.delete(id)
 
    }

    private async Exist(id: number){
        if(!( await this.userRepository.exists({
            where: {
                id
            }
        }))){
            throw new NotFoundException(`O usuario de id ${id} não foi encontrado`);
        }
    }

    private async RepeatedEmail(email: string){

        if(await this.userRepository.exists({where: {email}})){
            throw new BadRequestException("Email já existe tente outro")
        }
    }
}
