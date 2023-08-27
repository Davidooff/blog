import { UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

export default function compareHash(
  hashToCompare: string,
  hash: string,
): boolean {
  let res: boolean;
  compare(hashToCompare, hash, (err: Error, result: boolean) => {
    console.log(err);
    console.log(result);
    if (err) {
      throw new UnauthorizedException(err);
    }
    res = result;
  });
  return res;
}
