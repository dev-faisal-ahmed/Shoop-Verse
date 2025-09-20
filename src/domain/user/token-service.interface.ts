type TTokenOptions = {
  expiresIn: string;
  secret: string;
};

export type TAccessTokenPayload = {
  id: string;
  name: string;
  email: string;
};

export type TRefreshTokenPayload = {
  id: string;
};

type TokenCreationData<T> = {
  payload: T;
  options: TTokenOptions;
};

export type AccessTokenCreationData = TokenCreationData<TAccessTokenPayload>;
export type RefreshTokenCreationData = TokenCreationData<TRefreshTokenPayload>;

export abstract class ITokenService {
  abstract generateAccessToken(payload: AccessTokenCreationData): string;
  abstract verifyAccessToken(token: string): TAccessTokenPayload;
  abstract generateRefreshToken(payload: RefreshTokenCreationData): string;
  abstract verifyRefreshToken(token: string): TRefreshTokenPayload;
}
