import { UserService } from "../../user/user.service";
import { acessTokenMock } from "../MockClassesTeste/token.mock";
import { userEntityList } from "../MockClassesTeste/user_entity_list.mock";

export const UserServiceMock ={
         
    provide: UserService,
    
    useValue:{


        Create: jest.fn().mockReturnValue(userEntityList[0]),
   
        List: jest.fn().mockReturnValue(userEntityList),
  
        Show: jest.fn().mockReturnValue(userEntityList[0]),
  
  
        Update: jest.fn().mockReturnValue(userEntityList[0]),
  
  
        UpdatePartial: jest.fn().mockReturnValue(userEntityList[0]),
  
  
        Delete: jest.fn().mockReturnValue(true),
  
  
        Exist: jest.fn(),
  
  
        RepeatedEmail: jest.fn(),
        
        CreateToken: jest.fn().mockReturnValue(acessTokenMock),

  
    }
}