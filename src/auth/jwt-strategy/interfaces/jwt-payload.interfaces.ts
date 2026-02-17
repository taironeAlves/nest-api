export interface JwtPayload {
  sub: number;
  email: string;
  id_permission: number;
  type?: 'user' | 'client';
}

export interface JwtUser {
  userId: number;
  email: string;
  id_permission: number;
  type: 'user' | 'client';
}
