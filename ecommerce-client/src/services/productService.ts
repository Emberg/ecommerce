import axios from "axios";
import { API_URL, handleRequest } from "./baseService";
import { IProduct } from "../models/IProduct";
import { Product } from "../types/Product";

export const fetchProducts = async (): Promise<IProduct[]> => {
  return await handleRequest<IProduct[]>(axios.get(`${API_URL}/products/`))
}

export const fetchProduct = async (id: string): Promise<IProduct> => {
  return await handleRequest<IProduct>( axios.get(`${API_URL}/products/${id}`))
}

export const createProduct = async (payload: Product): Promise<Product> => {
  return await handleRequest<Product>(axios.post(`${API_URL}/products/`, payload))
}

export const updateProduct = async (id: string, payload: Product): Promise<Product> => {
  return await handleRequest<Product>(axios.patch(`${API_URL}/products/${id}`, payload))
}

export const deleteProduct = async (id: string): Promise<void> => {
  return await handleRequest<void>(axios.delete(`${API_URL}/products/${id}`))
}