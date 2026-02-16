import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/auth-roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: number[]) => SetMetadata(ROLES_KEY, roles);
export const AdminOnly = () => Roles(Role.ADMIN);
