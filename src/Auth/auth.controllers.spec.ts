import { Test, TestingModule } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { AuthServiceMock } from "../testing/MockServicos/auth_Service.mock";
import { FileServiceMock } from "../testing/MockServicos/file.service.mock";
import { AuthGuard } from "../Guards/auth.guard";
import { GuardMock } from "../testing/MockFuncoes/guard.mock";
import { UserServiceMock } from "../testing/MockServicos/user_service_dto.mock";
import { UserDtoMock } from "../testing/MockClassesTeste/auth_dto_mock";
import { acessTokenMock } from "../testing/MockClassesTeste/token.mock";
import { AuthResetMock } from "../testing/MockClassesTeste/auth_reset_dto_mock";
import { AuthLoginDtoMock } from "../testing/MockClassesTeste/auth_login_dto_mock";
import { AuthForgetMock } from "../testing/MockClassesTeste/auth_forget_dto_mock";
import { userEntityList } from "../testing/MockClassesTeste/user_entity_list.mock";




describe("AuthController", ()=>{

    let authController: AuthController;
    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers:[AuthServiceMock, FileServiceMock,UserServiceMock]

        }).overrideGuard(AuthGuard).useValue(GuardMock)
        .compile()
        
        authController = module.get<AuthController>(AuthController);

    })


    test("Teste de definição",()=>{
        expect(authController).toBeDefined();
    })

    describe("Autenticação",()=>{
        test("Login",async ()=>{
           const result = await authController.Login(AuthLoginDtoMock);
            expect(result).toEqual({acessTokenMock});
        })

        test("Register",async ()=>{
            const result = await authController.Register(UserDtoMock);
             expect(result).toEqual({acessTokenMock});
         })

         test("Reset",async ()=>{
            const result = await authController.Reset(AuthResetMock);
             expect(result).toEqual({acessTokenMock});
         })
         test("Forget",async ()=>{
            const result = await authController.Forget(AuthForgetMock);
             expect(result).toEqual(userEntityList[0]);
         })
    })
})