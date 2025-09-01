export interface JwtSignPayload {
  sub: number;
  type: 'access' | 'refresh';
}
export interface JwtVerifyPayload {
  sub: number;
  iat: string;
  exp: string;
  type: string;
}
