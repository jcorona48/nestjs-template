import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindProductsDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    description: 'Minimum price',
  })
  @Field({ nullable: true })
  'price[min]'?: number;

  @ApiPropertyOptional({
    description: 'Maximum price',
  })
  @Field({ nullable: true })
  'price[max]'?: number;
}

@InputType()
export class FindProductDto {
  @Field({ nullable: true })
  id?: number;
}
