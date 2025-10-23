import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    description: 'Minimum price',
  })
  'price[min]'?: number;

  @ApiPropertyOptional({
    description: 'Maximum price',
  })
  'price[max]'?: number;
}
