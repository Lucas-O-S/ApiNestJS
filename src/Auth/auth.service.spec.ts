import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { userRepositoryMock } from "../testing/MockServicos/user_repository.mock"
import { UserServiceMock } from "../testing/MockServicos/user_service_dto.mock"
import { JwtServiceMock } from "../testing/MockServicos/jwt_service.mock.mock"
import { MailerServiceMock } from "../testing/MockServicos/mailer_service.mock"
import { acessTokenMock } from "../testing/MockClassesTeste/token.mock"
import { jwtPayload } from "../testing/MockClassesTeste/jwt_payload.mock"
import { userEntityList } from "../testing/MockClassesTeste/user_entity_list.mock"
import { ForgetTokenMock } from "../testing/MockClassesTeste/forget_token.mock"
import { ForgetJwtPayload } from "../testing/MockClassesTeste/forget_jwt_payload.mock"
import { UserDtoMock } from "../testing/MockClassesTeste/auth_dto_mock"

describe("AuthSevice", ()=>{

    let authService: AuthService;

    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                userRepositoryMock,
                UserServiceMock,
                JwtServiceMock,
                MailerServiceMock,
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
    })

    test("Validar a definição",()=>{
        expect(authService).toBeDefined();
    });

    describe("Token",()=>{
        test("Create Token method",()=>{
            const result = authService.CreateToken(userEntityList[0])

            expect(result.accessToken).toEqual(acessTokenMock);
        })

        test("Check Token method",()=>{
            const result = authService.CheckToken(acessTokenMock)

            expect(result).toEqual(jwtPayload);
        })
        test("is valid Token method",async()=>{
            
            const result = await authService.IsValidToken(acessTokenMock)

            expect(result).toEqual(true);
        })
    })

    describe("Autenticação",()=>{
        test("Login", async ()=>{
            const result = await authService.Login(userEntityList[0].email,userEntityList[0].password);

            expect(result.accessToken).toEqual(acessTokenMock);
        })
        test("Forget", async ()=>{

            const result = await authService.Forget(userEntityList[0].email);

            expect(result).toEqual(userEntityList[0]);
        })
        test("Reset", async ()=>{

            jest.spyOn(JwtServiceMock.useValue, 'verify').mockResolvedValueOnce(ForgetJwtPayload);

            const result = await authService.Reset(userEntityList[0].password, ForgetTokenMock);
            expect(result.accessToken).toEqual(acessTokenMock);
        })

        test("Register", async ()=>{


            const result = await authService.Register(UserDtoMock);
            expect(result.accessToken).toEqual(acessTokenMock);
        })
    })
})