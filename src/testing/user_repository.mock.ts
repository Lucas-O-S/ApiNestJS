import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "./../user/entity/user.entity";
import { userEntityList } from "./user_entity_list.mock";



export const userRepositoryMock ={
         
    provide: getRepositoryToken(UserEntity),
    
    useValue:{
   
        create: jest.fn().mockResolvedValue(userEntityList[0]),
   
        save: jest.fn().mockResolvedValue(userEntityList[0]),
  
        find: jest.fn().mockResolvedValue(userEntityList),
  
  
        findOne: jest.fn().mockResolvedValue(userEntityList[0]),
  
  
        update: jest.fn().mockResolvedValue(userEntityList[0]),
  
  
        findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
  
  
        delete: jest.fn().mockResolvedValue(userEntityList[0]),
  
  
        exists: jest.fn().mockResolvedValue(true),
  
  
    }
}