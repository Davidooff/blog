import AccessToken from './access-token.type';
import RefreshToken from './refresh-token.type';

export default interface Tokens {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}
