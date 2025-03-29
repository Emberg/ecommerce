import axios from "axios";
import { API_URL, handleRequest } from "./baseService";
import { IOrder } from "../models/IOrder";
import { Order } from "../types/Order";

export const fetchOrders = async (): Promise<IOrder[]> => {
  return await handleRequest<IOrder[]>(axios.get(`${API_URL}/orders/`))
}

export const fetchOrder = async (id: string): Promise<IOrder> => {
  return await handleRequest<IOrder>( axios.get(`${API_URL}/orders/${id}`))
}

export const fetchOrderByPayment = async (payment_id: string): Promise<IOrder> => {
  return await handleRequest<IOrder>( axios.get(`${API_URL}/orders/payment/${payment_id}`))
}

export const createOrder = async (payload: Order): Promise<IOrder> => {
  return await handleRequest<IOrder>(axios.post(`${API_URL}/orders/`, payload))
}

export const updateOrder = async (id: string, payload: Order): Promise<IOrder> => {
  return await handleRequest<IOrder>(axios.patch(`${API_URL}/orders/${id}`, payload))
}

export const deleteOrder = async (id: string): Promise<void> => {
  return await handleRequest<void>(axios.delete(`${API_URL}/orders/${id}`))
}