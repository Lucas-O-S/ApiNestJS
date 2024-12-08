import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthService } from "src/Auth/auth.service";
import { RolesKey } from "src/decorators/role.decorator";
import { CreateUserDto } from "src/user/DTO/create_user.dto";
import { UserService } from "src/user/user.service";


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