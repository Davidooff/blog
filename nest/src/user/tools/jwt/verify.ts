import { UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

export default function <T>(token: string): T {
  let res: T;
  verify(token, process.env.JWT_SECRET, (error, result: T) => {
    if (error) throw new UnauthorizedException(error);
    res = result;
  });
  return res;
}
