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
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_ALIVE },
  );
  let refreshToken = sign(
    {
      _id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_ALIVE },
  );
  await Promise.all([accessToken, refreshToken]);
  return { accessToken, refreshToken };
}

export default creatTokens;
