import { UserService } from "../../user/user.service";
import { ForgetTokenMock } from "../MockTeste/forget_token.mock";
import { acessTokenMock } from "../MockTeste/token.mock";
import { userEntityList } from "../MockTeste/user_entity_list.mock";

export const UserServiceMock ={
         
    provide: UserService,
    
    useValue:{


        Create: jest.fn().mockReturnValue(userEntityList[0]),
   
        List: jest.fn(),
  
        Show: jest.fn().mockReturnValue(userEntityList[0]),
  
  
        Update: jest.fn(),
  
  
        UpdatePartial: jest.fn(),
  
  
        Delete: jest.fn(),
  
  
        Exist: jest.fn(),
  
  
        RepeatedEmail: jest.fn(),
        
        CreateToken: jest.fn().mockReturnValue(acessTokenMock),

  
    }
}