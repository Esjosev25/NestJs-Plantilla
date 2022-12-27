import { ApiProperty } from '@nestjs/swagger';
import { ValidRoles } from '../interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @ApiProperty({
    example: '7121ae086525',
    description: 'User ID',
    uniqueItems: true,
  })
  @Prop({ type: 'string', index: true })
  id: string;

  @ApiProperty({
    example: 'test1@gmail.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Prop({
    unique: true,
    lowercase: true,
  })
  email: string;

  @ApiProperty({
    example: '$2b$10$1AtwuA18XxF8TMLJRB66g.QGg..HUrYndi72GqtfAoRDJY6BvhHSC',
    description: 'User password',
    required: true,
  })
  @Prop()
  password: string;

  @ApiProperty({
    example: 'Test One',
    description: 'User name',
  })
  @Prop()
  fullName: string;

  @ApiProperty({
    example: false,
    description: 'User Status',
    default: true,
  })
  @Prop({
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    example: [ValidRoles.admin, ValidRoles.superUser],
    description: 'User Roles',
    default: ['user'],
  })
  @Prop({
    array: true,
    default: ['user'],
  })
  roles: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);
