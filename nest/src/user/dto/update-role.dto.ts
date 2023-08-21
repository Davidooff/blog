import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export default class UpdateRole {
  @IsNotEmpty()
  @IsString()
  _id: string;
  @IsNotEmpty()
  @IsInt()
  role: number;
}
