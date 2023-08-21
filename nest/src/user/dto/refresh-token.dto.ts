import { IsNotEmpty, IsString } from 'class-validator';

export default class RefreshData {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
