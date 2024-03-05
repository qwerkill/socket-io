import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private refector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.refector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    
    console.log(request.user,"request");
    console.log(roles,"roles");
    
    if(!roles.includes(request.user.role)){
       throw new Error("You don't have permission to access this route");
    }

    return true ;
  }
}