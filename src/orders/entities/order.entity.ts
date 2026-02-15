import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id_order: number;

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'id_client' })
  client: Client;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
