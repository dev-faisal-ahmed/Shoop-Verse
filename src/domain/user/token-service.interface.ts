export type TAccessTokenPayload = {
  payload: { id: string; name: string; email: string };
  options: TTokenOptions;
};

export type TRefreshTokenPayload = {
  payload: { id: string };
  options: TTokenOptions;
};

type TTokenOptions = {
  expiresIn: string;
  secret: string;
};

export abstract class ITokenService {
  abstract generateAccessToken(payload: TAccessTokenPayload): string;
  abstract verifyAccessToken(token: string): TAccessTokenPayload;
  abstract generateRefreshToken(payload: TRefreshTokenPayload): string;
  abstract verifyRefreshToken(token: string): TRefreshTokenPayload;
}
