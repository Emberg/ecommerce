/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { createCustomer, deleteCustomer, fetchCustomer, fetchCustomerByMail, fetchCustomers, updateCustomer } from '../services/customerService';
import { ICustomer } from '../models/ICustomer';
import { Customer } from '../types/Customer';

export const useCustomer = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); 
 
  const fetchCustomersHandler = async () => {
    setIsLoading(true);

    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (error) {
      setError("Error fetching customers");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const fetchCustomerByIdHandler = async (id: string) => {
    setIsLoading(true);

    try {
      return await fetchCustomer(id);
    } catch (error) {
      setError("Error fetching customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const fetchCustomerByMailHandler = async (mail: string) => {
    setIsLoading(true);

    try {
      return await fetchCustomerByMail(mail);
    } catch (error) {
      setError("Error fetching customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  
  const createCustomerHandler = async (payload: Customer) => {
    setIsLoading(true);
    
    try {
      return await createCustomer(payload);
    } catch (error) {
      setError("Error creating customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  
  const updateCustomerHandler = async (id: string, payload: ICustomer) => {
    setIsLoading(true);
    
    try {
      return await updateCustomer(id, payload);
    } catch (error) {
      setError("Error updating customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const deleteCustomerHandler = async (id: string) => {
    setIsLoading(true);
    
    try {
      await deleteCustomer(id);
      const newCustomers = customers.filter(customers => customers.id !== Number(id));
      setCustomers(newCustomers);
    } catch (error) {
      setError("Error deleting customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    customers, 
    isLoading,
    error,
    fetchCustomersHandler,
    fetchCustomerByIdHandler,
    fetchCustomerByMailHandler,
    createCustomerHandler, 
    updateCustomerHandler, 
    deleteCustomerHandler
  }
}
