import { IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'The name of the product',
    example: 'Laptop',
  })
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'The price of the product',
    example: 999.99,
  })
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    description: 'The description of the product',
    example: 'A high-end laptop',
  })
  @IsString()
  description?: string;
}
