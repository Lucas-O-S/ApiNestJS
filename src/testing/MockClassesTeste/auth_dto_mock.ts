import {AuthRegisterDto} from "../../Auth/dto/auth_register.dto";
import {Role} from "../../enums/role.enum"
export const UserDtoMock : AuthRegisterDto = {
    email: "email@a.com",
    name:"BOB",
    password: "$2b$10$UW.Gr54hp79MO5V7yOZBwO3Xu87OW45ykK/95cxib77m2QMefpWQq",
    role: Role.Admim,

};