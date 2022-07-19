import { HttpException, Injectable } from '@nestjs/common';
import { CreateTokenInput } from './dto/create-token.input';
import { UpdateTokenInput } from './dto/update-token.input';
import { v4 as uuidv4 } from 'uuid';
import { Jwt, sign, verify, VerifyCallback } from 'jsonwebtoken';
import * as ms from 'ms';
import { PrismaClient } from '@prisma/client';
import { IToken } from './types.token';
const prisma = new PrismaClient();

interface ITokensData {
  refreshToken: string;
  refresh_expires_in: number;
  accessToken: string;
  access_expires_in: number;
}

@Injectable()
export class TokenService {
  private getExpAtSeconds(time) {
    return Math.floor(Date.now() / 1000 + ms(time) / 1000);
  }
  private convertToMsFromSeconds(time) {
    return Math.floor(time * 1000);
  }
  createTokens(credId, payload) {
    const ACCESS_EXPIRES_AT = this.getExpAtSeconds(
      process.env.ACCESS_EXPIRES_IN,
    );
    const REFRESH_EXPIRES_AT = this.getExpAtSeconds(
      process.env.REFRESH_EXPIRES_IN,
    );

    const accessToken = sign(
      { ...payload, exp: ACCESS_EXPIRES_AT },
      process.env.ACCESS_SECRET,
    );
    const refreshToken = sign(
      { ...payload, exp: REFRESH_EXPIRES_AT },
      process.env.REFRESH_SECRET,
    );
    this.addOrUpdateTokenRecord(credId, refreshToken);

    return {
      refreshToken,
      refresh_expires_in: this.convertToMsFromSeconds(REFRESH_EXPIRES_AT),
      accessToken,
      access_expires_in: this.convertToMsFromSeconds(ACCESS_EXPIRES_AT),
    };
  }
  verifyToken<T>(
    token,
    secretType: 'access' | 'refresh',
    callback = (err, decoded) => {
      if (err) throw new HttpException(err.message, 401);
      return decoded as T;
    },
  ): T | never {
    const secretKey =
      secretType === 'access'
        ? process.env.ACCESS_SECRET
        : process.env.REFRESH_SECRET;
    return verify(token, secretKey, callback) as unknown as T | never;
  }
  async addOrUpdateTokenRecord(credentialsId: number, refreshToken: string) {
    await prisma.token.upsert({
      where: {
        credentialsId,
      },
      update: {
        refreshToken,
      },
      create: {
        refreshToken,
        credentials: {
          connect: {
            id: credentialsId,
          },
        },
      },
    });
  }
  async getTokenRecord(query: Partial<IToken>) {
    const record = await prisma.token.findUnique({
      where: query,
    });
    if (record) return record;
    else throw new HttpException('Invalid token', 401);
  }
  async removeTokenRecord(credentialsId: number) {
    await prisma.token.delete({
      where: {
        credentialsId,
      },
    });
  }

  update({ token }) {
    // this.verifyToken()
    return `This action updates a #${token} token`;
  }

  create(createTokenInput: CreateTokenInput) {
    return 'This action adds a new token';
  }
  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
