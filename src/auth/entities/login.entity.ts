import { ObjectType, Field } from '@nestjs/graphql';
import { PublicCredentials } from 'src/credentials/entities/credentials-public.entity';
import { JWT } from '../../token/entities/jwt.entity';

@ObjectType()
export class Login {
  @Field(() => PublicCredentials)
  credentials: PublicCredentials;
  @Field(() => JWT)
  jwt: JWT;
}
