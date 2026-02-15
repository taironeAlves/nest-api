import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id_order_item: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'id_order' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: 'id_product' })
  product: Product;
}
