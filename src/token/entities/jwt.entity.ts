import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class JWT {
  @Field(() => String)
  refreshToken: string;
  @Field(() => Float)
  refresh_expires_in: number;
  @Field(() => String)
  accessToken: string;
  @Field(() => Float)
  access_expires_in: number;
}
