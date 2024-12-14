import { AuthService } from "../../Auth/auth.service";
import { jwtPayload } from "../MockClassesTeste/jwt_payload.mock";
import { acessTokenMock } from "../MockClassesTeste/token.mock";
import { userEntityList } from "../MockClassesTeste/user_entity_list.mock";



export const AuthServiceMock ={
         
    provide: AuthService,
    
    useValue:{
   

        Login: jest.fn().mockReturnValue({acessTokenMock}),
        Register:jest.fn().mockReturnValue({acessTokenMock}),
        Forget:jest.fn().mockReturnValue(userEntityList[0]),
        Reset:jest.fn().mockReturnValue({acessTokenMock}),
        CreateToken:jest.fn().mockReturnValue({acessTokenMock}),
        CheckToken:jest.fn().mockReturnValue(jwtPayload),
        IsValidToken:jest.fn().mockReturnValue(true),

  
    }
}