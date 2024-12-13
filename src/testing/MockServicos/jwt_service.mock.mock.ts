 import { JwtService } from "@nestjs/jwt";
import { acessTokenMock } from "../MockTeste/token.mock";
import { jwtPayload } from "../MockTeste/jwt_payload.mock";




export const JwtServiceMock ={
         
    provide: JwtService,
    
    useValue:{

        sign: jest.fn().mockReturnValue(acessTokenMock),
        verify: jest.fn().mockReturnValue(jwtPayload),

  
    }
}