export class ApiResponseDto {
  public static success<TData = unknown>(args: TSuccessResponseArgs<TData>) {
    if (typeof args === 'string') return { success: true, message: args };
    return { success: true, ...args };
  }

  public static error(message: string) {
    return { success: false, message };
  }
}

// types
type TSuccessResponseArgs<TData = unknown> =
  | { status?: number; message: string; data?: TData; meta?: TMeta }
  | string;

type TMeta = { page: number; limit: number; total: number; totalPage: number };
