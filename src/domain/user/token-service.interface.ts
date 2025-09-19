export type TTokenPayload = { id: string; name: string; email: string };

export abstract class ITokenService {
  abstract generateToken(payload: TTokenPayload): Promise<string>;
  abstract verifyToken(token: string): Promise<TTokenPayload>;
}
