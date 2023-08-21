import { hash } from 'bcrypt';

export default async function createHash(data: string): Promise<string> {
  return hash(data, 8, function (err: Error, hash: string) {
    if (err) {
      throw err;
    } else if (hash) {
      return hash;
    } else {
      throw new Error('Unexpected error');
    }
  });
}
