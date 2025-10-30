import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

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
