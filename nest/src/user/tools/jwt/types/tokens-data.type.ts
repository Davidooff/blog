import AccessToken from './access-token.type';
import RefreshToken from './refresh-token.type';

export default interface TokensData extends AccessToken, RefreshToken {}
