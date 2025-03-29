import { useState } from 'react'
import { IProduct } from '../models/IProduct';
import { createProduct, deleteProduct, fetchProduct, fetchProducts, updateProduct } from '../services/productService';
import { Product } from '../types/Product';

export const useProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); 
 
  const fetchProductsHandler = async () => {
    setIsLoading(true);

    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      setError("Error fetching product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const fetchProductByIdHandler = async (id: string) => {
    setIsLoading(true);

    try {
      return await fetchProduct(id);
    } catch (error) {
      setError("Error fetching product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  
  const createProductHandler = async (payload: Product) => {
    setIsLoading(true);
    
    try {
      return await createProduct(payload);
    } catch (error) {
      setError("Error creating product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  
  const updateProductHandler = async (id: string, payload: IProduct) => {
    setIsLoading(true);
    
    try {
      return await updateProduct(id, payload);
    } catch (error) {
      setError("Error updating product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const deleteProductHandler = async (id: string) => {
    setIsLoading(true);
    
    try {
      await deleteProduct(id);
      const newProducts = products.filter(products => products.id !== Number(id));
      setProducts(newProducts);
    } catch (error) {
      setError("Error deleting product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    products, 
    isLoading,
    error,
    fetchProductsHandler,
    fetchProductByIdHandler, 
    createProductHandler, 
    updateProductHandler, 
    deleteProductHandler
  }
}
