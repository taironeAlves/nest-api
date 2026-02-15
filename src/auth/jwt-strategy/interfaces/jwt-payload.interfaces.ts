export interface JwtPayload {
  sub: number;
  email: string;
}

export interface JwtUser {
  userId: number;
  email: string;
}
