import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrivateCredentials } from './entities/credentials-private.entity';
import * as bcrypt from 'bcryptjs';
import { _ } from 'lodash';
import { EMAIL_ACCOUNT_VERIFICATION } from 'constants/Mail';
import isEmail from 'validator/lib/isEmail';
import * as nodemailer from 'nodemailer';
const prisma = new PrismaClient();
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.COMPANY_EMAIL_LOGIN,
    pass: process.env.COMPANY_EMAIL_PASSWORD,
  },
  secure: true,
});
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
    const mailData = {
      from: 'Chat',
      to: email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
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
