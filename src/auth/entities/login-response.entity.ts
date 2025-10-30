import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '@/users/interfaces/users.interface';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
