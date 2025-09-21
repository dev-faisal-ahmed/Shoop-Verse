import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = unknown> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ required: false })
  meta?: TMeta;

  public static success<TData = unknown>(
    message: string,
    data?: TData,
    meta?: TMeta,
  ) {
    return {
      success: true,
      message,
      ...(data && { data }),
      ...(meta && { meta }),
    };
  }

  public static error(message: string) {
    return { success: false, message };
  }
}

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
