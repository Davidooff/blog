import Roles from 'src/user/types/roles.type';
import RefreshToken from './refresh-token.type';

export default interface AccessToken extends RefreshToken {
  login: string;
  role: Roles;
}
