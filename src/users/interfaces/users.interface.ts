import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

export { User };
