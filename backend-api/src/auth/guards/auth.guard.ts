import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { DecodeToken, VerifyToken } from "../utils/jwt";
import { Role } from "./auth.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

<<<<<<< HEAD
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);
    return true;
=======
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Find the required roles from the route handler and class
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);
    const authorizationHeader = context.switchToHttp().getRequest().headers.authorization;

    // Check if roles needed
    if (!requiredRoles) {
      return true;
    }

    // Check if roles needed and if user has token
    if (requiredRoles && !authorizationHeader) {
      throw new HttpException({ message: 'Unauthorized' }, 401);
    }

    // Check if token is valid (Error thrown in validation)
    if (!await VerifyToken(authorizationHeader.split(' ')[1])) {
      return false;
    }

    // Get the data from the token
    const tokenData = await DecodeToken(authorizationHeader.split(' ')[1]);

    // Check if user has the required role
    if (requiredRoles.find(role => role === tokenData.role)) {
      console.log(requiredRoles, tokenData.role, "true")
      return true;
    } else {
      console.log(requiredRoles, tokenData.role, "false")
      return false;
    }
>>>>>>> 28fec43b526fc9bdb8cd2ca384f2bf11175defca
  }
}