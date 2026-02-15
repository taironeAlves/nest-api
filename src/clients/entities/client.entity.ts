import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id_client: number;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 20 })
  password: string;
}
