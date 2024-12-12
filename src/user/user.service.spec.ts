import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "./user.service"
import { userRepositoryMock } from "./../testing/user_repository.mock"
import { MockUserCreate } from "../testing/create_user_dto.mock"
import { userEntityList } from "../testing/user_entity_list.mock"
import { Repository } from "typeorm"
import { UserEntity } from "./entity/user.entity"
import { getRepositoryToken } from "@nestjs/typeorm"
import { MockUserPatch } from "../testing/Pacth_user_dto.mock"
import { MockUserPut } from "../testing/Put_user_dto.mock"




describe("UserServer", ()=>{ 
    let userService: UserService
    let userRepository: Repository<UserEntity>
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                userRepositoryMock
            ]
        }).compile();
        userRepository = module.get(getRepositoryToken(UserEntity))
        userService = module.get<UserService>(UserService)
    });

    test("Validar a definição",()=>{
        expect(userService).toBeDefined()
    })

    describe("Create", ()=>{
        test("Method Create", async ()=>{
            jest.spyOn(userRepository,"exists").mockResolvedValueOnce(false)
            const result = await userService.Create(MockUserCreate);
            expect(result).toEqual(userEntityList[0]);
        })
    })
    describe("Read", ()=>{
        test("Read", async ()=>{
            const result = await userService.List();

            expect(result).toEqual(userEntityList);
        })

    })

    describe("Show", ()=>{
        test("Show", async ()=>{
            const result = await userService.Show(userEntityList[0].id);

            expect(result).toEqual(userEntityList[0]);
        })

    })
    describe("Update", ()=>{
        test("update", async ()=>{
            const result = await userService.Update(MockUserPut,userEntityList[0].id);

            expect(result).toEqual(userEntityList[0]);
        })
    })
    describe("Update Partiaç", ()=>{
        test("update Partial", async ()=>{
            const result = await userService.UpdatePartial(MockUserPatch,userEntityList[0].id);

            expect(result).toEqual(userEntityList[0]);
        })
    })
    describe("Delete", ()=>{
        test("Delete", async ()=>{
            const result = await userService.Delete(userEntityList[0].id);

            expect(result).toEqual(userEntityList[0]);
        })
    })
})