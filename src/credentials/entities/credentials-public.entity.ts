import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PublicCredentials {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  email: string;
}
