import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "./user.controller"
import { UserServiceMock } from "../testing/MockServicos/user_service_dto.mock";
import { AuthGuard } from "../Guards/auth.guard";
import { GuardMock } from "../testing/MockFuncoes/guard.mock";
import { RoleGuard } from "../Guards/role.guard";
import { UserService } from "./user.service";
import { ThrottlerModule } from "@nestjs/throttler";
import { UserDtoMock } from "../testing/MockClassesTeste/auth_dto_mock";
import { userEntityList } from "../testing/MockClassesTeste/user_entity_list.mock";
import { MockUserPut } from "../testing/MockClassesTeste/put_user_dto.mock";
import { MockUserPatch } from "../testing/MockClassesTeste/Pacth_user_dto.mock";


describe("Testes User Controller",()=>{
    let userController: UserController;
    let userService: UserService;

    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers:[UserServiceMock],
            imports: [ThrottlerModule.forRoot({
                throttlers: [{
                    ttl : 60000,
                    limit: 50
                  }]
              })]
        }).overrideGuard(AuthGuard).useValue(GuardMock)
        .overrideGuard(RoleGuard).useValue(GuardMock)
        .compile()

        userController=module.get<UserController>(UserController);
        userService=module.get<UserService>(UserService);


    });

    test("Validar Definição",()=>{
        expect(userController).toBeDefined();
        expect(userService).toBeDefined();

    });

    describe("Teste Aplicação Guard",()=>{
        test("Verifica se os dados foram aplicados",()=>{
            const guards = Reflect.getMetadata("__guards__",UserController);

            expect(guards.length).toEqual(2);
            expect(new guards[0]()).toBeInstanceOf(AuthGuard);
            expect(new guards[1]()).toBeInstanceOf(RoleGuard);

        })
    })

    describe("Create",()=>{
        test("Create Method", async ()=>{
            const result = await userController.create(UserDtoMock);
            expect(result).toEqual(userEntityList[0])
        })
    })
    describe("Read",()=>{
        test("Show method", async ()=>{
            const result = await userController.readOne(2);
            expect(result).toEqual(userEntityList[0])
            
        })
        test("Read method", async ()=>{
            const result = await userController.read();
            expect(result).toEqual(userEntityList)
            
        })

    })

    describe("Update",()=>{
        test("Put Method", async ()=>{
            const result = await userController.update(MockUserPut,userEntityList[0].id);
            expect(result).toEqual(userEntityList[0])
        })
        test("Put Method", async ()=>{
            const result = await userController.updatePartical(MockUserPatch,userEntityList[0].id);
            expect(result).toEqual(userEntityList[0])
        })
    })

    describe("Delete",()=>{
        test("Delete Method", async ()=>{
            const result = await userController.delete(userEntityList[0].id);
            expect(result).toEqual({success: true})
        })
    })
});