import { compare } from 'bcrypt';

export default async function compareHash(
  hashToCompare: string,
  hash: string,
): Promise<string> {
  return compare(hashToCompare, hash, function (err: Error, result: string) {
    if (err) {
      throw err;
    } else if (result) {
      return result;
    } else {
      throw new Error('Unexpected error');
    }
  });
}
