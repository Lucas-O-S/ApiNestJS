import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RolesKey } from "../decorators/role.decorator";



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