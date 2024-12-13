import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthService } from "../Auth/auth.service";
import { RolesKey } from "../decorators/role.decorator";
import { CreateUserDto } from "../user/DTO/create_user.dto";
import { UserService } from "../user/user.service";


@Injectable()
export class RoleGuard implements CanActivate{
    
    constructor(
        private readonly reflector: Reflector,
    ){}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride(RolesKey, [context.getHandler(), context.getClass()]);

        if(!requiredRoles){
            return true;
        }
        
        console.log({requiredRoles});

        const {user} = context.switchToHttp().getRequest();
        console.log({user});

        const roleFiltered =  requiredRoles.filter(role=> role===user.role)

        return roleFiltered.length > 0;
    }
   

}