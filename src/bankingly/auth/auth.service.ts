import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login({ userName, password }: LoginDto): Promise<LoginResponse> {
    const { data } = await this.httpService.axiosRef.post<LoginResponse>(
      '/Authentication/SignIn',
      {
        userName,
        password,
      },
    );
    return data;
  }
}
