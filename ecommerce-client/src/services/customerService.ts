import axios from "axios";
import { API_URL, handleRequest } from "./baseService";
import { ICustomer } from "../models/ICustomer";
import { Customer } from "../types/Customer";

export const fetchCustomers = async (): Promise<ICustomer[]> => {
  return await handleRequest<ICustomer[]>(axios.get(`${API_URL}/customers/`))
}

export const fetchCustomer = async (id: string): Promise<ICustomer> => {
  return await handleRequest<ICustomer>( axios.get(`${API_URL}/customers/${id}`))
}

export const fetchCustomerByMail = async (email: string): Promise<ICustomer> => {
  return await handleRequest<ICustomer>( axios.get(`${API_URL}/customers/email/${email}`))
}

export const createCustomer = async (payload: Customer): Promise<ICustomer> => {
  return await handleRequest<ICustomer>(axios.post(`${API_URL}/customers/`, payload))
}

export const updateCustomer = async (id: string, payload: Customer): Promise<Customer> => {
  return await handleRequest<Customer>(axios.patch(`${API_URL}/customers/${id}`, payload))
}

export const deleteCustomer = async (id: string): Promise<void> => {
  return await handleRequest<void>(axios.delete(`${API_URL}/customers/${id}`))
}