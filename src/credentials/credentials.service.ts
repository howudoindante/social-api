import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrivateCredentials } from './entities/credentials-private.entity';
import * as bcrypt from 'bcryptjs';
import { _ } from 'lodash';
import emailjs from '@emailjs/browser';
import { EMAIL_ACCOUNT_VERIFICATION } from 'constants/Mail';
import isEmail from 'validator/lib/isEmail';
const prisma = new PrismaClient();
@Injectable()
export class CredentialsService {
  async findOne(email: string): Promise<PrivateCredentials | null> {
    return prisma.credentials.findUnique({
      where: {
        email,
      },
    });
  }
  async create(data: Pick<PrivateCredentials, 'email' | 'password'>) {
    const { email, password } = data;
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    await prisma.credentials.create({
      data: {
        email,
        password: hashed,
        passwordSalt: salt,
      },
    });
  }
  resetPassword() {
    return;
  }
  async update(findBy, data) {
    const user = await prisma.credentials.update({
      where: findBy,
      data,
    });
  }
  async generateVerificationCode(email) {
    const code = _.random(100000, 999999);
    await this.update({ email }, { verificationCode: code });
    return code;
  }
  async sendVerificationCode(email) {
    if (!isEmail(email)) throw new HttpException("It's not email", 400);
    const code = await this.generateVerificationCode(email);

    // emailjs
    //   .send(
    //     'service_px9gr7a',
    //     'template_34ci2gv',
    //     {
    //       purpose: EMAIL_ACCOUNT_VERIFICATION,
    //       verificationCode: code,
    //       email: email,
    //       reply_to: 'chat',
    //     },
    //     '-6zYoSs7_HOsgOiiM',
    //   )
    //   .then(
    //     function (response) {
    //       console.log('SUCCESS!', response.status, response.text);
    //     },
    //     function (error) {
    //       console.log('FAILED...', error);
    //     },
    //   );
  }

  updateActivation() {
    return;
  }
  compare(
    email: string,
    password: string,
    credentialsToCompare: PrivateCredentials,
  ): true | false {
    const hashedPass = bcrypt.hashSync(
      password,
      credentialsToCompare.passwordSalt,
    );
    if (
      email === credentialsToCompare.email &&
      hashedPass === credentialsToCompare.password
    ) {
      return true;
    } else {
      return false;
    }
  }
}
