import { ApiProperty } from '@nestjs/swagger';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  @ApiProperty({ type: 'string' })
  public id: ObjectID;

  @Column()
  @ApiProperty()
  public email: string;

  @Column()
  @ApiProperty()
  public password: string;

  @Column()
  @ApiProperty()
  public lastname: string;

  @Column()
  @ApiProperty()
  public firstname: string;
}
