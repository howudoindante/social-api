import * as ms from 'ms';
export const ACCESS_SECRET = 'lekfs';
export const REFRESH_SECRET = 'lekfs213';
export const ACCESS_EXPIRES_IN = ms('15m'); //mins
export const REFRESH_EXPIRES_IN = ms('30d'); //days

export interface ITokensData {
  refreshToken: string;
  refresh_expires_in: number;
  accessToken: string;
  access_expires_in: number;
}
