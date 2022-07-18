import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PrivateCredentials {
  @Field(() => Number, { description: 'Unique id field' })
  id: number;
  @Field(() => String, { description: 'Email field' })
  email: string;
  @Field(() => String, { description: 'Account password' })
  password: string;
  @Field(() => String, { description: 'Password salt for hash password' })
  passwordSalt: string;
  @Field(() => Number, { description: 'Code used for activation' })
  verificationCode?: number;
  @Field(() => Boolean, { description: 'Activation param' })
  isActivated: boolean;
}
