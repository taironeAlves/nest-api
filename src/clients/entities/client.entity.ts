import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id_client: number;

  @Column({ length: 100 })
  razao_social: string;

  @Column({ length: 14 })
  cnpj: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 100 })
  address: string;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @Column({ select: false })
  password: string;
}
