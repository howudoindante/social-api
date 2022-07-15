import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import isEmail from 'validator/lib/isEmail';
const prisma = new PrismaClient();
@Injectable()
export class AuthService {
  async register(email: string, password: string) {
    if (!isEmail(email)) throw new BadRequestException();
    const isEmailAvaialble = !(await prisma.credentials.findUnique({
      where: {
        email,
      },
    }));
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    if (isEmailAvaialble) {
      await prisma.credentials.create({
        data: {
          email,
          password: hashed,
          passwordSalt: salt,
        },
      });
      return { message: 'Register' };
    } else {
      throw new BadRequestException();
    }
  }
  async login(email: string, password: string) {
    const isUserRegistered = await prisma.credentials.findUnique({
      where: {
        email,
      },
    });
    if (isUserRegistered) {
      return { message: 'Successfully logged in' };
    } else {
      throw new BadRequestException();
    }
    return { message: '213' };
  }
}
