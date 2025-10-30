import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @ApiProperty()
  @IsString()
  @Field(() => String, { description: 'Username or email' })
  email: string;

  @ApiProperty()
  @IsString()
  @Field(() => String, { description: 'Password' })
  password: string;
}
