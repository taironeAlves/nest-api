export interface JwtPayload {
  sub: number;
  email: string;
  id_permission: number;
}

export interface JwtUser {
  userId: number;
  email: string;
  id_permission: number;
}
