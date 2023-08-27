import { UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcrypt';

export default async function createHash(data: string): Promise<string> {
  let res: string;
  await hash(data, 8, function (err: Error, hash: string) {
    if (err) {
      throw err;
    } else if (hash) {
      res = hash;
      return res;
    } else {
      throw new UnauthorizedException('Unexpected error');
    }
  });
  return res;
}
