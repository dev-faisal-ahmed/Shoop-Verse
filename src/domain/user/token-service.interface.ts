export type TAccessTokenPayload = {
  id: string;
  name: string;
  email: string;
};

export type TRefreshTokenPayload = {
  id: string;
};

export abstract class ITokenService {
  abstract generateAccessToken(payload: TAccessTokenPayload): string;
  abstract verifyAccessToken(token: string): TAccessTokenPayload;
  abstract generateRefreshToken(payload: TRefreshTokenPayload): string;
  abstract verifyRefreshToken(token: string): TRefreshTokenPayload;
}
