import { Injectable } from '@nestjs/common';
import { CreateTokenInput } from './dto/create-token.input';
import { UpdateTokenInput } from './dto/update-token.input';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';

import {
  ACCESS_EXPIRES_IN,
  ACCESS_SECRET,
  ITokensData,
  REFRESH_EXPIRES_IN,
  REFRESH_SECRET,
} from 'constants/Token';
@Injectable()
export class TokenService {
  create(createTokenInput: CreateTokenInput) {
    return 'This action adds a new token';
  }

  createTokens(payload): ITokensData {
    const ACCESS_EXPIRES_AT = Date.now() + ACCESS_EXPIRES_IN;
    const REFRESH_EXPIRES_AT = Date.now() + REFRESH_EXPIRES_IN;
    const accessToken = sign(payload, ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRES_AT,
    });
    const refreshToken = sign(payload, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRES_AT,
    });
    return {
      refreshToken,
      refresh_expires_in: REFRESH_EXPIRES_AT,
      accessToken,
      access_expires_in: ACCESS_EXPIRES_AT,
    };
  }

  findAll() {
    return `This action returns all token`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenInput: UpdateTokenInput) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
