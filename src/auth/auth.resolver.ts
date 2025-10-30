import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { LoginResponse } from './entities/login-response.entity';
import { LoginDto } from './dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello, world!';
  }

  @Mutation(() => LoginResponse)
  async login(@Args('login') loginDto: LoginDto): Promise<LoginResponse> {
    return await this.authService.authenticate({
      username: loginDto.email,
      password: loginDto.password,
    });
  }
}
