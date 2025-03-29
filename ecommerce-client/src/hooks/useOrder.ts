import { useState } from 'react'
import { IOrder } from '../models/IOrder';
import { createOrder, deleteOrder, fetchOrder, fetchOrderByPayment, fetchOrders, updateOrder } from '../services/orderService';
import { Order } from '../types/Order';

export const useOrder = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); 
 
  const fetchOrdersHandler = async () => {
    setIsLoading(true);

    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      setError("Error fetching Order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const fetchOrderByIdHandler = async (id: string) => {
    setIsLoading(true);

    try {
      return await fetchOrder(id);
    } catch (error) {
      setError("Error fetching Order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const fetchOrderByPaymentIdHandler = async (payment_id: string) => {
    setIsLoading(true);

    try {
      return await fetchOrderByPayment(payment_id)
      //setOrder(data);
    } catch (error) {
      setError("Error fetching Order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  
  const createOrderHandler = async (payload: Order) => {
    setIsLoading(true);
    
    try {
      return await createOrder(payload);
    } catch (error) {
      setError("Error creating Order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  
  const updateOrderHandler = async (id: string, payload: Order) => {
    setIsLoading(true);
    
    try {
      const data = await updateOrder(id, payload);
      return data
    } catch (error) {
      setError("Error updating Order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const deleteOrderHandler = async (id: string) => {
    setIsLoading(true);
    
    try {
      await deleteOrder(id);
      const newOrders = orders.filter(orders => orders.id !== Number(id));
      setOrders(newOrders);
    } catch (error) {
      setError("Error deleting Order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    orders, 
    isLoading,
    error,
    fetchOrdersHandler,
    fetchOrderByIdHandler, 
    fetchOrderByPaymentIdHandler,
    createOrderHandler, 
    updateOrderHandler, 
    deleteOrderHandler
  }
}
