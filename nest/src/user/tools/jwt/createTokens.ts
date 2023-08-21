import { sign } from 'jsonwebtoken';
import TokensData from './types/tokens-data.type';

export interface ReturnTokens {
  accessToken: string;
  refreshToken: string;
}

async function creatTokens(data: TokensData): Promise<ReturnTokens> {
  const { login, _id, role } = data;
  let accessToken = sign(
    {
      _id,
      login,
      role,
      exp: process.env.JWT_ACCESS_ALIVE,
    },
    process.env.JWT_SECRET,
  );
  let refreshToken = sign(
    {
      _id,
      exp: process.env.JWT_REFRESH_ALIVE,
    },
    process.env.JWT_SECRET,
  );
  await Promise.all([accessToken, refreshToken]);
  return { accessToken, refreshToken };
}

export default creatTokens;
