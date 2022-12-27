import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles), // Setea en la metadata los roles que pueden acceder a ese endpoint
    UseGuards(AuthGuard(), UserRoleGuard), //AuthGuard para la autenticacion del token y que devuelva el usuario, UserRoleGuard para validar los roles del usuario loggeado con los de la metadata
  );
}
