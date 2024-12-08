import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enums/role.enum";


export const RolesKey = "roles"
export const  Roles = (...roles: Role[])=> SetMetadata('roles', roles);