import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import isEmail from 'validator/lib/isEmail';
import { CredentialsService } from 'src/credentials/credentials.service';
import { TokenService } from 'src/token/token.service';
const prisma = new PrismaClient();
@Injectable()
export class AuthService {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly tokenService: TokenService,
  ) {}
  async register(email: string, password: string) {
    if (!isEmail(email)) throw new BadRequestException();
    const isEmailAvaialble = !(await this.credentialsService.findOne(email));
    if (isEmailAvaialble) {
      await this.credentialsService.create({
        email,
        password,
      });
      return { message: 'REGISTER_SUCCESS' };
    } else {
      throw new BadRequestException();
    }
  }

  async login(email: string, password: string) {
    if (!isEmail(email)) throw new BadRequestException();
    const account = await this.credentialsService.findOne(email);
    if (!account) {
      throw new HttpException('Wrong username or password', 401);
    }

    const isCredentialsRight = this.credentialsService.compare(
      email,
      password,
      account,
    );

    if (isCredentialsRight) {
      const jwt = this.tokenService.createTokens({
        id: account.id,
        email: account.email,
      });
      this.credentialsService.sendVerificationCode(email);
      return { credentials: { id: account.id, email: account.email }, jwt };
    } else throw new HttpException('Wrong username or password', 401);
  }
}
