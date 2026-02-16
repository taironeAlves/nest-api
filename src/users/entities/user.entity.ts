import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ length: 20 })
  name: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({
    select: false,
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column()
  id_permission: number;
}
