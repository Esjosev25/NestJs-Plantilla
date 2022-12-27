import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ValidRoles } from '../interfaces';

@Entity('users')
export class User {
  @ApiProperty({
    example: '7121ae086525',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'test1@gmail.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: '$2b$10$1AtwuA18XxF8TMLJRB66g.QGg..HUrYndi72GqtfAoRDJY6BvhHSC',
    description: 'User password',
    required: true,
  })
  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @ApiProperty({
    example: 'Test One',
    description: 'User name',
  })
  @Column({
    type: 'text',
  })
  fullName: string;

  @ApiProperty({
    example: false,
    description: 'User Status',
    default: true,
  })
  @Column({
    type: 'bool',
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    example: [ValidRoles.admin, ValidRoles.superUser],
    description: 'User Roles',
    default: ['user'],
  })
  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles: string[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
