import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;
}
