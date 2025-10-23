import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllUserDto {
  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  name?: string;
}

export type Exclude<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
