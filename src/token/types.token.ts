export interface IToken {
  id: number;
  refreshToken: string;
  credentialsId: number;
}

export interface ITokenDecoded {
  id: number;
  email: string;
  iat: number;
  exp: number;
}
