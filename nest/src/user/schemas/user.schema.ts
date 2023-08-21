// import { ParseEnumPipe } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Length } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import Roles from '../types/roles.type';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String, unique: true })
  login: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String, enum: Roles, default: Roles.User })
  role: Roles;

  @Prop({ required: false, type: String })
  refreshTokens: string[];

  // @Prop({
  //   required: false,
  //   type: Array<{
  //     action: string;
  //     timestamp: number;
  //   }>,
  // })
  // log: Array<{
  //   action: String;
  //   timestamp: number;
  // }>;
}

export const UserSchema = SchemaFactory.createForClass(User);
