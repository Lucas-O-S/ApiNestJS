import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entity/user.entity";

export const userEntityList: UserEntity[] = [
    {
        email: "email@a.com",
        name: "BOB",
        password: "$2b$10$UW.Gr54hp79MO5V7yOZBwO3Xu87OW45ykK/95cxib77m2QMefpWQq",
        role: Role.Admim,
        id: 2,
        created_at: new Date(),
        update_at: new Date(),
    },
];
