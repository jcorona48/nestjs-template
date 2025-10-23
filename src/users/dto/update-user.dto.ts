import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'admin' })
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'admin@example.com' })
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'admin123' })
  @IsString()
  @Length(6, 20)
  password?: string;

  @ApiPropertyOptional({ example: 'admin123' })
  @IsString()
  @Length(6, 20)
  oldPassword?: string;
}
