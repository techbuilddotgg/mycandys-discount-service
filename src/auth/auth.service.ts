import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import process from 'process';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async validate(token: string): Promise<any> {
    const authMicroservice = process.env.AUTH_SERVICE;

    try {
      const { data: response } = await this.httpService.axiosRef.get(
        `${authMicroservice}/auth/verify`,
        { headers: { Authorization: `${token}` } },
      );
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
