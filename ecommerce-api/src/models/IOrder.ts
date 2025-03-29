import { RowDataPacket } from "mysql2";
import { IOrderItem } from "./IOrderItem";

export interface IOrder extends RowDataPacket {
  id: number | null
  customer_id: number
  total_price: number
  payment_status: string
  payment_id: string
  order_status: string
  created_at: string
}